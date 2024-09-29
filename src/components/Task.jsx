const Task = () => {
  const DATA = [
    {
      title: "Task 1",
      answerId: 1,
    },
    {
      title: "Task 2",
      answerId: 3,
    },
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
            <a href="" className="sendTask__itemsTask">
              <div className="sendTask__answer">
                <p>{item.title}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task;
