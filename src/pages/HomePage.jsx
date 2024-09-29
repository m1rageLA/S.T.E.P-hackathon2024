import { useEffect, useState } from "react";
import { createScene } from "../scene/homePage/mainHome";
import { useSpring, animated } from "@react-spring/web";
import Button from "../components/Button";

const HomePage = () => {
  let [navState, setNavState] = useState(0);

  // Animation for the 'home' div
  const homeSpring = useSpring({
    from: { transform: "translateX(-100%)" }, // Starts from outside the screen (left)
    to: { transform: "translateX(0)" }, // Moves to its original position
    config: { tension: 170, friction: 26 }, // Spring configuration
  });

  // Animation for content change based on navState
  const contentSpring = useSpring({
    opacity: navState === 0 ? 1 : 0,
    transform: navState === 0 ? "translateX(0)" : "translateX(-100%)", // Main moves in from the left
    config: { tension: 170, friction: 26 },
  });

  const infoSpring = useSpring({
    opacity: navState === 1 ? 1 : 0,
    transform: navState === 1 ? "translateX(0)" : "translateX(-100%)", // Info moves in from the left
    config: { tension: 170, friction: 26 },
  });

  const teamSpring = useSpring({
    opacity: navState === 3 ? 1 : 0,
    transform: navState === 3 ? "translateX(0)" : "translateX(-100%)", // Team moves in from the left
    config: { tension: 170, friction: 26 },
  });

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
      {/* Apply the spring animation to the home div */}
      <animated.div className="home" style={homeSpring}>
        <header>
          <nav>
            <li>
              <a
                className={
                  navState === 0 ? "list-element--active" : "list-element"
                }
                href="#"
                onClick={() => setNavState(0)}
              >
                Main
              </a>
            </li>
            <li>
              <a
                className={
                  navState === 1 ? "list-element--active" : "list-element"
                }
                href="#"
                onClick={() => setNavState(1)}
              >
                Info
              </a>
            </li>

            <li>
              <a className="list-element" href="/workspace">
                Play
              </a>
            </li>
          </nav>
        </header>

        <main className="main">
          {/* Conditionally render animated Main content */}
          {navState === 0 && (
            <animated.div className="main__textBlock" style={contentSpring}>
              <div>
                <p>S.T.E.P (Study, Test, Explain, Proceed)</p>
                <h2>S.T.E.P</h2>
                <a href="/workSpace">
                  <Button value={"Start"} type={"button"} width={"100%"} />
                </a>
              </div>
            </animated.div>
          )}

          {/* Conditionally render animated Info content */}
          {navState === 1 && (
            <animated.div className="info__textBlock" style={infoSpring}>
              <div className="team__insideBlock">
                <h2>Information Section</h2>
                <p>
                  S.T.E.P is an interactive<br />
                  AI-powered educational platform that simplifies<br />
                  the learning process for both teachers and students by<br />
                  making education more engaging, while AI accelerates the<br />
                  process of assigning tasks..
                </p>
              </div>
            </animated.div>
          )}

          {/* Conditionally render animated Team content */}
          {navState === 3 && (
            <animated.div className="team__textBlock" style={teamSpring}>
              <div className="team__insideBlock">
                <div>
                  <h2>Team Members</h2>
                  <p>Meet the amazing team working on this project!</p>
                </div>
              </div>
            </animated.div>
          )}
        </main>
      </animated.div>

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
