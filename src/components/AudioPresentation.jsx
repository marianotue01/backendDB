/*
==================================================
File: AudioPresentation.jsx
Summary:
- Input: 
  - `small` (boolean) - determines the button size
- Process:
  1. Uses a React ref to access the audio element.
  2. Defines a handlePlay function to play audio on click.
  3. Renders a button with conditional styling based on the `small` prop.
  4. Renders an audio element with a source and fallback text.
- Output: A clickable button that plays the audio clip.
==================================================
*/

import React, { useRef } from "react";

/**
 * AudioPresentation
 * 
 * Props:
 *  - small: boolean, optional, default=false
 * 
 * Description:
 *  Renders a button to play a short audio clip.
 *  Button size adjusts based on the `small` prop.
 */
const AudioPresentation = ({ small = false }) => {
  // Ref to the <audio> element
  const audioRef = useRef(null);

  // Play the audio when button is clicked
  const handlePlay = () => {
    audioRef.current?.play(); // optional chaining for safety
  };

  return (
    <div>
      {/* Play button */}
      <button
        onClick={handlePlay}
        className={`${
          small
            ? "px-2 py-1 text-sm rounded-lg"
            : "px-6 py-2 text-base rounded-xl"
        } bg-blue-600 text-white shadow-md hover:bg-blue-700 transition`}
      >
        🔊
      </button>

      {/* Audio element */}
      <audio ref={audioRef}>
        <source src="/welcome.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPresentation;
