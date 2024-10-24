import { useEffect, useState } from "react";

const Task = () => {

  const [packages, setPackages] = useState([])
  const [packageData, setPackagesData] = useState([])

  useEffect(()=>{
    fetchPackages()
  }, [])

  const fetchPackages = async ()=>{

    const userId = localStorage.getItem('userId')
    if(!userId)
      return

    const response = await fetch(`http://localhost:5062/api/Package/get-student-packages/${userId}`, {
      method: "GET",
  });

  if (!response.ok) {
      throw new Error("Login failed. Please check your credentials.");
  }

  const result = await response.json()
  setPackages(result.map((res)=>res.topicName))
  setPackagesData(result)

  console.log(packageData)
  }

  const DATA = [
    ...packages
  ];
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
        {DATA.map((item, idx) => (
          <div key={idx} className="sendTask__answersblock">
            <button className="sendTask__itemsTask" onClick={()=>{
              let packageString= JSON.stringify(packageData[idx])
              localStorage. setItem("activePackage", packageString) 
            }}>
              <div className="sendTask__answer">
                <p>{item}</p>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task;
