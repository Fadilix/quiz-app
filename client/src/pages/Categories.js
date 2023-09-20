import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchAllCat = async () => {
            const response = await axios.get("http://localhost:8081/quiz/cat/")
            
            // Creatingg a Set to store unique category names
            const uniqueCategories = new Set();
            
            // Filter out duplicates and update the state
            response.data.forEach(category => {
                if (!uniqueCategories.has(category.category_text)) {
                    uniqueCategories.add(category.category_text);
                }
            });
            
            // Convert the Set back to an array and update the state
            setCategories(Array.from(uniqueCategories));
        }

        fetchAllCat();
    }, [])

    return (
        <div>
            <NavBar />
            <div className='categories'>
                <h1>All categories</h1>
                <ul className='cats'>
                    {categories.map((category, index) => (
                        <li key={index} className='category'>
                            <button>
                                <Link to={`/quiz/${category}`}> - {category}</Link>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Categories
