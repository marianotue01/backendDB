// src/components/TextWithKeywords.jsx
import React from "react";

/**
 * Keyword
 * 
 * Input: children (React node)
 * Description: Highlights a word with a specific color and subtle shadow.
 * Output: Renders the children text with styling.
 */
const Keyword = ({ children }) => (
  <span className="text-indigo-700 drop-shadow-sm">{children}</span>
);

/**
 * TextWithKeywords
 * 
 * Input:
 *  - text: string, full text to render
 *  - keywords: string[], list of keywords to highlight
 * 
 * Description:
 *  Splits text into words and wraps any word that matches a keyword or a percentage
 *  (e.g., 80%) with the Keyword component.
 * 
 * Output:
 *  - React fragment containing text with highlighted keywords.
 */
export default function TextWithKeywords({ text, keywords = [] }) {
  return (
    <>
      {text.split(" ").map((word, idx) => {
        // Remove punctuation to check for keyword match
        const cleanWord = word.replace(/[.,;:()]/g, "");

        // Check if word is a keyword or a percentage
        const highlight = keywords.includes(cleanWord) || /\d+%/.test(cleanWord);

        return highlight ? <Keyword key={idx}>{word} </Keyword> : word + " ";
      })}
    </>
  );
}
