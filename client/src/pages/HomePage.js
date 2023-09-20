import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <div className='home-page'>
        <div className='text'>
          <h1>Welcome to THE Quiz App</h1>
          <p>
            Are you ready to challenge your knowledge and have fun at the same time? You're in the right place!
          </p>
          <p>
            <strong>How it works:</strong> Simply choose a quiz category or click on <strong>Start Quiz</strong> to get started. Answer the questions to the best of your ability and see how well you do.
          </p>
          <p>
            <strong>Ready to begin?</strong> Let's go !!!
          </p>
          <Link to="/quiz" className='start-link' style={{ cursor: "pointer" }}>
            <button className="start-quiz-button">Start Quiz</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
