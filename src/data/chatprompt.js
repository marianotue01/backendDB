/*
==================================================
File: chatprompt.js
Summary:
- Input: None directly; imports CV data from `data.js`.
- Process:
  1. Imports all relevant CV data: about, core competencies, experience, certifications, education, languages.
  2. Exports a function `generateSystemPrompt` that builds a single formatted string.
  3. The string is designed as a system prompt for a chatbot, instructing it to:
     - Identify itself as an expert on Mariano Tuero's career.
     - Always mention "Mariano" explicitly at the start of responses.
     - Use the imported CV data to answer questions accurately.
  4. Each section of the CV (About, Core Competencies, Experience, Certifications, Education, Languages) is formatted clearly with bullets or structured text.
- Output: A single string representing the complete system prompt for AI or chatbot usage.
==================================================
*/

import { about, coreCompetencies, experience, certifications, education, languages } from "./data";

// -------------------------------------------------
// Function: generateSystemPrompt
// Description:
//  Builds a formatted system prompt string using all CV data
//  This string will be sent to the chatbot AI to provide context about Mariano.
// Input: None
// Output: String containing full CV formatted for chatbot
// -------------------------------------------------
export const generateSystemPrompt = () => {
  return `
You are an expert assistant on Mariano Tuero’s career and CV. 
Always start your responses by mentioning "Mariano" explicitly at the beginning. 
Use the following information to answer questions accurately:

About:
${about}

Core Competencies:
${coreCompetencies.map(c => "- " + c).join("\n")}

Experience:
${experience
  .map(
    exp =>
      `${exp.role} at ${exp.company} (${exp.period}):\n${exp.description
        .map(d => "- " + d)
        .join("\n")}`
  )
  .join("\n\n")}

Certifications:
${certifications.map(c => "- " + c).join("\n")}

Education:
${education}

Languages:
${languages.map(l => "- " + l).join("\n")}
`;
};
