import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setBlurred } from "../redux/reduxSlice";

const Task = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    localStorage.removeItem("place"); // remove item from localStorage
    dispatch(setBlurred()); // dispatch the Redux action
  };
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetchPackages();
  });

  const fetchPackages = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const response = await fetch(
      `http://localhost:5062/api/Package/get-student-packages/${userId}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Login failed. Please check your credentials.");
    }

    const result = await response.json();
    setPackages(result.map((res) => res.topicName));
  };

  const DATA = [...packages];
  return (
    <div className="terminal">
      <div className="terminal__window">
        <div className="terminal-line">
          <h3>Explain the topic:</h3>
          <a href="#">
            <img
              src="close.png"
              alt="close"
              onClick={handleClick}
            />
          </a>
        </div>
        {DATA.map((item, idx) => (
          <div key={idx} className="sendTask__answersblock">
            <a href="" className="sendTask__itemsTask">
              <div className="sendTask__answer">
                <p>{item}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task;
