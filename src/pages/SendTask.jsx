import { useState } from "react";

const SendTask = () => {
  const [data, setData] = useState([]); // State to manage test data
  const [topic, setTopic] = useState(""); // State for topic input
  const [theory, setTheory] = useState(""); // State for theory input
  const [loading, setLoading] = useState(false); // State for loading indication
  const [errorMessage, setErrorMessage] = useState(""); // State for error handling
  const [studentId, setStudentId] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // The task object we will send to the backend
    const taskData = {
      topicName: topic,
      material: theory,
      test: {
        questions: data.map((dataVal) => {
          return {
            title: dataVal.title,
            answers: dataVal.answers.map((ans, index) => {
              return {
                text: ans.text,
                isCorrect: index === dataVal.answerId,
              };
            }),
          };
        }), // This contains the generated questions and answers
      },
      studentId: studentId,
    };
    console.log(taskData);
    try {
      const response = await fetch(
        "http://localhost:5062/api/Package/create-package",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit the task. Please try again.");
      }

      location.reload()
      // Reset the form or provide feedback to the user
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Simulate AI content generation
  const handleGenerateWithAI = async (type) => {
    setLoading(true);
    try {
      if (type === "theory") {
        const response = await fetch(
          `http://localhost:5062/api/AICommunication/generate-material`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ topicName:topic }),
          }
        );
  
        const aiData = await response.json();
        setTheory(aiData.material);
      } else if (type === "test") {
        const response = await fetch(
          `http://localhost:5062/api/AICommunication/generate-test`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ topicName:topic, material:theory, length:10 }),
          }
        );
  
        const aiData = await response.json();
        setData(aiData.questions);
      }
    } catch (error) {
      setErrorMessage("Failed to generate content with AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sendTask">
      <header className="header">
        <a href="/">
          <p>S.T.E.P.</p>
        </a>
      </header>
      <div className="sendTask__box">
        <form onSubmit={handleSubmit}>
          <div>
            <h2>Topic</h2>
            <input
              type="text"
              name="topicField"
              id="topicField"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Simple english words"
              required
            />
          </div>

          <div>
            <div className="sendTask__generateAi">
              <h2>Theory</h2>
              <input
                type="button"
                value="Generate with AI"
                id="withAi"
                onClick={() => handleGenerateWithAI("theory")}
                disabled={loading}
              />
            </div>
            <textarea
              id="theoryField"
              rows="10"
              cols="50"
              value={theory}
              onChange={(e) => setTheory(e.target.value)}
              placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              required
            ></textarea>
          </div>

          <div className="sendTask__testBlock">
            <div className="sendTask__generateAi">
              <h2>Test</h2>
              <input
                type="button"
                value="Generate with AI"
                id="withAi"
                onClick={() => handleGenerateWithAI("test")}
                disabled={loading}
              />
            </div>

            <input
              type="button"
              value="+"
              id="addAnswer"
              onClick={() => {
                const newTest = {
                  title: `Question ${data.length + 1}`,
                  answers: [
                    { text: "Answer A" },
                    { text: "Answer B" },
                    { text: "Answer C" },
                    { text: "Answer D" },
                  ],
                  answerId: 1, // Mark correct answer index
                };

                setData((prevData) => [...prevData, newTest]);
              }}
            />
            <input type="text" name="" id="textInput" placeholder="to #id: " value={studentId} onChange={(e)=>setStudentId(e.target.value)} />
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
                          id="inputAnswerField"
                          name="inputAnswerField"
                          value={item.text}
                          onChange={(e) => {
                            const updatedData = [...data];
                            updatedData[index].answers[idx].text =
                              e.target.value;
                            setData(updatedData);
                          }}
                          placeholder="Answer text"
                        />
                      </div>
                      <input
                        type="radio"
                        name={`correct-answer-${index}`}
                        checked={test.answerId === idx}
                        onChange={() => {
                          const updatedData = [...data];
                          updatedData[index].answerId = idx;
                          setData(updatedData);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="sendTask__submit">
            <input
              type="submit"
              value={loading ? "Sending..." : "Send"}
              id="submit"
              disabled={loading}
            />
          </div>

          {errorMessage && <p className="error">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default SendTask;
