import { useEffect } from "react";
import { createScene } from "../scene/homePage/mainHome";
import Button from "../components/Button";

const HomePage = () => {
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.overflow = "hidden";

    const screen = createScene();
    screen.start();

    return () => {
      screen.stop();
      const renderTarget = document.getElementById("render-target");
      if (renderTarget) {
        renderTarget.innerHTML = "";
      }
    };
  }, []);

  return (
    <>
      <div className="home">
        <header>
          <nav>
            <li>
              <a className="list-element--active" href="#">
                Main
              </a>
            </li>
            <li>
              <a className="list-element" href="#">
                Info
              </a>
            </li>
            <li>
              <a className="list-element" href="#">
                Team
              </a>
            </li>
            <li>
              <a className="list-element" href="#">
                Play
              </a>
            </li>
          </nav>
        </header>
        <main className="main">
          <div className="main__textBlock">
            <div>
              <p>CLICK CLACK</p>
              <h2>S.T.E.P</h2>
              <a href="/workSpace">
              <Button value={"Start"} type={"button"} width={"100%"}/>
              </a>

            </div>
          </div>
        </main>
      </div>
      <div
        id="root-window"
        style={{ height: "100vh", width: "100vw", position: "relative" }}
      >
        <div
          id="render-target"
          style={{ height: "100%", width: "100%", position: "absolute" }}
        ></div>
      </div>
    </>
  );
};

export default HomePage;
