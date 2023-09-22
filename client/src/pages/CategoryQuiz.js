import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";
import { format, addSeconds } from "date-fns"
import UnansweredQuestions from "../components/UnansweredQuestions";

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
    const [formattedTime, setFormattedTime] = useState(formatTime(time));
    const [selectedOption, setSelectedOption] = useState(null);
    const [initialTime, setTinitialTime] = useState(0);
    const [showResult, setShowResult] = useState(false);


    function formatTime(seconds) {
        const formattedDate = addSeconds(new Date(0), seconds);
        return format(formattedDate, "mm:ss");
    }

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    }

    const { name } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8081/quiz/cat/${name}/?count=${numberOfQuestions}`).then((response) => {
            setQuizData(shuffleArray(response.data));
            setTinitialTime(time);
        });
    }, [numberOfQuestions, name]);

    const handleAnswerClick = (selectedOption) => {
        const currentQuestionData = quizData[currentQuestion];
    
        // Store the previous score
        const previousScore = score;
    
        // Check if the question has already been answered
        if (!answeredIndexes.includes(currentQuestion)) {
            if (selectedOption === currentQuestionData.answer) {
                // Correct answer
                setScore(score + 1);
            } else {
                // Incorrect answer
                setMissedQuestions((prevMissedQuestions) => [
                    ...prevMissedQuestions.filter(
                        (question) => question !== currentQuestionData
                    ),
                    currentQuestionData,
                ]);
                setCorrectAnswers((prevCorrectAnswers) => [
                    ...prevCorrectAnswers.filter(
                        (answer) => answer !== currentQuestionData.answer
                    ),
                    currentQuestionData.answer,
                ]);
            }
    
            setSelectedOptions((prevSelectedOptions) => [
                ...prevSelectedOptions.slice(0, -1), // Remove the previous option
                selectedOption, // Add the current option
            ]);
    
            // Mark the current question as answered
            setAnsweredIndexes([...answeredIndexes, currentQuestion]);
        } else {
            // Handle changing the selected option
            if (selectedOption === currentQuestionData.answer) {
                // Correct answer
                setScore(score + 1);
            } else {
                // Incorrect answer
                setMissedQuestions((prevMissedQuestions) => [
                    ...prevMissedQuestions.filter(
                        (question) => question !== currentQuestionData
                    ),
                    currentQuestionData,
                ]);
                setCorrectAnswers((prevCorrectAnswers) => [
                    ...prevCorrectAnswers.filter(
                        (answer) => answer !== currentQuestionData.answer
                    ),
                    currentQuestionData.answer,
                ]);
            }
    
            setSelectedOptions((prevSelectedOptions) => [
                ...prevSelectedOptions.slice(0, -1), // Remove the previous option
                selectedOption, // Add the current option
            ]);
    
            // Revert to the previous score
            setScore(previousScore);
        }
    
        setSelectedOption(selectedOption);
        setQuestionAnswered(true);
    };
    


    if (currentQuestion >= quizData.length || time === 0 || showResult) {
        const finalScore = Math.floor((score / quizData.length) * 100);
        return (
            <div>
                <NavBar />
                <div className="result">
                    <h1>Quiz Completed!</h1>
                    <div className="score-play">
                        <p className="score" style={{ textAlign: "center" }}>
                            Your Score: <br /><strong style={{ fontSize: "60px" }}>{finalScore}%</strong>
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

                            <br />
                            <br />
                            <UnansweredQuestions
                                quizData={quizData}
                                answeredIndexes={answeredIndexes}
                                handleAnswerClick={handleAnswerClick}
                            />
                        </div>

                    ) : finalScore === 100 ? (
                        <h1>Perfect</h1>)
                        : finalScore >= 80 ? (
                            <h1>Very Good</h1>)
                            : finalScore >= 70 ? (
                                <h1>Good</h1>)
                                : finalScore >= 50 ? (
                                    <h1>Can do better than that</h1>)
                                    : finalScore >= 30 ? (<h1>You gotta revise your lessons</h1>)
                                        : (<h1>I don't know what you say</h1>)}
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
            setTime(time - 1);
            setFormattedTime(formatTime(time - 1));

        }, 1000)
    }

    const handlePreviousQuestion = () => {
        if (currentQuestion - 1 < 0) {
            return
        } else {
            setCurrentQuestion(currentQuestion - 1);
        }
    }

    const setTimerColor = () => {
        const percentage = Math.floor((time / initialTime) * 100)
        if (percentage <= 20) {
            return "red";
        } else if (percentage <= 50) {
            return "orange";
        } else if (percentage <= 75) {
            return "yellow";
        } else {
            return "white";
        }
    }

    const handleAnswersSubmition = () => {
        if(window.confirm("Are you sure you wanna submit now ?")){
            setShowResult(true);
        }
    }
    return (
        <div>
            <NavBar />

            {showQuiz ? (

                <div>
                    <div>
                        <div className="quiz-container">
                            <h1 style={{ color: `${setTimerColor()}` }} className="timer">{formattedTime}</h1>
                            <button onClick={handleAnswersSubmition} className="submit-ans">Submit answers</button>
                            <div className="quiz">
                                <h2>Question {currentQuestion + 1}</h2>
                                <p style={{ width: "400px" }}>{currentQuestionData.question_text}</p>
                                <ul className="options">
                                    {options.map((option, index) => (
                                        <li key={index}>
                                            <input
                                                id={`radio${index}`}
                                                type="radio"
                                                name="options" // Use the same name for all radio buttons within a question
                                                value={option}
                                                checked={selectedOption === option}
                                                onChange={() => handleAnswerClick(option)}
                                            />
                                            <div className="li-label">
                                                <label htmlFor={`radio${index}`} style={{backgroundColor: selectedOption === option ? "coral" : "wheat"}}>
                                                    {option.trim()}
                                                </label>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="next">
                                    <button onClick={handlePreviousQuestion}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                                        </svg>
                                    </button>
                                    <h1>{currentQuestion + 1}/{quizData.length}</h1>
                                    <button className="" onClick={handleNextQuestion}>
                                        {currentQuestion + 1 === quizData.length ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                                            </svg>
                                        ) :

                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                            </svg>
                                        }
                                    </button>

                                </div>
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
                        <h1>Pre-match settings</h1>
                        <hr style={{ width: "200px" }} />
                        <br />
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
                                <button onClick={handleStartTest} style={{ cursor: "pointer" }}>Start Quiz</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CategoryQuiz;