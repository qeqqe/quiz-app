import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const htmlDecode = (input) => {
  const doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
};

export default function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();
  const { category, difficulty, type } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const URL = `https://opentdb.com/api.php?amount=10${
    category ? `&category=${category}` : ""
  }${difficulty ? `&difficulty=${difficulty}` : ""}${
    type ? `&type=${type}` : ""
  }`;

  const fetchApi = async () => {
    try {
      const response = await axios.get(URL);
      const results = response.data.results;

      if (results.length > 0) {
        const decodedQuestions = results.map((item) => ({
          question: htmlDecode(item.question),
          correct_answer: htmlDecode(item.correct_answer),
          incorrect_answers: item.incorrect_answers.map((answer) =>
            htmlDecode(answer)
          ),
        }));

        setQuestions(decodedQuestions);
      }
    } catch (error) {
      console.error("Error fetching the quiz data:", error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      const { question, correct_answer, incorrect_answers } = questions[count];
      setCurrentQuestion(question);

      const allOptions = [correct_answer, ...incorrect_answers];
      const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
      setOptions(shuffledOptions);

      setAnswered(false);
    }
  }, [count, questions]);

  const handleAnswer = (selectedAnswer) => {
    if (answered) return;

    const correctAnswer = questions[count].correct_answer;
    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
    }
    setAnswered(true);
  };

  const handleNextQuestion = () => {
    if (count < questions.length - 1) {
      setCount(count + 1);
    } else {
      alert(`Quiz completed!`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/ScoreBoard", {
      state: {
        TotalScore: score,
      },
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-200 via-indigo-500 to-indigo-800 justify-center items-center">
      <div
        className="w-[35vw] h-[70vh] bg-white bg-opacity-55 rounded-2xl p-4"
        id="quiz-container"
      >
        <div
          className="min-h-[15vh] mb-4 bg-white p-3 text-black shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all duration-300 cursor-pointer bg-opacity-60 rounded-3xl"
          id="question-section"
        >
          <p>
            Q.{count + 1} {currentQuestion || "Loading..."}
          </p>
        </div>
        <div
          className="min-h-[48vh] rounded-xl p-3 bg-white bg-opacity-60 shadow-xl hover:scale-[1.02] hover:shadow-xl transition-all duration-300 flex flex-col justify-start"
          id="answer-section"
        >
          <ul className="list-none">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleAnswer(option)}
                className={`mb-4 p-2 bg-indigo-100 rounded cursor-pointer hover:bg-indigo-200 transition-colors duration-200
                  ${
                    answered && option === questions[count].correct_answer
                      ? "bg-green-300"
                      : ""
                  }
                  ${
                    answered && option !== questions[count].correct_answer
                      ? "bg-red-200"
                      : ""
                  }`}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center mt-6">
          <div className="flex justify-center items-center gap-4 w-full mb-4">
            <p className="text-white bg-red-500 py-2 px-4 rounded">
              Score: {score}/{questions.length}
            </p>
            <button
              onClick={handleNextQuestion}
              className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition-colors duration-200"
              disabled={!answered}
            >
              Next Question
            </button>
            {count >= questions.length - 1 && (
              <button
                className="text-white bg-gradient-to-br from-indigo-800 via-indigo-500 to-indigo-400 px-6 py-3 rounded-3xl hover:scale-95 active:scale-90 transition-all duration-300 shadow-xl hover:shadow-inner"
                onClick={handleSubmit}
              >
                Check Score
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
