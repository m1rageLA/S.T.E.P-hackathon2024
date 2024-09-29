import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; 
import { setBlurred } from "../redux/reduxSlice.js"; 
import { createScene } from "../scene/main.js";
import Terminal from "../components/Terminal.jsx";
import Explain from "../components/Explain.jsx";
import Test from "../components/Test.jsx";
import Task from "../components/Task.jsx";
// import Robot from "../components/Robot.jsx";

const Workspace = () => {
  // State to control visibility of components
  const [showTerminal, setShowTerminal] = useState(false);
  const [showExplain, setShowExplain] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [showRobot, setShowRobot] = useState(false);

  // Accessing isBlurred state from Redux store
  const isBlurred = useSelector((state) => state.blur.isBlurred);
  const dispatch = useDispatch(); 

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

  // Function to update component visibility based on the current place in localStorage
  const updateVisibility = () => {
    const currentPlace = localStorage.getItem("place");
    setShowTerminal(currentPlace === "Terminal_1");
    setShowExplain(currentPlace === "interact_table_1");
    setShowTest(currentPlace === "m_table_1");
    setShowRobot(currentPlace === "Untitled")

    if (!currentPlace) {
      dispatch(setBlurred(false)); // Unblur if nothing is active
    } else {
      dispatch(setBlurred(true)); // Blur if any component is active
    }
  };

  useEffect(() => {
    // Update visibility when isBlurred changes
    updateVisibility();
  }, [isBlurred]);

  useEffect(() => {
    // Listen for changes in localStorage to trigger component visibility
    window.addEventListener("storage", updateVisibility);

    return () => {
      window.removeEventListener("storage", updateVisibility);
    };
  }, []);

  return (
    <>
      {/* Render components based on state */}
      {showTerminal && <Task />}
      {showExplain && <Terminal />}
      {showRobot && <Explain />}
      {showTest && <Test />}

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
