import React, {useEffect, useState} from 'react';
import siteLogo from '/logo.svg'
import styleForm from './style/form.module.css';
import AuthService from "./service/AuthService.js";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {

    useEffect(() => {
        document.title = "WATCH.IT | Login";
    }, []);


    let navigate = useNavigate();

    const [username, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('');

    const loginUser = async (e) =>{
        e.preventDefault();

        setMessage("");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(emailRegex.test(username)){

            AuthService.login(username, password).then(
                () => {
                    navigate("/dashboard");
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    //setMessage(resMessage);
                    setMessage("Login failed, check login data.");
                }
            );


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
                <form className={styleForm.formC} onSubmit={loginUser}>
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
                    <button className={styleForm.Button} type="submit">Login</button>
                    <p className={styleForm.P}>
                        You don't have an account? <a href="/register">Sign Up</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;