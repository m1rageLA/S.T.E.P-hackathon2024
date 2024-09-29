import Button from "./Button"
const Explain = () => {
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
        <textarea
          id="theoryField"
          rows="10"
          cols="50"
          placeholder="Tell AI what you learned in one sentence."
        ></textarea>
        <Button type={"submit"} value={"Send"}/>
      </div>
    </div>
  );
};

export default Explain;
