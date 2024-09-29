import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // Import useSelector and useDispatch
import { setBlurred } from "../redux/reduxSlice.js"; // Import your action
import { createScene } from "../scene/main.js";
import Terminal from "../components/Terminal.jsx";
import Explain from "../components/Explain.jsx";
import Test from "../components/Test.jsx";

const Workspace = () => {
  // State to control visibility of components
  const [showTerminal, setShowTerminal] = useState(false);
  const [showExplain, setShowExplain] = useState(false);
  const [showTest, setShowTest] = useState(false);

  // Accessing isBlurred state from Redux store
  const isBlurred = useSelector((state) => state.blur.isBlurred);
  const dispatch = useDispatch(); // Initialize dispatch

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

  // Function to update component visibility based on the current place
  const updateVisibility = () => {
    const currentPlace = localStorage.getItem("place");
    setShowTerminal(currentPlace === "Terminal_1");
    setShowExplain(currentPlace === "interact_table_1");
    setShowTest(currentPlace === "m_table_1");
  };

  useEffect(() => {
    // Call the updateVisibility function whenever isBlurred changes
    updateVisibility();
  }, [isBlurred]);

  // Toggle the blur effect and visibility of all components
  const toggleBlur = () => {
    dispatch(setBlurred(!isBlurred)); // Update Redux state
    if (isBlurred) {
      // If we are un-blurring, close all components and clear localStorage
      setShowTerminal(false);
      setShowExplain(false);
      setShowTest(false);
      localStorage.removeItem("place"); // Remove place from localStorage
    }
  };

  // Toggle visibility of each component
  const toggleTerminal = () => {
    setShowTerminal((prev) => !prev);
    dispatch(setBlurred(!isBlurred)); // Update blur state based on terminal state
    if (showTerminal) {
      localStorage.removeItem("place"); // Remove place from localStorage when closing
    }
  };

  const toggleExplain = () => {
    setShowExplain((prev) => !prev);
    dispatch(setBlurred(!isBlurred)); // Update blur state based on explain state
    if (showExplain) {
      localStorage.removeItem("place"); // Remove place from localStorage when closing
    }
  };

  const toggleTest = () => {
    setShowTest((prev) => !prev);
    dispatch(setBlurred(!isBlurred)); // Update blur state based on test state
    if (showTest) {
      localStorage.removeItem("place"); // Remove place from localStorage when closing
    }
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
