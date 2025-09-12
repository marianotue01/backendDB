// src/components/Section.jsx
import React from "react";

/**
 * Section
 * 
 * Input:
 *  - title: string, title of the section
 *  - children: ReactNode, content to render inside the section
 * 
 * Description:
 *  A reusable section component that renders a title with an underline and 
 *  a content area with padding, rounded corners, and shadow. 
 *  Useful for organizing different blocks of content in the page.
 * 
 * Output:
 *  - Renders a styled <section> element with a header and children content.
 */
const Section = ({ title, children }) => (
  <section className="mb-6 bg-white p-6 rounded shadow">
    <h2 className="text-2xl font-bold mb-2 border-b border-indigo-600 pb-1">{title}</h2>
    <div className="text-justify leading-snug">{children}</div>
  </section>
);

export default Section;
