const Theory = () => {
    return (
      <div className="terminal">
        <div className="terminal__window">
          <div className="terminal-line">
            <h3>Explain:</h3>
            <a href="">
              <img
                src="close.png"
                alt="close"
                onClick={localStorage.removeItem("place")}
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
  