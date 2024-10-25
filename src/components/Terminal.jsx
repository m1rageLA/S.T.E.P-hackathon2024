import { useDispatch } from "react-redux";
import { setBlurred } from "../redux/reduxSlice";

const Terminal = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    localStorage.removeItem("place"); // remove item from localStorage
    dispatch(setBlurred()); // dispatch the Redux action
  };

  const checkLS = () => {
    try {
      return JSON.parse(localStorage.getItem('activePackage')).material;
    } catch (error) {
      console.log("-.." ,error);
    }
  };

  return (
    <div className="terminal">
      <div className="terminal__window">
        <div className="terminal-line">
          <h3>Theory material:</h3>
          <a href="#">
            <img src="close.png" alt="close" onClick={handleClick} />
          </a>
        </div>
        <p>{checkLS()}</p>

      </div>
    </div>
  );
};

export default Terminal;
