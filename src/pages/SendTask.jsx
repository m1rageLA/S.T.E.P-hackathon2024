import { useState } from "react";

const SendTask = () => {
  const [data, setData] = useState([]);

  return (
    <div className="sendTask">
      <header className="header">
        <a href="/">
          <p>S.T.E.P.</p>
        </a>
      </header>
      <div className="sendTask__box">
        <div>
          <h2>Topic</h2>
          <input
            type="text"
            name="topicField"
            id="topicField"
            placeholder="Simple english words"
          />
        </div>

        <div>
          <div className="sendTask__generateAi">
            <h2>Theory</h2>
            <input type="button" value="Generate with AI" id="withAi" />
          </div>
          <textarea
            id="theoryField"
            rows="10"
            cols="50"
            placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          ></textarea>
        </div>

        <div className="sendTask__testBlock">
          <div className="sendTask__generateAi">
            <h2>Test</h2>
            <input type="button" value="Generate with AI" id="withAi" />
          </div>

          <input
            type="button"
            value="+"
            id="addAnswer"
            onClick={() => {
              const newTest = {
                title: "Question " + data.length + 1,
                answers: [
                  { text: "Answer A" },
                  { text: "Answer B" },
                  { text: "Answer C" },
                  { text: "Answer D" },
                ],
                answerId: 1,
              };

              // Update state immutably
              setData((prevData) => [...prevData, newTest]);
            }}
          />
          <input
            type="text"
            name="inputAnswerField"
            id="inputAnswerField"
            placeholder="TO - id: "
          />
          {data.map((test, index) => (
            <div className="sendTask__testbox" key={index}>
              <div className="sendTask__generateAi">
                <h4>{test.title}</h4>
              </div>
              <div>
                {test.answers.map((item, idx) => (
                  <div key={idx} className="sendTask__answersblock">
                    <div className="sendTask__answer">
                      <input
                        type="text"
                        name="inputAnswerField"
                        id="inputAnswerField"
                        placeholder="Simple english words"
                      />
                      <input type="radio" name={`question-${index}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="sendTask__submit">
          <input type="submit" value="Send" id="submit" />
        </div>

        <br />
      </div>
    </div>
  );
};

export default SendTask;
