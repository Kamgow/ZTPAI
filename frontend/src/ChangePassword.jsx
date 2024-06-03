import React, {useEffect, useState} from 'react';
import siteLogo from '/logo.svg'
import styleForm from './style/form.module.css';
import {useNavigate} from "react-router-dom";
import UserService from "./service/UserService.js";

const ChangePasswordPage = () => {

    useEffect(() => {
        document.title = "WATCH.IT | Change Password";
    }, []);


    let navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [message, setMessage] = useState('');

    const changePassword = async (e) =>{
        e.preventDefault();

        setMessage("");

        if(newPassword === confirmNewPassword){

            try{
                const token = JSON.parse(localStorage.getItem('user')).token;
                const config = {headers: {Authorization: `Bearer ${token}`}};

                await UserService.changePassword(oldPassword,newPassword,config);

                setMessage("Password changed successfully")
                setOldPassword('');
                setNewPassword('');
                setConfirmNewPassword('');

            }catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    setMessage(error.response.data.message);
                } else {
                    setMessage("Error changing password");
                }
            }


        } else {
            setMessage("New passwords don't match");
        }
    };

    const session = !!localStorage.getItem('user');
    useEffect(() => {
        if(!session){
            navigate('/login')
        }
    }, []);

    return (
        <div className={styleForm.Container}>

            <div className={styleForm.Logo}>
                <img className={styleForm.Img} src={siteLogo} alt="Logo"/>
            </div>
            <div className={styleForm.loginContainer}>
                <form className={styleForm.formC} onSubmit={changePassword}>
                    <div className="messages">
                        {message}
                    </div>
                    <input
                        className={styleForm.Input}
                        name="oldPassword"
                        type="password"
                        placeholder="Old Password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <input
                        className={styleForm.Input}
                        name="newPassword"
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                        className={styleForm.Input}
                        name="confirmNewPassword"
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                    <button className={styleForm.Button} type="submit">Change Password</button>
                    <p className={styleForm.P}>
                        <a href="/profile">Go back to Profile</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default ChangePasswordPage;