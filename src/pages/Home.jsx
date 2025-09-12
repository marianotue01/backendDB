/*
==================================================
File: Home.jsx
Summary:
- Input: User navigates to the home page of the CV Mariano PoC.
- Process:
  1. Imports React, routing, and reusable components.
  2. Imports static CV data (competencies, experience, certifications, education, languages).
  3. Defines global keywords to highlight in the text.
  4. Integrates Amplitude analytics via a script in useEffect.
  5. Renders main container with profile image, header info, and navigation buttons.
  6. Renders CV sections using the Section component:
     - About (AI-generated summary)
     - Core Competencies
     - Experience (with decorative backgrounds)
     - Certifications
     - Education
     - Languages
  7. Includes extra components: ChatBot and ExperienceTimeline.
- Output: Full interactive CV page with dynamic content, navigation, analytics, and AI-enhanced features.
==================================================
*/

import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// Components
import ChatBot from "../components/ChatBot";
import ExperienceTimeline from "../components/ExperienceTimeline";
import AudioPresentation from "../components/AudioPresentation";
import CvSummary from "../components/CvSummary";
import Section from "../components/Section";
import TextWithKeywords from "../components/TextWithKeywords";

// Data
import {
  coreCompetencies,
  experience,
  certifications,
  education,
  languages,
} from "../data/data";

// -------------------------------------------------
// Global keywords: terms to highlight in the CV
// -------------------------------------------------
const globalKeywords = ["Cloud", "Leadership", "Microservices", "KPIs"];

export default function Home() {
  // -------------------------------------------------
  // Analytics integration with Amplitude
  // Adds a script to the page that tracks user behavior
  // -------------------------------------------------
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.eu.amplitude.com/script/b097ae136ea29a9e2a454f3da8beb332.js";
    script.async = true;
    document.body.appendChild(script);

    // Initialize Amplitude after script loads
    script.onload = () => {
      if (window.amplitude) {
        window.amplitude.add(window.sessionReplay.plugin({ sampleRate: 1 }));
        window.amplitude.init("b097ae136ea29a9e2a454f3da8beb332", {
          fetchRemoteConfig: true,
          serverZone: "EU",
          autocapture: true,
        });
      }
    };

    // Cleanup script on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // -------------------------------------------------
  // Main page container
  // -------------------------------------------------
  return (
    <div className="max-w-6xl mx-auto p-6 font-sans text-gray-900 bg-gray-50 min-h-screen relative leading-snug">

      {/* -------------------------------------------------
         Profile image
         Positioned at top-right with shadow and rounded corners
      ------------------------------------------------- */}
      <img
        src="/4x4.jpg"
        alt="Photo of Mariano Tuero"
        className="absolute top-5 right-8 w-8 h-8 md:w-28 md:h-28 object-cover object-top rounded-full border shadow-md"
      />

      {/* -------------------------------------------------
         Header section: Name, title, location, contact info, audio presentation
      ------------------------------------------------- */}
      <header className="mb-6">
        <h1 className="text-4xl font-bold flex items-center gap-2">
          Mariano Tuero
          <AudioPresentation small /> {/* Plays an audio introduction */}
        </h1>

        <p className="text-lg font-semibold text-indigo-700">
          Senior Product Manager | Leader | Multilingual (ES/EN/PT)
        </p>

        <p className="text-sm text-gray-600">
          Warsaw, Poland | mariano.tuero@email.com
        </p>

        <p className="text-sm text-gray-600">
          +48 573 824 000 |{" "}
          <a
            href="https://linkedin.com/in/mtuero"
            className="text-indigo-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </p>

        {/* -------------------------------------------------
           Navigation buttons: links to other pages
        ------------------------------------------------- */}
        <div className="mt-3 flex gap-2">
          <Link
            to="/Hats"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            See more ...
          </Link>
          <Link
            to="/Amplitude"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Analytics
          </Link>
          <Link
            to="https://crud-gray-six.vercel.app/"
            className="inline-block px-6 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition"
          >
            DataBase PoC
          </Link>
        </div>
      </header>

      {/* -------------------------------------------------
         About section (AI-generated summary)
      ------------------------------------------------- */}
      <Section
        title={
          <>
            About <span className="text-sm font-normal">(Auto-generated by AI)</span>
          </>
        }
      >
        <CvSummary />
      </Section>

      {/* -------------------------------------------------
         Core Competencies section
      ------------------------------------------------- */}
      <Section title="Core Competencies">
        <ul>
          {coreCompetencies.map((item, i) => (
            <li key={i} className="text-sm">
              <TextWithKeywords text={item} keywords={globalKeywords} />
            </li>
          ))}
        </ul>
      </Section>

      {/* -------------------------------------------------
         Experience section with decorative images
      ------------------------------------------------- */}
      <Section title="Experience">
        {experience.map((exp, i) => (
          <div key={i} className="relative mb-6 p-4 bg-white rounded shadow-md overflow-hidden">

            {/* Decorative background image */}
            <img
              src={`/experience-bg-${i}.jpg`}
              alt="Decorative"
              className="hidden md:block absolute top-24 right-4 w-21 h-8 object-cover transform rotate-45 opacity-30 pointer-events-none"
            />

            {/* Role and company */}
            <h3 className="text-xl font-semibold text-blue-700">
              {exp.role} | {exp.company}
            </h3>

            {/* Period */}
            <p className="text-sm text-green-600 mb-2">[{exp.period}]</p>

            {/* Description list */}
            <ul className="list-disc list-inside text-gray-700 text-sm">
              {exp.description.map((desc, j) => (
                <li key={j}>
                  <TextWithKeywords text={desc} keywords={globalKeywords} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      {/* -------------------------------------------------
         Certifications section
      ------------------------------------------------- */}
      <Section title="Certifications">
        <ul>
          {certifications.map((cert, i) => (
            <li key={i} className="text-sm">
              <TextWithKeywords text={cert} keywords={globalKeywords} />
            </li>
          ))}
        </ul>
      </Section>

      {/* -------------------------------------------------
         Education section
      ------------------------------------------------- */}
      <Section title="Education">
        <p className="text-sm">
          <TextWithKeywords text={education} keywords={globalKeywords} />
        </p>
      </Section>

      {/* -------------------------------------------------
         Languages section
      ------------------------------------------------- */}
      <Section title="Languages">
        <ul>
          {languages.map((lang, i) => (
            <li key={i} className="text-sm">
              <TextWithKeywords text={lang} keywords={globalKeywords} />
            </li>
          ))}
        </ul>
      </Section>

      {/* -------------------------------------------------
         Extra components
         ChatBot: floating chat to ask questions about Mariano
         ExperienceTimeline: horizontal timeline view of career & certifications
      ------------------------------------------------- */}
      <ChatBot />
      <ExperienceTimeline />
    </div>
  );
}
