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


const App = () => {
  return (
    <div className='App'>
      < Toaster position='top-right' />
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={HomePage}></Route>
          <Route path="/quiz" Component={QuizPage}></Route>
          <Route path="/categories" Component={Categories}></Route>
          <Route path="/add" Component={Add}></Route>
          <Route path="/quiz/:name" Component={CategoryQuiz}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App