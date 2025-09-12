/*
==================================================
File: Hats.jsx
Summary:
- Input: User navigates to the "Hats" page.
- Process:
  1. Uses React Router's `useNavigate` for backward navigation.
  2. Renders a full-page container with padding, background, font styling, and readable line spacing.
  3. Adds a floating "Back" button to navigate to the previous page.
  4. Displays the main page title explaining the "Three Hats" concept.
  5. Renders multiple content sections representing different roles/tasks:
     - Roadmap
     - Customer Facing
     - Day to Day
     - Deliverables
     - Application & Product Owner
     - Agile Coach/Champion
     Each section includes a heading, emoji icon, and a list of responsibilities/tasks.
  6. Decorative images placed behind content using absolute positioning and opacity.
- Output: Visually structured page summarizing Mariano’s roles/“hats” with navigation and visual styling.
==================================================
*/

import React from "react";
import { useNavigate } from "react-router-dom";

const ThreeHatsPage = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate back

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans text-gray-900 bg-gray-50 min-h-screen relative leading-snug">

      {/* -------------------------------------------------
         Floating "Back" button at top-right
      ------------------------------------------------- */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-6 right-6 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition z-50"
      >
        Volver
      </button>

      {/* -------------------------------------------------
         Page title
      ------------------------------------------------- */}
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        What are the common activities I do? I wear three hats: 🎩
      </h1>

      {/* -------------------------------------------------
         First set of roles: Roadmap, Customer Facing, Day to Day, Deliverables
         Decorative image behind content
      ------------------------------------------------- */}
      <div className="relative bg-white p-6 rounded shadow-md w-full max-w-6xl mb-6 overflow-hidden">
        <img
          src="/sombreronegro.jpg"
          alt="Decorative"
          className="absolute top-1 right-1 w-80 h-80 object-contain opacity-70 pointer-events-none hidden md:block"
        />

        {/* Roadmap section */}
        <RoleSection title="Roadmap" items={[
          "Make the feature roadmap visible to all stakeholders and dev team",
          "Prioritize product requirements for development",
          "Manage and groom the backlog efficiently",
          "Track progress and ensure timely feature releases",
          "Plan strategic feature launches"
        ]} />

        {/* Customer Facing section */}
        <RoleSection title="Customer facing" items={[
          "Translate customer needs into actionable product features",
          "Identify true customer problems vs perceived wants",
          "Convert customer language into technical requirements"
        ]} />

        {/* Day to Day section */}
        <RoleSection title="Day to day" items={[
          "Advocate for customers with Product Owners and development teams",
          "Ensure all Epics/Features/Stories have correct acceptance criteria",
          "Foster collaboration across Product Owners and dev teams",
          "Prioritize and resolve defects or bugs quickly",
          "Monitor Azure subscriptions and optimize costs/resources"
        ]} />

        {/* Deliverables section */}
        <RoleSection title="Deliverables" items={[
          "Define and communicate product vision",
          "Create problem statements and scenarios",
          "Maintain and update product roadmaps",
          "Keep strategic backlog current – Epics & Features",
          "Build Permits presentations",
          "Prepare supporting documents for all deliverables",
          "Manage Product Increments"
        ]} />
      </div>

      {/* -------------------------------------------------
         Application & Product Owner section
         Decorative image behind content
      ------------------------------------------------- */}
      <div className="relative bg-white p-6 rounded shadow-md w-full max-w-6xl mb-6 overflow-hidden">
        <img
          src="/sombreromarron.jpg"
          alt="Decorative"
          className="absolute top-1 right-4 w-44 h-44 object-contain opacity-70 pointer-events-none hidden md:block"
        />
        <RoleSection title="Application & Product Owner" items={[
          "Resiliency & Failover – Manage timelines and CPOF issues",
          "Monitor IT Risk Central (ITRC) for automated break detection",
          "Maintain up-to-date Application Inventory (lifecycle, roles, components)",
          "Approve/reject access entitlements for products",
          "Participate in Agile ceremonies",
          "Keep execution backlog up-to-date – User Stories",
          "Manage release processes efficiently"
        ]} emoji="🎩" bgColor="bg-gray-200" />
      </div>

      {/* -------------------------------------------------
         Agile Coach / Champion section
         Decorative image behind content
      ------------------------------------------------- */}
      <div className="relative bg-white p-6 rounded shadow-md w-full max-w-6xl mb-1 overflow-hidden">
        <img
          src="/sombreroazul.jpg"
          alt="Decorative"
          className="absolute top-0 right-6 w-40 h-40 object-contain opacity-70 pointer-events-none hidden md:block"
        />
        <RoleSection title="As Agile Coach/Champion" items={[
          "Guide teams through their Agile transformation journey (SM, PO, PM experience)",
          "Actively contribute to company Agile Communities of Practice",
          "Coordinate Product Increment (PI) planning and execution",
          "Mentor team members on Agile best practices and continuous improvement"
        ]} emoji="🎩" bgColor="bg-blue-500" />
      </div>

    </div>
  );
};

// -------------------------------------------------
// RoleSection component: reusable for all roles
// Props:
// - title: section title
// - items: array of responsibility/task strings
// - emoji (optional): emoji icon
// - bgColor (optional): background color for emoji circle
// -------------------------------------------------
const RoleSection = ({ title, items, emoji = "🎩", bgColor = "bg-green-100" }) => (
  <div className="mb-4 relative z-10">
    <div className="flex items-center mb-1">
      <div className={`w-6 h-6 mr-2 rounded-full flex items-center justify-center text-white ${bgColor}`}>
        {emoji}
      </div>
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
    <ul className="list-disc list-inside text-gray-700 space-y-1">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </div>
);

export default ThreeHatsPage;
