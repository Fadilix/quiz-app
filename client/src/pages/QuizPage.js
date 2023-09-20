import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";

function QuizPage() {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [missedQuestions, setMissedQuestions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false); // Track if the quiz has started
  const [numberOfQuestions, setNumberOfQuestions] = useState(5); // Default number of questions
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const [answeredIndexes, setAnsweredIndexes] = useState([]); // Track answered question indexes


  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (quizStarted) {
      // Fetching data from API endpoint based on the selected number of questions
      axios.get(`http://localhost:8081/?count=${numberOfQuestions}`).then((response) => {
        const shuffledQuizData = shuffleArray(response.data)
        setQuizData(shuffledQuizData);
      });
    }
  }, [numberOfQuestions, quizStarted]); // Fetch data when numberOfQuestions changes or when the quiz starts

  const handleNumberOfQuestionsChange = (e) => {
    setNumberOfQuestions(e.target.value);
  };

  const fetchQuestions = () => {
    // Fetch questions when the "Start Quiz" button is clicked
    setQuizStarted(true);
  };

  const handleAnswerClick = (selectedOption) => {
    const currentQuestionData = quizData[currentQuestion];
    if (!questionAnswered) {
      if (selectedOption === currentQuestionData.answer) {
        setScore(score + 1);
      } else {
        setMissedQuestions([...missedQuestions, currentQuestionData]);
        setCorrectAnswers([...correctAnswers, currentQuestionData.answer]);
      }
      setSelectedOptions([...selectedOptions, selectedOption]);
      setAnsweredIndexes([...answeredIndexes, currentQuestion]);

      setQuestionAnswered(true);

    }
  };

  if (!quizStarted) {
    //choose the number of questions
    return (
      <div >
        <NavBar />
        <div className="num-container">
          <div className="">
            <div className="number-of-questions">
              <label htmlFor="numberOfQuestions">Number of Questions:</label>
              <input
                type="number"
                id="numberOfQuestions"
                value={numberOfQuestions}
                onChange={handleNumberOfQuestionsChange}
                min="1" // Ensure a minimum value
              />
              <button onClick={fetchQuestions}>Start Quiz</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentQuestion >= quizData.length) {
    const finalScore = Math.floor((score / quizData.length) * 100)
    return (
      <div>
        <NavBar />
        <div className="result">
          <h1>Quiz completed!</h1>
          <div className="score-play">

            <p className="score" style={{ textAlign: "center" }}>
              Your score: <br /><strong style={{ fontSize: "60px" }}>{finalScore}%</strong>
            </p>

            <button onClick={() => { window.location.reload() }} className="play-again">Play again</button>
          </div>
          {missedQuestions.length > 0 ? (
            <div className="missed">
              <h2>Missed questions:</h2>
              <ul>
                {missedQuestions.map((question, index) => (
                  <li key={index}>
                    {question.question_text} <br /><span style={{ color: "red" }}>Your answer: {selectedOptions[index]}</span>
                    <br />

                    <span style={{ color: "greenyellow" }}>Correct answer: {correctAnswers[index]}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : finalScore === 100 ?
            <h1>Perfect</h1>
            : finalScore >= 80 ?
              <h1>Very Good</h1>
              : finalScore >= 70 ?
                <h1>Good</h1>
                : finalScore >= 50 ?
                  <h1>Can do better than that</h1>
                  : finalScore >= 30 ? <h1>You gotta revise your lessons</h1>
                    : <h1>I don't know what you say</h1>
          }
        </div>
      </div>
    );
  }

  const currentQuestionData = quizData[currentQuestion];
  const options = (currentQuestionData.all_options.split(","));

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1)
    setQuestionAnswered(false);
  }

  const questionIndexes = [];
  for (let i = 0; i < quizData.length; i++) {
    questionIndexes.push(i);
  }

  const handleQuestionIndexClick = (index) => {
    setCurrentQuestion(index);
    setQuestionAnswered(false);

  }

  return (
    <div>
      <NavBar />

      <div className="quiz-container">
        <div className="quiz">
          <h2>Question {currentQuestion + 1} - {currentQuestion + 1}/{quizData.length}</h2>
          <p style={{ width: "400px" }}>{currentQuestionData.question_text}</p>
          <ul className="options">
            {options.map((option, index) => (
              <li key={index}>
                <button onClick={() => handleAnswerClick(option)} className="option">
                  {option.trim()}
                </button>
              </li>
            ))}
          </ul>

          <div>
            <button className="next" onClick={handleNextQuestion}>Next</button>
          </div>
        </div>
        <div className="table">
          {questionIndexes.map((index) => (
            <button className={`${answeredIndexes.includes(index) ? "answered" : "unanswered"}`} onClick={() => { handleQuestionIndexClick(index) }}>{questionIndexes[index] + 1}</button>
          ))}
        </div>
      </div>

    </div>
  );
}

export default QuizPage;