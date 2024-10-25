import { useDispatch } from "react-redux";
import Button from "./Button";
import { useState } from "react";
import { setBlurred } from "../redux/reduxSlice";
const Explain = () => {
  const [sentence, setSentence] = useState("");
  const [result, setResult] = useState(null);

  const dispatch = useDispatch();

  const handleClick = () => {
    localStorage.removeItem("place"); // remove item from localStorage
    dispatch(setBlurred()); // dispatch the Redux action
  };

  const handleGetMark = async () => {
    const packageData = JSON.parse(localStorage.getItem("activePackage"));
    console.log(packageData)
    if (!packageData) return;
    const response = await fetch(
      "http://localhost:5062/api/AICommunication/generate-teach-mark",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "topicName": packageData.topicName,
          "sentence": sentence,
          "material": packageData.material,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Login failed. Please check your credentials.");
    }

    const data = await response.json();
    setResult(data.mark.toString());
  };
  return (
    <div className="terminal">
      <div className="terminal__window">
        <div className="terminal-line">
          <div
            style={{
              width: "80%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h3>Explain the topic:</h3>
            <h3>
              your score: <span>{result ?? "???"}</span>
            </h3>
          </div>
          <p>{result ?? ""}</p>
          <a href="#">
            <img src="close.png" alt="close" onClick={handleClick} />
          </a>
        </div>
        <textarea
          id="theoryField"
          rows="10"
          cols="50"
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          placeholder="Tell AI what you learned in one sentence."
        ></textarea>
        <Button
          type={"submit"}
          value={"Send"}
          onClick={() => handleGetMark()}
        />
      </div>
    </div>
  );
};

export default Explain;
