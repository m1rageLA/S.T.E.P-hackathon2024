const SendTask = () => {
  const DATA = [
    {
      title: "Вопрос 1",
      answers: [
        { text: "Ответ A" },
        { text: "Ответ B" },
        { text: "Ответ C" },
        { text: "Ответ D" },
      ],
      answerId: 1,
    },
    {
      title: "Вопрос 2",
      answers: [
        { text: "Ответ A" },
        { text: "Ответ B" },
        { text: "Ответ C" },
        { text: "Ответ D" },
      ],
      answerId: 3,
    },
  ];

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
          {DATA.map((test, index) => (
            <div className="sendTask__testbox" key={index}>
              <div className="sendTask__generateAi">
                <h4>{test.title}</h4>
                <input type="button" value="+" id="addAnswer" />
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
                      <input type="radio" name="" id="" />
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
