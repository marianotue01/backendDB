/*
==================================================
File: Amplitude.jsx
Summary:
- Input: User navigates to the Amplitude page.
- Process:
  1. Uses React Router's `useNavigate` to allow backward navigation.
  2. Renders a full-page container with padding, background, and font styling.
  3. Adds a fixed "Back" button in the top-right corner that navigates to the previous page when clicked.
  4. Displays a page title for the Amplitude dashboard.
  5. Embeds an Amplitude analytics dashboard via an iframe.
- Output: Shows the Amplitude dashboard in a full-page layout with a floating back button for navigation.
==================================================
*/

import React from "react";
import { useNavigate } from "react-router-dom";

export default function Amplitude() {
  const navigate = useNavigate(); // Allows navigating programmatically

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans text-gray-900 bg-gray-50 min-h-screen relative">

      {/* -------------------------------------------------
         Floating "Back" button
         Allows returning to the previous page
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
      <h1 className="text-3xl font-bold mb-6">Amplitude Dashboard</h1>

      {/* -------------------------------------------------
         Embedded Amplitude analytics dashboard
      ------------------------------------------------- */}
      <iframe
        src="https://app.eu.amplitude.com/analytics/share/477d7de2cde841179543b1fe4ce3f779"
        style={{ width: "100%", height: "80vh", border: "none" }}
        title="Amplitude Dashboard"
      />
    </div>
  );
}
