/*
==================================================
File: ExperienceTimeline.jsx
Summary:
- Input:
  - experienceData: array of objects with title, company, date, icon, type (job or certification)
- Process:
  1. Renders a horizontal timeline with a line in the center.
  2. Positions items above or below the line in alternating fashion.
  3. Styles jobs and certifications differently with gradients and colors.
  4. Displays icons in the middle of each item.
- Output:
  - A horizontal, scrollable timeline showing experience and certifications.
==================================================
*/

import React from "react";
import { FaBriefcase, FaUniversity, FaCloud } from "react-icons/fa";

// -------------------------------------------------
// Timeline data: experience and certifications
// -------------------------------------------------
const experienceData = [
  { title: "Certified SAFe® 6 PO/PdM", company: "Scaled Agile", date: "2024", icon: <FaUniversity />, type: "cert" },
  { title: "Senior Product Manager", company: "EY", date: "2022-Today", icon: <FaBriefcase />, type: "job" },
  { title: "Certified Scrum PO (CSPO)", company: "Scrum Alliance", date: "2022", icon: <FaUniversity />, type: "cert" },
  { title: "Senior Product Manager", company: "J.P. Morgan", date: "2021-2022", icon: <FaBriefcase />, type: "job" },
  { title: "Azure Fundamentals", company: "Azure", date: "2021", icon: <FaCloud />, type: "cert" },
  { title: "PMI Agile Certified Practitioner", company: "PMI", date: "2019", icon: <FaUniversity />, type: "cert" },
  { title: "Senior Product Manager", company: "ExxonMobil", date: "2013-2021", icon: <FaBriefcase />, type: "job" },
  { title: "Senior Scrum Master", company: "ExxonMobil", date: "2008-2013", icon: <FaBriefcase />, type: "job" },
  { title: "Mainframe Supervisor", company: "IBM", date: "2004-2008", icon: <FaBriefcase />, type: "job" },
  { title: "M.Eng. in Systems Engineering", company: "UTN", date: "2001-2006", icon: <FaUniversity />, type: "cert" },
  { title: "Technical Writer", company: "IBM", date: "2001-2004", icon: <FaBriefcase />, type: "job" },
  { title: "B.Sc. in Systems Engineering", company: "UTN", date: "1997-2001", icon: <FaUniversity />, type: "cert" },
];

// -------------------------------------------------
// ExperienceTimeline component
// -------------------------------------------------
const ExperienceTimeline = () => (
  <div className="overflow-x-auto py-10">
    {/* Timeline container */}
    <div className="flex relative items-center justify-start min-w-[1500px]">
      {/* Horizontal line in the center */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 z-0" />

      {/* Timeline items */}
      {experienceData.map((item, i) => {
        // Alternate items above/below line
        const topOffset = i % 2 === 0 ? (item.type === "job" ? 24 : -32) : (item.type === "job" ? 32 : -24);

        return (
          <div key={i} className="relative flex flex-col items-center w-48 mx-4 z-10" style={{ top: topOffset }}>
            {/* Info box */}
            <div className="mb-2 text-center">
              <div
                className={`rounded-lg shadow-md px-3 py-2 text-sm ${
                  item.type === "job"
                    ? "bg-gradient-to-r from-black via-gray-800 to-white text-white"
                    : "bg-gradient-to-r from-blue-600 via-blue-300 to-white text-black"
                }`}
                style={{ maxWidth: "12rem" }}
              >
                <p className="text-xs italic text-gray-200">{item.date}</p>
                <p className="font-semibold text-sm">{item.title}</p>
                <p className="text-xs">{item.company}</p>
              </div>
            </div>

            {/* Icon in the middle */}
            <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full border-2 border-gray-400 z-10 shadow-md">
              {item.icon}
            </div>

            {/* Spacer */}
            <div className="mt-2" />
          </div>
        );
      })}
    </div>
  </div>
);

export default ExperienceTimeline;
