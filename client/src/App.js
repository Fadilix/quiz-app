import React from 'react'
import QuizPage from './pages/QuizPage'
import "./App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import NavBar from './components/NavBar';
import Categories from './pages/Categories';
import Add from './pages/Add';
import CategoryQuiz from './pages/CategoryQuiz';
import {Toaster} from "react-hot-toast";
import Training from './pages/Training';
import Exam from './pages/Exam';


const App = () => {
  return (
    <div className='App'>
      < Toaster position='top-right' />
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={HomePage}></Route>
          <Route path="/quiz" Component={QuizPage}></Route>
          <Route path="/categories" Component={Categories}></Route>
          <Route path="/admin/add-question" Component={Add}></Route>
          <Route path="/quiz/:name" Component={CategoryQuiz}></Route>
          <Route path='/quiz/training' Component={Training}></Route>
          <Route path='/quiz/exam' Component={Exam}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App