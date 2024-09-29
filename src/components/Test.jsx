const Test = () => {
  const DATA = [
    {
      title: "Question 1",
      answers: [
        { text: "Answer A" },
        { text: "Answer B" },
        { text: "Answer C" },
        { text: "Answer D" },
      ],
      answerId: 1,
    },
    {
      title: "Question 2",
      answers: [
        { text: "Answer A" },
        { text: "Answer B" },
        { text: "Answer C" },
        { text: "Answer D" },
      ],
      answerId: 3,
    },
  ];

  return (
    <div className="terminal">
      <div className="test__window">
        <div className="test-line">
          <h3>Test:</h3>
          <a href="">
            <img
              src="close.png"
              alt="close"
              onClick={localStorage.removeItem("place")}
            />
          </a>
        </div>

        <div className="sendTask__overflow">
          {DATA.map((test, index) => (
            <div className="sendTask__testbox" key={index}>
              <div className="sendTask__generateAi">
                <h4>{test.title}</h4>
              </div>
              <div>
                {test.answers.map((item, idx) => (
                  <div key={idx} className="sendTask__answersblock">
                    <div className="sendTask__answer">
                      <p>{item.text}</p>
                      <input type="radio" name="" id="" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Test;
