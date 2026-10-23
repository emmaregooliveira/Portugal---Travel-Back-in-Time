/** The History Guide: browser-side interface (no secret keys here). */
(() => {
  "use strict";

  const launcher = document.getElementById("history-gpt-launcher");
  const panel = document.getElementById("history-gpt-panel");
  const closeButton = document.getElementById("history-gpt-close");
  const form = document.getElementById("history-gpt-form");
  const input = document.getElementById("history-gpt-input");
  const messagesElement = document.getElementById("history-gpt-messages");
  const sendButton = document.getElementById("history-gpt-send");

  if (!launcher || !panel || !closeButton || !form || !input || !messagesElement || !sendButton) {
    console.error("The History Guide is missing one or more HTML elements.");
    return;
  }

  const conversation = [];
  let waiting = false;
  let statusElement = null;

  function setOpen(open) {
    panel.hidden = !open;
    launcher.setAttribute("aria-expanded", String(open));
    if (open) input.focus();
    else launcher.focus();
  }

  function addMessage(role, content) {
    const element = document.createElement("div");
    element.className = `history-gpt__message history-gpt__message--${role}`;
    // Responses are plain text, not HTML. This avoids injecting markup.
    element.textContent = content;
    messagesElement.appendChild(element);
    messagesElement.scrollTop = messagesElement.scrollHeight;
    return element;
  }

  function setWaiting(value) {
    waiting = value;
    sendButton.disabled = value;
    input.disabled = value;
    sendButton.textContent = value ? "…" : "Send";
    panel.setAttribute("aria-busy", String(value));

    if (value) statusElement = addMessage("status", "Looking through the history…");
    else if (statusElement) {
      statusElement.remove();
      statusElement = null;
    }
  }

  launcher.addEventListener("click", () => setOpen(panel.hidden));
  closeButton.addEventListener("click", () => setOpen(false));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) setOpen(false);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question || waiting) return;

    addMessage("user", question);
    input.value = "";

    // A file:// page cannot host /api/chat. Live Server also does not run Vercel functions.
    if (window.location.protocol === "file:") {
      addMessage("assistant", "The chatbot needs the Vercel backend. Run this project with 'vercel dev' or open the deployed Vercel website.");
      return;
    }

    setWaiting(true);
    try {
      // Include this question; send only the most recent turns to control cost.
      const messages = [...conversation, { role: "user", content: question }].slice(-12);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages })
      });

      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error(response.status === 404
          ? "I can't find /api/chat. Use 'vercel dev' or deploy the site to Vercel, not VS Code Live Server."
          : "The chatbot backend returned an invalid response.");
      }

      if (!response.ok) {
        throw new Error(typeof data.error === "string" ? data.error : "The chatbot is unavailable right now.");
      }

      const answer = typeof data.text === "string" && data.text.trim()
        ? data.text.trim()
        : "I couldn't generate a response. Please try again.";

      addMessage("assistant", answer);
      conversation.push({ role: "user", content: question }, { role: "assistant", content: answer });
      // Don't keep an unlimited transcript in memory or send too much to the API.
      if (conversation.length > 12) conversation.splice(0, conversation.length - 12);

      if (data.action && typeof data.action.name === "string" && data.action.args) {
        window.dispatchEvent(new CustomEvent("portugal:assistant-action", { detail: data.action }));
      }
    } catch (error) {
      addMessage("assistant", error?.message || "Something went wrong. Please try again.");
    } finally {
      setWaiting(false);
      if (!panel.hidden) input.focus();
    }
  });
})();
