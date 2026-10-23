
import fs from "node:fs";
import path from "node:path";


const tools = [
  {
    type: "function",
    name: "go_to_period",
    description: "Open a historical period on the website.",
    parameters: {
      type: "object",
      properties: {
        id: { type: "string" }
      },
      required: ["id"],
      additionalProperties: false
    },
    strict: true
  },
  {
    type: "function",
    name: "go_to_person",
    description: "Open a person in the website's people directory.",
    parameters: {
      type: "object",
      properties: {
        wikipedia_title: { type: "string" }
      },
      required: ["wikipedia_title"],
      additionalProperties: false
    },
    strict: true
  },
  {
    type: "function",
    name: "go_to_page",
    description: "Navigate to a main website section.",
    parameters: {
      type: "object",
      properties: {
        page: {
          type: "string",
          enum: ["home", "timeline", "people", "resources"]
        }
      },
      required: ["page"],
      additionalProperties: false
    },
    strict: true
  }
];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({
      error: "The assistant API key is not configured."
    });
  }

  try {
const readData = (file) =>
  JSON.parse(
    fs.readFileSync(path.join(process.cwd(), file), "utf8")
  );

const timeline = readData("data/timeline.json");
const people = readData("data/people.json");

    const periodIds = new Set(timeline.map((p) => p.id));
    const personTitles = new Set(people.map((p) => p.title));

    const context = timeline
      .map((p) => `${p.id}: ${p.title} (${p.dates}) — ${p.summary}`)
      .join("\n");

    const peopleContext = people
      .map((p) => `${p.title}: ${p.years}; ${p.role}`)
      .join("\n");

    const messages = Array.isArray(req.body?.messages)
      ? req.body.messages
      : [];

    const input = messages
      .slice(-10)
      .filter(
        (m) =>
          ["user", "assistant"].includes(m.role) &&
          typeof m.content === "string"
      )
      .map((m) => ({
        role: m.role,
        content: m.content.slice(0, 1000)
      }));

    if (!input.length || !input.some((m) => m.role === "user")) {
      return res.status(400).json({
        error: "Please enter a message."
      });
    }

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL,
          instructions: `
You are a helpful, concise guide to Portuguese history.

Answer questions using the website data when possible. Be honest
when information is incomplete or uncertain.

When a visitor asks to navigate, use the appropriate function.
Only use period IDs and person titles listed below.

PERIODS:
${context}

PEOPLE:
${peopleContext}
          `,
          input,
          tools
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI API error:", data.error?.message);
      return res.status(502).json({
        error: "The assistant could not respond. Please try again."
      });
    }

    let text = "";
    let action = null;

    for (const item of data.output || []) {
      if (item.type === "message") {
        for (const content of item.content || []) {
          if (content.type === "output_text") {
            text += content.text;
          }
        }
      }

      if (item.type === "function_call") {
        let args;

        try {
          args = JSON.parse(item.arguments);
        } catch {
          continue;
        }

        if (
          item.name === "go_to_period" &&
          periodIds.has(args.id)
        ) {
          action = { name: item.name, args: { id: args.id } };
        }

        if (
          item.name === "go_to_person" &&
          personTitles.has(args.wikipedia_title)
        ) {
          action = {
            name: item.name,
            args: { wikipedia_title: args.wikipedia_title }
          };
        }

        if (
          item.name === "go_to_page" &&
          ["home", "timeline", "people", "resources"].includes(args.page)
        ) {
          action = {
            name: item.name,
            args: { page: args.page }
          };
        }
      }
    }

    return res.status(200).json({
      text: text || (action ? "Taking you there…" : "I couldn't generate a response. Please try again."),
      action
    });
  } catch (error) {
    console.error("Chat handler error:", error);
    return res.status(500).json({
      error: "Something went wrong. Please try again."
    });
  }
}
