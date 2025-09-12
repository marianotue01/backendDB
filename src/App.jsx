/*
==================================================
File: App.jsx
Summary:
- Input: User navigation through URLs ("/", "/Hats", "/Amplitude").
- Process:
  1. Sets up application routing using React Router.
  2. Defines routes that render different components based on the URL.
  3. Integrates Vercel Analytics to track user interactions.
- Output: Renders the component corresponding to the current route and sends analytics data to Vercel.
==================================================
*/

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // Main CV page
import Hats from "./pages/Hats"; // "Hats" page
import Amplitude from "./pages/Amplitude"; // Amplitude dashboard page
import { Analytics } from "@vercel/analytics/react"; // Vercel analytics integration

export default function App() {
  return (
    <Router>
      {/* Wraps the app to enable routing */}
      <Routes>
        {/* Route definitions */}
        <Route path="/" element={<Home />} />         {/* Home page */}
        <Route path="/Hats" element={<Hats />} />     {/* Hats page */}
        <Route path="/Amplitude" element={<Amplitude />} /> {/* Amplitude page */}
      </Routes>

      {/* Vercel Analytics for tracking user events */}
      <Analytics />
    </Router>
  );
}
