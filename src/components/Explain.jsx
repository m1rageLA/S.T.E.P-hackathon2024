import { useDispatch } from "react-redux";
import Button from "./Button"
import { useState } from "react";
import { setBlurred } from "../redux/reduxSlice";
const Explain = () => {
  const [sentence, setSentence] = useState("")
  const [result, setResult] = useState("")

  const dispatch = useDispatch();

  const handleClick = () => {
    localStorage.removeItem("place"); // remove item from localStorage
    dispatch(setBlurred()); // dispatch the Redux action
  };


  const handleGetMark = async () => {

      const packageData = localStorage.getItem('packageData')
      if(!packageData)
        return
      const response = await fetch("http://localhost:5062/api/AICommunication/generate-teach-mark", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          "topicName": packageData.topicName,
          "material": packageData.material,
          "sentence": sentence })
    });

    if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
    }

    const data = await response.json();
    setResult(data.mark.toString())
    
  }
  return (
    <div className="terminal">
      <div className="terminal__window">
        <div className="terminal-line">
          <h3>Explain the topic:</h3>
          <p>{result??""}</p>
          <a href="#">
            <img
              src="close.png"
              alt="close"
              onClick={handleClick}
            />
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
        <Button type={"submit"} value={"Send"} onClick={()=>handleGetMark()}/>
      </div>
    </div>
  );
};

export default Explain;
