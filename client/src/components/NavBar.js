import React from 'react'
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div>
            <header className='header'>
                <Link to="/"><h1>FadQuizzes</h1></Link>
                <div className='actions'>
                    <Link to="/categories"><button>Categories</button></Link>
                    <Link to="/add"><button>Add custom questions</button></Link>
                </div>
            </header>
        </div>
    )
}

export default NavBar;