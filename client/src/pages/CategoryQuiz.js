import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";


function CategoryQuiz() {
    const [quizData, setQuizData] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [missedQuestions, setMissedQuestions] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showQuiz, setShowQuiz] = useState(false);
    const [numberOfQuestions, setNumberOfQuestions] = useState(5);
    const [questionAnswered, setQuestionAnswered] = useState(false);
    const [answeredIndexes, setAnsweredIndexes] = useState([]); // Track answered question indexes
    const [time, setTime] = useState(30);

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    }

    const { name } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8081/quiz/cat/${name}/?count=${numberOfQuestions}`).then((response) => {
            setQuizData(shuffleArray(response.data));
        });
    }, [numberOfQuestions, name]);

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

            // Mark the current question as answered
            setAnsweredIndexes([...answeredIndexes, currentQuestion]);

            setQuestionAnswered(true);
        }
    };

    if (currentQuestion >= quizData.length || time === 0) {
        const finalScore = Math.floor((score / quizData.length) * 100);
        return (
            <div>
                <NavBar />
                <div className="result">
                    <h1>Quiz Completed!</h1>
                    <div className="score-play">
                        <p className="score">
                            Your Score: <strong style={{ fontSize: "60px" }}>{finalScore}%</strong>
                        </p>
                        <button onClick={() => { window.location.reload() }} className="play-again">Play again</button>
                    </div>

                    {missedQuestions.length > 0 ? (
                        <div className="missed">
                            <h2>Missed Questions:</h2>
                            <ul>
                                {missedQuestions.map((question, index) => (
                                    <li key={index}>
                                        {question.question_text} <br /><span style={{ color: "red" }}>Your Answer: {selectedOptions[index]}</span>
                                        <br />
                                        <span style={{ color: "greenyellow" }}>Correct Answer: {correctAnswers[index]}</span>
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
                                        : <h1>I don't know what you say</h1>}
                </div>
            </div>
        );
    }

    const currentQuestionData = quizData[currentQuestion];
    const options = (currentQuestionData.all_options.split(","));

    const handleStartTest = () => {
        setShowQuiz(!showQuiz);
    }

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
    if (showQuiz) {
        setTimeout(() => {
            setTime(time - 1)
        }, 1000)
    }

    return (
        <div>
            <NavBar />

            {showQuiz ? (

                <div>
                    <div>
                        <div className="quiz-container">
                        <h1 style={{color: `${time <= 10 ? "red": "white"}`}}>{time}</h1>

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

                                <button className="next" onClick={handleNextQuestion}>Next</button>
                            </div>
                            <div className="table">
                                {questionIndexes.map((index) => (
                                    <button
                                        key={index}
                                        className={answeredIndexes.includes(index) ? "answered" : "unanswered"}
                                        onClick={() => { handleQuestionIndexClick(index) }}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            ) : (
                <div>
                    <div className="num-container">
                        <div className="quiz-container">
                            <div className="number-of-questions">
                                <label htmlFor="numberOfQuestions">Number of Questions:</label>
                                <input
                                    type="number"
                                    id="numberOfQuestions"
                                    value={numberOfQuestions}
                                    min="1"
                                    onChange={(e) => { setNumberOfQuestions(e.target.value) }}
                                />
                                <div className="time">
                                    <label htmlFor="time">Time</label>
                                    <input type="number" name="time" id="time" min={30} value={time} onChange={(e) => setTime(e.target.value)} />
                                </div>
                                <button onClick={handleStartTest}>Start Quiz</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CategoryQuiz;
