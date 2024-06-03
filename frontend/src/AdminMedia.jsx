import React, {useEffect, useState} from 'react';
import siteLogo from '/logo.svg'
import style from './style/style.module.css';
import styleDetails from './style/details.module.css';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import AuthService from "./service/AuthService.js";
import {getMedia} from "./service/MediaService.js";
import adminService from "./service/AdminService.js";




const AdminMediaPage = () => {

    useEffect(() => {
        document.title = "WATCH.IT | Admin Media";
    }, []);

    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [director, setDirector] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');


    const [userInfo, setUserInfo] = useState(null);
    const [userRole, setUserRole] = useState('');
    let navigate = useNavigate();


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
        if(id){
            getMedia(id).then((response) => {
                setTitle(response.data.title);
                setGenre(response.data.genre)
                setReleaseYear(response.data.releaseYear)
                setDirector(response.data.director)
                setImageUrl(response.data.imageUrl)
                setDescription(response.data.description)
                setType(response.data.type)
            }).catch(error => {
                console.error(error);
            })
        }
    }, []);


    useEffect(() => {
        if (userInfo) {
            setUserRole(userInfo.role)
        }
    }, [userInfo]);

    const handleLogout = () => {
        AuthService.logout();
        navigate('/dashboard');
    }




    const addOrEditMedia = async (e) => {
        e.preventDefault();

        if(id){
            try {
                const token = JSON.parse(localStorage.getItem('user')).token;
                const config = {headers: {Authorization: `Bearer ${token}`}};

                const response = await adminService.editMedia(
                    id, title, genre, releaseYear, director, imageUrl, description, type, config);
                navigate('/admin-panel');
            } catch (error) {
                console.error('Failed to edit media:', error);
            }
        }
        else {
            try {
                const token = JSON.parse(localStorage.getItem('user')).token;
                const config = {headers: {Authorization: `Bearer ${token}`}};

                const response = await adminService.addMedia(
                    title, genre, releaseYear, director, imageUrl, description, type, config);
                navigate('/admin-panel');
            } catch (error) {
                console.error('Failed to add media:', error);
            }
        }

    };

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
            <form onSubmit={addOrEditMedia}
                  style={{marginTop: '1.5rem', marginLeft: 'auto', marginRight: 'auto', width: '90%'}}>
                <div style={{marginBottom: '1rem'}}>
                    <div style={{marginLeft: '20px'}}>
                        <label htmlFor="title" style={{fontWeight: 'bold'}}>Title</label>
                        <input
                            type="text"
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ccc',
                                borderRadius: '0.25rem'
                            }}
                            id="title"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div style={{marginBottom: '1rem'}}>
                    <div style={{marginLeft: '20px'}}>
                        <label htmlFor="genre" style={{fontWeight: 'bold'}}>Genre</label>
                        <input
                            type="text"
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ccc',
                                borderRadius: '0.25rem'
                            }}
                            id="genre"
                            name="genre"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div style={{marginBottom: '1rem'}}>
                    <div style={{marginLeft: '20px'}}>
                        <label htmlFor="releaseYear" style={{fontWeight: 'bold'}}>Release Year</label>
                        <input
                            type="text"
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ccc',
                                borderRadius: '0.25rem'
                            }}
                            id="releaseYear"
                            name="releaseYear"
                            value={releaseYear}
                            onChange={(e) => setReleaseYear(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div style={{marginBottom: '1rem'}}>
                    <div style={{marginLeft: '20px'}}>
                        <label htmlFor="director" style={{fontWeight: 'bold'}}>Director</label>
                        <input
                            type="text"
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ccc',
                                borderRadius: '0.25rem'
                            }}
                            id="director"
                            name="director"
                            value={director}
                            onChange={(e) => setDirector(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div style={{marginBottom: '1rem'}}>
                    <div style={{marginLeft: '20px'}}>
                        <label htmlFor="imageUrl" style={{fontWeight: 'bold'}}>Image URL</label>
                        <input
                            type="text"
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ccc',
                                borderRadius: '0.25rem'
                            }}
                            id="imageUrl"
                            name="imageUrl"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div style={{marginBottom: '1rem'}}>
                    <div style={{marginLeft: '20px'}}>
                        <label htmlFor="description" style={{fontWeight: 'bold'}}>Description</label>
                        <textarea
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ccc',
                                borderRadius: '0.25rem'
                            }}
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div style={{marginBottom: '1rem'}}>
                    <div style={{marginLeft: '20px'}}>
                        <label htmlFor="type" style={{fontWeight: 'bold'}}>Type</label>
                        <input
                            type="text"
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ccc',
                                borderRadius: '0.25rem'
                            }}
                            id="type"
                            name="type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div style={{marginBottom: '1rem'}}>
                    <div style={{marginLeft: '20px'}}>
                        <button type="submit" style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '0.25rem'
                        }}>Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AdminMediaPage;
