import { useDispatch } from "react-redux";
import { setBlurred } from "../redux/reduxSlice";
import Button from "../components/Button";
import { useState } from "react";

const Test = () => {
  const dispatch = useDispatch();
  const [score, setScore] = useState(null);

  const handleClick = () => {
    localStorage.removeItem("place");
    dispatch(setBlurred());
  };

  const educationalMaterial = JSON.parse(localStorage.getItem("activePackage"));

  // Локальное состояние для хранения выбранных ответов
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // Обработчик изменения выбора варианта
  const handleAnswerChange = (questionIndex, answerIndex) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: answerIndex }));
  };

  // Функция для подсчета правильных ответов
  const calculateScore = () => {
    let correctAnswers = 0;

    educationalMaterial.test.questions.forEach((question, questionIndex) => {
      const selectedAnswerIndex = selectedAnswers[questionIndex];
      if (
        selectedAnswerIndex !== undefined &&
        question.answers[selectedAnswerIndex].isCorrect
      ) {
        correctAnswers += 1;
      }
    });

    setScore(correctAnswers); // Обновляем состояние score
  };

  return (
    <div className="terminal-1 terminal">
      <div className="terminal__window">
        <div className="terminal-line terminal-line-1">
          <div className="terminal-line--imgBox">
            <div
              style={{
                display: "flex",
                width: "80%",
                justifyContent: "space-between",
              }}
            >
              <h3>Test:</h3>
              <h3>Correct answers: <span>{score ?? "???"}</span></h3>
            </div>

            <a href="#">
              <img src="close.png" alt="close" onClick={handleClick} />
            </a>
          </div>
          <div className="sendTask__overflow">
            <div className="terminal__box">
              {educationalMaterial?.test?.questions ? (
                educationalMaterial.test.questions.map(
                  (test, questionIndex) => (
                    <div className="sendTask__testbox" key={questionIndex}>
                      <div className="sendTask__generateAi">
                        <h4>{test.title}</h4>
                      </div>
                      <div>
                        {test.answers.map((item, answerIndex) => (
                          <div
                            key={answerIndex}
                            className="sendTask__answersblock"
                          >
                            <div className="sendTask__answer">
                              <p>{item.text}</p>
                              <input
                                type="radio"
                                name={`answer-${questionIndex}`}
                                checked={
                                  selectedAnswers[questionIndex] === answerIndex
                                }
                                onChange={() =>
                                  handleAnswerChange(questionIndex, answerIndex)
                                }
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )
              ) : (
                <p>No test data available.</p>
              )}
              <Button type="button" onClick={calculateScore} value="Send"></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
