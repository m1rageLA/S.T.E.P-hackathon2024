import { useEffect } from "react";
import { createScene } from "../scene/homePage/mainHome";

const HomePage = () => {
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.overflow = "hidden";

    // Создаем сцену и запускаем рендеринг
    const screen = createScene();
    screen.start();

    return () => {
      screen.stop();
      const renderTarget = document.getElementById("render-target");
      if (renderTarget) {
        renderTarget.innerHTML = ""; // Очищаем содержимое при размонтировании
      }
    };
  }, []);

  return (
    <div
      id="root-window"
      style={{ height: "100vh", width: "100vw", position: "relative" }} // Полная высота и ширина
    >
      <div
        id="render-target"
        style={{ height: "100%", width: "100%", position: "absolute" }} // Полная высота и ширина
      ></div>
    </div>
  );
};

export default HomePage;