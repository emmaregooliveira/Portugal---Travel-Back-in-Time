/**
 * Vercel serverless function. The OpenAI API key stays on the server.
 * The browser sends POST /api/chat with { messages: [{ role, content }] }.
 */
import fs from "node:fs";
import path from "node:path";

const MODEL = process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";

const tools = [
  {
    type: "function",
    name: "go_to_period",
    description: "Open a historical period's details on this website. Use only a listed period id.",
    parameters: {
      type: "object",
      properties: { id: { type: "string" } },
      required: ["id"],
      additionalProperties: false
    },
    strict: true
  },
  {
    type: "function",
    name: "go_to_person",
    description: "Open a biography in this website's people directory. Use the listed wikipedia_title exactly.",
    parameters: {
      type: "object",
      properties: { wikipedia_title: { type: "string" } },
      required: ["wikipedia_title"],
      additionalProperties: false
    },
    strict: true
  },
  {
    type: "function",
    name: "go_to_page",
    description: "Navigate to a main section of this website.",
    parameters: {
      type: "object",
      properties: {
        page: { type: "string", enum: ["home", "timeline", "people", "resources"] }
      },
      required: ["page"],
      additionalProperties: false
    },
    strict: true
  }
];

function loadSiteData(filename) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", filename), "utf8"));
}

function parseMessages(body) {
  // Vercel usually parses JSON bodies automatically, but accept a JSON string as well.
  const parsed = typeof body === "string" ? JSON.parse(body) : body;
  if (!parsed || !Array.isArray(parsed.messages)) return [];

  return parsed.messages
    .slice(-12)
    .filter((message) =>
      message &&
      (message.role === "user" || message.role === "assistant") &&
      typeof message.content === "string" &&
      message.content.trim().length > 0
    )
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, 1000)
    }));
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Use POST to talk to the assistant." });
  }

  if (!process.env.OPENAI_API_KEY?.trim()) {
    return res.status(503).json({
      error: "The chatbot isn't connected yet. The site owner must set OPENAI_API_KEY in Vercel's Environment Variables."
    });
  }

  let input;
  try {
    input = parseMessages(req.body);
  } catch {
    return res.status(400).json({ error: "Invalid request format." });
  }

  if (input.length === 0 || input.at(-1)?.role !== "user") {
    return res.status(400).json({ error: "Please enter a message." });
  }

  try {
    const timeline = loadSiteData("timeline.json");
    const people = loadSiteData("people.json");

    // Only offer people who actually exist in app.js's navigable directory.
    const navigablePeople = people.filter(
      (person) => person.navigable === true && person.id && person.title
    );

    const periodIds = new Set(timeline.map((period) => period.id));
    const personTitles = new Set(navigablePeople.map((person) => person.title));

    const periodContext = timeline
      .map((period) => `${period.id}: ${period.title} (${period.dates}) — ${period.summary || ""}`)
      .join("\n");
    const peopleContext = navigablePeople
      .map((person) => `${person.title}: ${person.name}, ${person.years}; ${person.role}`)
      .join("\n");

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL,
        store: false,
        max_output_tokens: 550,
        parallel_tool_calls: false,
        instructions: `You are The History Guide, a friendly and accurate assistant for the Portugal — Travel Back in Time website.
Answer visitors' questions about Portuguese history, people, places, and historical eras. Respond in the user's language. Be concise, clear, and balanced. Use the site data when relevant. If something is uncertain or outside the provided content, say so rather than inventing facts.
When a visitor asks to OPEN, SHOW, FIND, or NAVIGATE to a site period, person, or main section, use the relevant function. Do not call a navigation function for an ordinary history question. Only navigate to items in the lists below. These tool calls are website UI actions, not external links.

SITE PERIODS (IDs and background):
${periodContext}

SITE PEOPLE (Wikipedia titles for go_to_person):
${peopleContext}`,
        input,
        tools
      }),
      signal: AbortSignal.timeout(25000)
    });

    let data;
    try {
      data = await response.json();
    } catch {
      console.error("OpenAI returned a non-JSON response", response.status);
      return res.status(502).json({ error: "The chatbot service returned an unexpected response. Please try again." });
    }

    if (!response.ok) {
      // Report actionable configuration issues without revealing API credentials.
      console.error("OpenAI API error:", response.status, data?.error?.code, data?.error?.message);
      if (response.status === 429) {
        return res.status(503).json({ error: "The chatbot has reached its API limit. Please try again later or contact the site owner." });
      }
      if (response.status === 401 || response.status === 403) {
        return res.status(503).json({ error: "The chatbot API credentials need attention from the site owner." });
      }
      return res.status(502).json({ error: "The AI service could not answer right now. Please try again later." });
    }

    const textParts = [];
    let action = null;

    for (const item of data.output || []) {
      if (item.type === "message") {
        for (const part of item.content || []) {
          if (part.type === "output_text" && typeof part.text === "string") {
            textParts.push(part.text);
          }
        }
      }

      if (item.type === "function_call" && !action) {
        let args;
        try {
          args = JSON.parse(item.arguments);
        } catch {
          continue;
        }
        if (!args || typeof args !== "object") continue;

        if (item.name === "go_to_period" && periodIds.has(args.id)) {
          action = { name: item.name, args: { id: args.id } };
        } else if (
          item.name === "go_to_person" && personTitles.has(args.wikipedia_title)
        ) {
          action = { name: item.name, args: { wikipedia_title: args.wikipedia_title } };
        } else if (
          item.name === "go_to_page" &&
          ["home", "timeline", "people", "resources"].includes(args.page)
        ) {
          action = { name: item.name, args: { page: args.page } };
        }
      }
    }

    const text = textParts.join("\n").trim();
    return res.status(200).json({
      text: text || (action ? "Opening that for you…" : "I couldn't answer that question. Please try asking another way."),
      action
    });
  } catch (error) {
    console.error("Chat handler error:", error);
    if (error?.name === "TimeoutError" || error?.name === "AbortError") {
      return res.status(504).json({ error: "The chatbot took too long to respond. Please try again." });
    }
    return res.status(500).json({ error: "The chatbot ran into a server problem. Please try again." });
  }
}
