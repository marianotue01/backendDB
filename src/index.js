/*
==================================================
File: index.js
Summary:
- Input: The root HTML element in the DOM with id "root".
- Process:
  1. Imports React and ReactDOM to render the React application.
  2. Imports global CSS styles.
  3. Imports the main App component.
  4. Creates a React root and renders the App inside React's StrictMode.
- Output: Mounts the React application to the DOM and initializes the app with all global styles and routing.
==================================================
*/

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";  // Global styles, including Tailwind and custom CSS
import App from "./App"; // Main application component

// Create React root and render App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
