import React, { useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import { toast } from "react-hot-toast"

const Add = () => {
    const [question, setQuestion] = useState('');
    const [category, setCategory] = useState('');
    const [answer, setAnswer] = useState("");
    const [options, setOptions] = useState(['', '']);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        if (name === 'options') {
            const updatedOptions = [...options];
            updatedOptions[index] = value;
            setOptions(updatedOptions);
        } else if (name === 'question') {
            setQuestion(value);
        } else if (name === 'category') {
            setCategory(value);
        } else if (name === "answer") {
            setAnswer(value)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the data to send to the server
        const data = {
            question,
            category,
            options: options.filter((option) => option !== ''),
            answer
        };

        console.log(data);

        try {

            const response = await axios.post('http://localhost:8081/quiz/add', data);

            if (response.status === 200) {
                toast.success('Data inserted successfully', {
                    style: {
                        border: '1px solid #713200',
                        padding: '16px',
                        color: '#713200',
                    },
                    iconTheme: {
                        primary: '#713200',
                        secondary: '#FFFAEE',
                    },
                });
                console.log('Question added successfully');
                // reset the form
                setQuestion("");
                setCategory("");
                setOptions(["", ""]);
                setAnswer("")
            } else {
                console.error('Failed to add question');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='all-of-it'>
            <NavBar />
            <div className="form">
                <h1>Custom questions</h1>
                <form className='real-form' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="question">Question:</label>

                        <textarea
                            className='text-area'
                            name="question"
                            id="question"
                            rows="4"
                            placeholder='Enter your question...'
                            value={question} onChange={(e) => handleChange(e)}
                        >

                        </textarea>
                    </div>

                    <div>
                        <label htmlFor="answer">Answer:</label>
                        <input
                            type="text"
                            id="answer"
                            placeholder="Enter your question..."
                            name="answer"
                            value={answer}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="category">Category:</label>
                        <input
                            type="text"
                            id="category"
                            placeholder="Category..."
                            name="category"
                            value={category}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                    </div>

                    <div className='all-options'>
                        {options.map((option, index) => (
                            <div key={index}>
                                <label htmlFor={`option-${index}`}>Option {index + 1}:</label>
                                <input
                                    type="text"
                                    name="options"
                                    id={`option-${index}`}
                                    value={option}
                                    onChange={(e) => handleChange(e, index)}
                                    required
                                    placeholder={`Options ${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="add-question-button">
                        <button type="button" onClick={() => setOptions([...options, ''])}>
                            Add Option +
                        </button>
                        <button type="submit" className='add'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Add;