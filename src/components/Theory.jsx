import { useDispatch } from "react-redux";
import { setBlurred } from "../redux/reduxSlice";

const Theory = () => {
  
  const dispatch = useDispatch();

  const handleClick = () => {
    localStorage.removeItem("place"); // remove item from localStorage
    dispatch(setBlurred()); // dispatch the Redux action
  };
    return (
      <div className="terminal">
        <div className="terminal__window">
          <div className="terminal-line">
            <h3>Explain:</h3>
            <a href="#">
              <img
                src="close.png"
                alt="close"
                onClick={handleClick}
              />
            </a>
          </div>
  
          <p>{localStorage.getItem("activePackage").material}
          </p>
        </div>
      </div>
    );
  };
  
  export default Theory;
  