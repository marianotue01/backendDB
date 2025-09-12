/*
==================================================
File: chat.js
Summary:
- Input: Receives a POST request with:
    1. `question` - The user’s question.
    2. `systemPrompt` - A system instruction or context for the AI.
- Process:
    1. Validate HTTP method and required inputs.
    2. Check that the OpenRouter API key is available.
    3. Send a request to OpenRouter AI API with the system prompt and question.
    4. Receive and parse AI response.
    5. Return the AI answer or handle errors gracefully.
- Output: JSON response containing:
    - `answer` with the AI-generated text if successful.
    - `error` with details if something went wrong.
==================================================
*/

export default async function handler(req, res) {
  // -------------------------------------------------
  // Validate method and input
  // -------------------------------------------------
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question, systemPrompt } = req.body;
  if (!question || !systemPrompt) {
    return res.status(400).json({ error: "Missing question or systemPrompt" });
  }

  // -------------------------------------------------
  // Check API key
  // -------------------------------------------------
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error("ERROR: OPENROUTER_API_KEY not found");
    return res.status(500).json({ error: "Missing OpenRouter API key" });
  }

  // -------------------------------------------------
  // Call OpenRouter AI
  // -------------------------------------------------
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: question },
        ],
      }),
    });

    const data = await response.json();

    // -------------------------------------------------
    // Handle response
    // -------------------------------------------------
    if (data.choices && data.choices.length > 0) {
      return res.status(200).json({ answer: data.choices[0].message.content.trim() });
    } else {
      console.error("Unexpected response:", data);
      return res.status(500).json({ error: "Empty AI response", data });
    }
  } catch (error) {
    console.error("Error generating AI response:", error);
    return res.status(500).json({ error: "Error generating response", details: error.message });
  }
}
