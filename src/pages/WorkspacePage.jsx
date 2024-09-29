import React, { useEffect, useState } from "react";
import { createScene } from "../scene/main.js";
import Terminal from "../components/Terminal.jsx";
import Explain from "../components/Explain.jsx";
import Test from "../components/Test.jsx";

const Workspace = () => {
  // State to control visibility and blur effect for all components
  const [isBlurred, setIsBlurred] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showExplain, setShowExplain] = useState(false);
  const [showTest, setShowTest] = useState(false);

  useEffect(() => {
    // Update style
    document.body.style.margin = "0";
    document.body.style.overflow = "hidden";

    // Start the rendering loop
    const screen = createScene();
    screen.start();

    // Set listeners
    document.addEventListener("mousedown", screen.listener.onMouseDown, false);
    document.addEventListener("mouseup", screen.listener.onMouseUp, false);
    document.addEventListener("mousemove", screen.listener.onMouseMove, false);

    // Update the canvas size
    const updateCanvasSize = () => {
      const renderTarget = document.getElementById("render-target");
      if (renderTarget) {
        const width = window.innerWidth;
        const height = window.innerHeight;

        renderTarget.style.width = `${width}px`;
        renderTarget.style.height = `${height}px`;

        screen.updateSize(width, height);
      }
    };
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Cleanup the canvas
    return () => {
      screen.stop();
      const renderTarget = document.getElementById("render-target");
      if (renderTarget) {
        renderTarget.innerHTML = "";
      }
    };
  }, []);

  // Toggle the blur effect and visibility of all components
  const toggleBlur = () => {
    setIsBlurred((prev) => !prev);
    if (isBlurred) {
      // If we are un-blurring, close all components
      setShowTerminal(false);
      setShowExplain(false);
      setShowTest(false);
    }
  };

  // Toggle visibility of each component
  const toggleTerminal = () => {
    setShowTerminal((prev) => !prev);
    setIsBlurred((prev) => !prev); // Change blur state based on terminal state
  };

  const toggleExplain = () => {
    setShowExplain((prev) => !prev);
    setIsBlurred((prev) => !prev); // Change blur state based on explain state
  };

  const toggleTest = () => {
    setShowTest((prev) => !prev);
    setIsBlurred((prev) => !prev); // Change blur state based on test state
  };

  return (
    <>
      <div>
        <button onClick={toggleBlur}>
          {isBlurred ? "Show Components" : "Hide Components"}
        </button>
        <button onClick={toggleTerminal}>
          {showTerminal ? "Close Terminal" : "Open Terminal"}
        </button>
        <button onClick={toggleExplain}>
          {showExplain ? "Close Explain" : "Open Explain"}
        </button>
        <button onClick={toggleTest}>
          {showTest ? "Close Test" : "Open Test"}
        </button>

        {/* Render components based on state */}
        {showTerminal && <Terminal />}
        {showExplain && <Explain />}
        {showTest && <Test />}
      </div>

      <div className={`blure ${isBlurred ? "blure-active" : ""}`}>
        <div
          id="root-window"
          style={{ height: "100vh", width: "100vw", position: "relative" }} // Full viewport height and width
        >
          <div
            id="render-target"
            style={{ height: "100%", width: "100%", position: "absolute" }} // Full height and width, positioned absolutely
          ></div>
        </div>
      </div>
    </>
  );
};

export default Workspace;
