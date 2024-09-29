import Button from "./Button"
const Task = () => {
  return (
    <div className="terminal">
      <div className="terminal__window">
        <div className="terminal-line">
          <h3>Explain the topic:</h3>
          <a href="">
            <img
              src="close.png"
              alt="close"
              onClick={localStorage.removeItem("place")}
            />
          </a>
        </div>

        <Button type={"submit"} value={"Send"}/>
      </div>
    </div>
  );
};

export default Task;
