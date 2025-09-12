/*
==================================================
File: CvSummary.jsx
Summary:
- Input:
  - CV data imported from data.js (about, competencies, experience, certifications, education, languages)
- Process:
  1. Initializes state for summary text and loading status.
  2. On component mount, constructs a system prompt summarizing the full CV.
  3. Sends the prompt to the backend API `/api/chat` requesting a concise 3-4 sentence summary.
  4. Updates the summary state with the returned answer.
  5. Handles loading and error states.
- Output:
  - Displays a concise, AI-generated CV summary.
==================================================
*/

import React, { useState, useEffect } from "react";
import {
  about,
  coreCompetencies,
  experience,
  certifications,
  education,
  languages,
} from "../data/data";

export default function CvSummary() {
  // -------------------------------------------------
  // State management
  // -------------------------------------------------
  const [summary, setSummary] = useState(""); 
  const [loading, setLoading] = useState(true); 

  // -------------------------------------------------
  // Generate CV summary once when component mounts
  // -------------------------------------------------
  useEffect(() => {
    const generateSummary = async () => {
      // Build system prompt with all CV data
      const systemPrompt = `
You are an assistant that generates a concise, professional CV summary.
Summarize clearly and professionally the following CV:

About: ${about}

Core Competencies: ${coreCompetencies.join(", ")}

Experience: ${experience
        .map((exp) => `${exp.role} at ${exp.company} (${exp.period})`)
        .join("; ")}

Certifications: ${certifications.join(", ")}

Education: ${education}

Languages: ${languages.join(", ")}
      `;

      try {
        // Send request to backend API
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: "Please summarize this CV in 3-4 sentences.",
            systemPrompt,
          }),
        });

        if (!res.ok) throw new Error("API error");

        const data = await res.json();
        setSummary(data.answer || "No summary generated.");
      } catch (err) {
        console.error(err);
        setSummary("Error generating summary.");
      } finally {
        setLoading(false);
      }
    };

    generateSummary();
  }, []);

  // -------------------------------------------------
  // Render
  // -------------------------------------------------
  return (
    <div className="my-1 p-1">
      {loading ? (
        <p className="text-sm text-gray-500">Generating summary ...</p>
      ) : (
        <p className="text-sm text-gray-800">{summary}</p>
      )}
    </div>
  );
}
