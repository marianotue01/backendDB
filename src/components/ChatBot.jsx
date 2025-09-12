// src/components/ChatBot.jsx
import React, { useState } from "react";
import { generateSystemPrompt } from "../data/chatprompt";

/*
==================================================
File: ChatBot.jsx
Summary:
- Input:
  - User text input via chat box.
- Process:
  1. Maintains state for messages, input field, and minimized state.
  2. Generates a system prompt once using `generateSystemPrompt()` for Mariano's CV context.
  3. sendMessage() sends the user's question to the server via POST to "api/chat".
  4. Receives the bot's answer and updates the messages array.
  5. Handles Enter key press to submit messages.
  6. Allows minimizing/maximizing the chat window.
- Output: Interactive floating chat window to ask questions about Mariano, showing conversation history.
==================================================
*/

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [minimized, setMinimized] = useState(false);

  const systemPrompt = generateSystemPrompt();

  // Send user message and fetch bot response
  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: "user", content: input }]);
    const question = input;
    setInput("");

    try {
      const res = await fetch("api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, systemPrompt }),
      });

      if (!res.ok) throw new Error("Server response error");

      const data = await res.json();
      setMessages(prev => [...prev, { role: "bot", content: data.answer || "No answer provided" }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: "bot", content: "Error: could not connect to server." }]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white border shadow-lg rounded-lg flex flex-col max-h-[500px] overflow-hidden z-50">
      
      {/* Header */}
      <div className="bg-indigo-600 text-white p-3 font-semibold flex justify-between items-center">
        <span>🤖 Ask anything about Mariano</span>
        <button
          onClick={() => setMinimized(!minimized)}
          className="text-white font-bold px-2 rounded hover:bg-indigo-700"
          aria-label={minimized ? "Maximize chat" : "Minimize chat"}
        >
          {minimized ? "🔼" : "🔽"}
        </button>
      </div>

      {!minimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={msg.role === "user" ? "text-right text-blue-700" : "text-left text-gray-800"}
              >
                <p className="bg-gray-100 inline-block px-3 py-1 rounded break-words">
                  {msg.content}
                </p>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-2 border-t flex">
            <input
              className="flex-1 text-sm px-2 py-1 border rounded mr-2"
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              disabled={minimized}
            />
            <button
              onClick={sendMessage}
              className="bg-indigo-600 text-white px-3 py-1 rounded text-sm"
              disabled={minimized}
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
}
