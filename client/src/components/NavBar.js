import React from 'react'
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div>
            <header className='header'>
                <Link to="/"><h1>SQuizzos</h1></Link>
                <div className='actions'>
                    <Link to="/categories"><button>Categories</button></Link>
                    <Link to="/admin/add-question"><button style={{display: "none"}}>Add custom questions</button></Link>
                    <Link to="/quiz/training"><button>Training</button></Link>
                    <Link to="/quiz/exam"><button>Exam</button></Link>
                </div>
            </header>
        </div>
    )
}

export default NavBar;