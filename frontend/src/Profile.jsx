import React, {useEffect, useState} from 'react';
import siteLogo from '/logo.svg'
import style from './style/style.module.css';
import styleDetails from './style/details.module.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import AuthService from "./service/AuthService.js";



const ProfilePage = () => {

    useEffect(() => {
        document.title = "WATCH.IT | Profile";
    }, []);

    const [userInfo, setUserInfo] = useState(null);
    const [userFirstName, setUserFirstName] = useState('');
    const [userRole, setUserRole] = useState(null);
    const [userLastName, setUserLastName] = useState('');
    const [userBirthDate, setUserBirthDate] = useState('');
    let navigate = useNavigate();

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
            setUserFirstName(userInfo.first_name);
            setUserLastName(userInfo.last_name);
            setUserBirthDate(userInfo.birthdate)
            setUserRole(userInfo.role)
        }
    }, [userInfo]);

    const handleLogout = () => {
        AuthService.logout();
        navigate('/dashboard');
    }


    return (
        <div className={style.baseContainer}>
            <header className={style.Header}>
                <div className={styleDetails.Logo}>
                    <img src={siteLogo} alt="Logo" />
                </div>
                <div className={styleDetails.Menu}>
                    <a href="/dashboard" className={styleDetails.Button}>Dashboard</a>
                    <a href="/my-list" className={styleDetails.Button}>My List</a>
                    <a href="" className={styleDetails.Button} onClick={handleLogout}>Sign Out</a>
                </div>
            </header>
            <section className={styleDetails.Profile}>
                <div className={styleDetails.profileTitle}>
                    <h1 className={styleDetails.H1}>Account Details</h1>
                </div>

                <div className={styleDetails.Account}>
                    <div className={styleDetails.accountData}>
                        <div className={styleDetails.dataType}>
                            <p>Name:</p>
                            <p>Surname:</p>
                            <p>Birth date:</p>
                        </div>
                        <div className={styleDetails.dataValue}>
                            <p>{userFirstName}</p>
                            <p>{userLastName}</p>
                            <p>{userBirthDate}</p>
                        </div>
                    </div>
                    <div className={styleDetails.accountButtons}>
                        {userRole === 'ADMIN' ? (
                            <>
                                <a href="/profile/change-details" className={styleDetails.Button}>Change Details</a>
                                <a href="/profile/change-password" className={styleDetails.Button}>Change Password</a>
                                <a href="/admin-panel" className={styleDetails.Button}>Admin Panel</a>
                            </>
                        ) : (
                            <>
                                <a href="/profile/change-details" className={styleDetails.Button}>Change Details</a>
                                <a href="/profile/change-password" className={styleDetails.Button}>Change Password</a>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProfilePage;
