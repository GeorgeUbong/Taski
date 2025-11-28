import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import img from '../assets/react.svg';



export default function Login() {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    //handle name change
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFullName(event.target.value);
    };

    //check if inputs are filled then navigates to dashboard

    const handleNext = () => {
        if (!fullName || !email) {
            setError('fill in you email and name and choose a department to proceed');
            return;
        }
        // if correct form filled navigate to dashboard
        navigate('/Dashboard');
    }
    return (
        <div>
            <img src={img} alt='example image' />
            <input
                type='text'
                value={fullName}
                onChange={handleNameChange}
                placeholder='Type fullname'
                required
            />
            <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='innov@hub123'
                required
            />

            <select name="choose department" id="departments">
                <option value="software">Software department</option>
                <option value="electronics">Electronics department</option>
                <option value="product design">Product design department</option>
            </select>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button onClick={handleNext}>Login</button>
        </div>
    )
}

