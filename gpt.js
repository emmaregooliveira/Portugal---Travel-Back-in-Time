
(() => {
  "use strict";

  const launcher = document.getElementById("history-gpt-launcher");
  const panel = document.getElementById("history-gpt-panel");
  const closeButton = document.getElementById("history-gpt-close");
  const form = document.getElementById("history-gpt-form");
  const input = document.getElementById("history-gpt-input");
  const messagesElement = document.getElementById("history-gpt-messages");
  const sendButton = document.getElementById("history-gpt-send");

  // Stop safely if the chat elements are missing.
  if (
    !launcher ||
    !panel ||
    !closeButton ||
    !form ||
    !input ||
    !messagesElement ||
    !sendButton
  ) {
    console.error("The Portugal history chat could not find its HTML elements.");
    return;
  }

  const messages = [];
  let waiting = false;
  let statusElement = null;

  function setOpen(open) {
    panel.hidden = !open;
    launcher.setAttribute("aria-expanded", String(open));

    if (open) {
      input.focus();
    } else {
      launcher.focus();
    }
  }

  function addMessage(role, content, extraClass = "") {
    const element = document.createElement("div");
    element.className =
      "history-gpt__message history-gpt__message--" + role;

    if (extraClass) {
      element.classList.add(extraClass);
    }

    // Display text safely; never interpret the response as HTML.
    element.textContent = content;
    messagesElement.appendChild(element);
    messagesElement.scrollTop = messagesElement.scrollHeight;

    return element;
  }

  function setWaiting(isWaiting) {
    waiting = isWaiting;
    sendButton.disabled = isWaiting;
    input.disabled = isWaiting;
    sendButton.textContent = isWaiting ? "…" : "Send";

    if (isWaiting) {
      statusElement = addMessage(
        "status",
        "Looking through the history…"
      );
    } else if (statusElement) {
      statusElement.remove();
      statusElement = null;
    }
  }

  launcher.addEventListener("click", () => {
    setOpen(panel.hidden);
  });

  closeButton.addEventListener("click", () => {
    setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) {
      setOpen(false);
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const content = input.value.trim();

    if (!content || waiting) return;

    messages.push({ role: "user", content });
    addMessage("user", content);

    input.value = "";
    setWaiting(true);

    try {
      const response = await fetch("chat.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ messages })
      });

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error("The server returned an invalid response.");
      }

      if (!response.ok) {
        throw new Error(
          data.error || "The assistant is unavailable. Please try again."
        );
      }

      if (typeof data.text === "string" && data.text.trim()) {
        messages.push({
          role: "assistant",
          content: data.text
        });

        addMessage("assistant", data.text);
      }

      if (data.action && typeof data.action.name === "string") {
        window.dispatchEvent(
          new CustomEvent("portugal:assistant-action", {
            detail: data.action
          })
        );
      }

      if (
        !(typeof data.text === "string" && data.text.trim()) &&
        !data.action
      ) {
        addMessage(
          "assistant",
          "I couldn't find a response. Please try asking another way."
        );
      }
    } catch (error) {
      addMessage(
        "assistant",
        error.message || "Sorry, something went wrong. Please try again."
      );
    } finally {
      setWaiting(false);

      if (!panel.hidden) {
        input.focus();
      }
    }
  });
})();

