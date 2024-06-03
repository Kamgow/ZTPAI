import React, {useEffect, useState} from 'react';
import siteLogo from '/logo.svg'
import style from './style/style.module.css';
import styleMovies from "./style/movies.module.css";
import {listMedia} from "./service/MediaService.js";
import AuthService from "./service/AuthService.js";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const DashboardPage = () => {

    useEffect(() => {
        document.title = "WATCH.IT | Dashboard";
    }, []);

    const [mediaList, setMediaList] = useState([])
    const [userInfo, setUserInfo] = useState(null);
    const [userName, setUserName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    let navigate = useNavigate();

    useEffect(() => {
        listMedia().then((response) => {
            setMediaList(response.data);
        }).catch(error => {
            console.error(error);
        })

    }, []);

    const session = !!localStorage.getItem('user');

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
            setUserName(userInfo.first_name);
        }
    }, [userInfo]);

    const handleLogout = () => {
        AuthService.logout();
        navigate('/dashboard');
    }

    function mediaDetails(id){
        navigate(`/media-details/${id}`)
    }

    const filteredMediaList = mediaList.filter(media =>
        media.title.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <div className={style.baseContainer}>
            <header className={style.Header}>
                <div className={style.Logo}>
                    <img src={siteLogo} alt="Logo"/>
                </div>
                <div className={styleMovies.searchBar}>
                    <input
                        className={styleMovies.Input}
                        type="text"
                        placeholder="Search a movie or a series"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className={styleMovies.Menu}>
                    {session ? (
                        <>
                            <a href="my-list" className={styleMovies.Button}>My List</a>
                            <a href="profile" className={styleMovies.Button}>{userName}</a>
                            <a href="" className={styleMovies.Button} onClick={handleLogout}>Sign Out</a>
                        </>
                    ) : (
                        <>
                            <a href="/register" className={styleMovies.Button}>Sign Up</a>
                            <a href="/login" className={styleMovies.Button}>Sign In</a>
                        </>
                    )}
                </div>
            </header>
            <section className={styleMovies.Media}>
                {filteredMediaList.map((media) => (
                    <div className={styleMovies.mediaContainer} key={media.id}>
                        {/*<a href={`media/${media.id}`}>*/}
                        <a className={styleMovies.A} href="">
                            <img className={styleMovies.mediaImage} src={media.imageUrl} alt="Image" onClick={() => mediaDetails(media.mediaId)}/>
                            <p className={styleMovies.P}>{media.title}</p>
                        </a>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default DashboardPage;