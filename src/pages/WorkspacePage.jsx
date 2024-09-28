import { useEffect } from 'react';
import { createScene } from '../scene/main.js';

const Workspace = () => {
  useEffect(() => {
    // Update style
    document.body.style.margin = '0'; 
    document.body.style.overflow = 'hidden';
    
    // Start the rendering loop
    const screen = createScene();
    screen.start();

    // Set listeners
    document.addEventListener("mousedown", screen.listener.onMouseDown, false)
    document.addEventListener("mouseup", screen.listener.onMouseUp, false)
    document.addEventListener("mousemove", screen.listener.onMouseMove, false)

    // Update the canvas size
    const updateCanvasSize = () => {
      const renderTarget = document.getElementById('render-target');
      if (renderTarget) {
        const width = window.innerWidth;
        const height = window.innerHeight;

        renderTarget.style.width = `${width}px`;
        renderTarget.style.height = `${height}px`;
        
        screen.updateSize(width, height);
      }
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Cleanup the canvas
    return () => {
      screen.stop();
      const renderTarget = document.getElementById('render-target');
      if (renderTarget) {
        renderTarget.innerHTML = '';
      }
    };
  }, []);

  return (
    <div
      id="root-window"
      style={{ height: '100vh', width: '100vw', position: 'relative' }} // Full viewport height and width
    >
      <div
        id="render-target"
        style={{ height: '100%', width: '100%', position: 'absolute' }} // Full height and width, positioned absolutely
      ></div>
    </div>
  );
};

export default Workspace;