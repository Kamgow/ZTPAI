import React, {useEffect, useState} from 'react';
import siteLogo from '/logo.svg'
import styleForm from './style/form.module.css';
import {useNavigate} from "react-router-dom";
import UserService from "./service/UserService.js";
import axios from "axios";

const ChangeDetailsPage = () => {

    useEffect(() => {
        document.title = "WATCH.IT | Change Details";
    }, []);


    const [userInfo, setUserInfo] = useState(null);

    let navigate = useNavigate();

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [birthDate, setBirthDate] = useState('');
    const [message, setMessage] = useState('');

    const changeDetails = async (e) =>{
        e.preventDefault();

        setMessage("");

        if(firstName){

            try{
                const token = JSON.parse(localStorage.getItem('user')).token;
                const config = {headers: {Authorization: `Bearer ${token}`}};

                console.log(firstName,lastName, birthDate)

                await UserService.changeDetails(firstName, lastName, birthDate,config);

                setMessage("Details changed successfully")
                setFirstName('');
                setLastName('');
                setBirthDate('');

            }catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    setMessage(error.response.data.message);
                } else {
                    setMessage("Error changing details");
                }
            }


        } else {
            setMessage("First name is mandatory");
        }
    };


    const session = !!localStorage.getItem('user');
    useEffect(() => {
        if(!session){
            navigate('/login')
        }
    }, []);

    useEffect(() => {
        const getUserInfo = async () => {
            if (session) {
                const token = JSON.parse(localStorage.getItem('user')).token;
                const config = {headers: {Authorization: `Bearer ${token}`}};

                try {
                    const response = await axios.get('http://localhost:8080/api/user', config);
                    setUserInfo(response.data);
                } catch (error) {
                    console.error('Failed to fetch user info:', error);
                }
            }
        };
        getUserInfo();
    }, [session]);

    useEffect(() => {
        if (userInfo) {
            setFirstName(userInfo.first_name);
            setLastName(userInfo.last_name);
            setBirthDate(userInfo.birthdate)
        }
    }, [userInfo]);

    return (
        <div className={styleForm.Container}>

            <div className={styleForm.Logo}>
                <img className={styleForm.Img} src={siteLogo} alt="Logo"/>
            </div>
            <div className={styleForm.loginContainer}>
                <form className={styleForm.formC} onSubmit={changeDetails}>
                    <div className="messages">
                        {message}
                    </div>
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
                    <input
                        className={styleForm.Input}
                        name="birthDate"
                        type="date"
                        placeholder="Date of birth"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />
                    <button className={styleForm.Button} type="submit">Change Details</button>
                    <p className={styleForm.P}>
                        <a href="/profile">Go back to Profile</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default ChangeDetailsPage;