import React, {useEffect, useState} from 'react';
import siteLogo from '/logo.svg'
import styleForm from './style/form.module.css';
import AuthService from "./service/AuthService.js";
import {useNavigate} from "react-router-dom"; // Import your CSS file

const RegisterPage = () => {

    useEffect(() => {
        document.title = "WATCH.IT | Register";
    }, []);


    let navigate = useNavigate();

    const [username, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [message, setMessage] = useState('');

    const registerUser = async (e) =>{
        e.preventDefault();

        setMessage("");

        if(password !== confirmPassword){
            setMessage("Passwords must match")
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(emailRegex.test(username)){
            try {
                const response = await AuthService.register(username, password, firstName, lastName);

                if (response.status >= 200 && response.status < 300) {
                    if(response.data.error){
                        setMessage(response.data.error);
                    }
                    else {
                        setMessage('Registration successful');
                        //navigate("/login");
                    }
                } else {
                    console.log(typeof response.data === 'object' ? response.data.error : response.data);
                }
            } catch (error) {
                console.log(error.message);
            }
        } else {
            setMessage("Invalid email format");
        }

    };

    const session = !!localStorage.getItem('user');
    useEffect(() => {
        if(session){
            navigate('/dashboard')
        }
    }, []);


    return (
        <div className={styleForm.Container}>

            <div className={styleForm.Logo}>
                <img className={styleForm.Img} src={siteLogo} alt="Logo"/>
            </div>
            <div className={styleForm.loginContainer}>
                <form className={styleForm.formC} onSubmit={registerUser}>
                    <div className="messages">
                        {message}
                    </div>
                    <input
                        className={styleForm.Input}
                        name="email"
                        type="text"
                        placeholder="Email"
                        value={username}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className={styleForm.Input}
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        className={styleForm.Input}
                        name="confirm-password"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <input
                        className={styleForm.Input}
                        name="firstName"
                        type="text"
                        placeholder="Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        className={styleForm.Input}
                        name="lastName"
                        type="text"
                        placeholder="Surname"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <button className={styleForm.Button} type="submit">Register</button>
                    <p className={styleForm.P}>
                        Already have an account? <a href="/login">Sign In</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;