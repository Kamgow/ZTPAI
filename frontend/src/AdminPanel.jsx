import React, {useEffect, useState} from 'react';
import siteLogo from '/logo.svg'
import style from './style/style.module.css';
import styleDetails from './style/details.module.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import AuthService from "./service/AuthService.js";
import {listMedia} from "./service/MediaService.js";




const AdminPanelPage = () => {

    useEffect(() => {
        document.title = "WATCH.IT | Admin Panel";
    }, []);

    const [userInfo, setUserInfo] = useState(null);
    const [userRole, setUserRole] = useState('');
    let navigate = useNavigate();
    const [mediaList, setMediaList] = useState([])

    const session = !!localStorage.getItem('user');
    useEffect(() => {
        if(!session){
            navigate('/login')
        }
    }, []);

    useEffect(() => {
        if(userRole !== 'ADMIN' && userRole){
            navigate('/login')
        }
    }, [userRole]);


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
            setUserRole(userInfo.role)
        }
    }, [userInfo]);

    const handleLogout = () => {
        AuthService.logout();
        navigate('/dashboard');
    }

    useEffect(() => {
        listMedia().then((response) => {
            setMediaList(response.data);
        }).catch(error => {
            console.error(error);
        })

    }, []);

    function handleAdd(){
        navigate('/admin-media')
    }

    function handleEdit(id){
        navigate(`/admin-media/${id}`)
    }


    return (
        <div className={style.baseContainer}>
            <header className={style.Header}>
                <div className={styleDetails.Logo}>
                    <img src={siteLogo} alt="Logo"/>
                </div>
                <div className={styleDetails.Menu}>
                    <a href="/dashboard" className={styleDetails.Button}>Dashboard</a>
                    <a href="/profile" className={styleDetails.Button}>Profile</a>
                    <a href="" className={styleDetails.Button} onClick={handleLogout}>Sign Out</a>
                </div>
            </header>
            {/*<section className={styleDetails.Profile}>*/}
            <div style={{marginTop: '1.5rem'}} className="container">
                <div style={{display: 'flex', alignItems: 'center', marginBottom: '1rem'}}>
                    <h1 style={{fontWeight: 'bold'}}>Media List</h1>
                    <button
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '0.25rem',
                            marginLeft: '20px'
                        }}
                        onClick={() => handleAdd()}
                    >
                        Add Media
                    </button>
                </div>
                <div style={{maxHeight: '600px', overflowY: 'auto'}} className="table-responsive">
                    <table style={{width: '100%'}} className="table table-striped table-bordered">
                        <thead style={{backgroundColor: '#343a40', color: '#fff'}}>
                        <tr>
                            <th style={{border: '1px solid #dee2e6'}}>ID</th>
                            <th style={{border: '1px solid #dee2e6'}}>Title</th>
                            <th style={{border: '1px solid #dee2e6'}}>Genre</th>
                            <th style={{border: '1px solid #dee2e6'}}>Release Year</th>
                            <th style={{border: '1px solid #dee2e6'}}>Director</th>
                            <th style={{border: '1px solid #dee2e6'}}>Image URL</th>
                            <th style={{border: '1px solid #dee2e6'}}>Description</th>
                            <th style={{border: '1px solid #dee2e6'}}>Type</th>
                            <th style={{border: '1px solid #dee2e6'}}>Edit</th>
                        </tr>
                        </thead>
                        <tbody>
                        {mediaList.map(media => (
                            <tr key={media.mediaId}>
                                <td style={{border: '1px solid #dee2e6'}}>{media.mediaId}</td>
                                <td style={{border: '1px solid #dee2e6'}}>{media.title}</td>
                                <td style={{border: '1px solid #dee2e6'}}>{media.genre}</td>
                                <td style={{border: '1px solid #dee2e6'}}>{media.releaseYear}</td>
                                <td style={{border: '1px solid #dee2e6'}}>{media.director}</td>
                                <td style={{border: '1px solid #dee2e6'}}>{media.imageUrl}</td>
                                <td style={{border: '1px solid #dee2e6'}}>{media.description}</td>
                                <td style={{border: '1px solid #dee2e6'}}>{media.type}</td>
                                <td style={{border: '1px solid #dee2e6'}}>
                                    <button
                                        style={{
                                            padding: '0.25rem 0.5rem',
                                            backgroundColor: '#007bff',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '0.25rem'
                                        }}
                                        onClick={() => handleEdit(media.mediaId)}>
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/*</section>*/}
        </div>
    );
};

export default AdminPanelPage;
