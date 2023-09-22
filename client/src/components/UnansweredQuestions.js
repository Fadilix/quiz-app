import React from "react";

function UnansweredQuestions({ quizData, answeredIndexes }) {
    // Filter unanswered questions
    const unansweredQuestions = quizData.filter(
        (_, index) => !answeredIndexes.includes(index)
    );

    return (
        <div style={{ marginBottom: "100px",  marginTop: "10px" }}>
            <h2>Unanswered Questions:</h2>
            <ul>
                {unansweredQuestions.map((question, index) => (
                    <li key={index}>
                        <p>{question.question_text}</p>
                        <ul>
                            <p style={{ color: "greenyellow" }}>answer : {question.answer}</p>
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UnansweredQuestions;
