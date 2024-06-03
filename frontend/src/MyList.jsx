import React, {useEffect, useState} from 'react';
import siteLogo from '/logo.svg'
import style from './style/style.module.css';
import styleMovies from "./style/movies.module.css";
import {listUserMedia} from "./service/MediaService.js";
import AuthService from "./service/AuthService.js";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const MylistPage = () => {

    useEffect(() => {
        document.title = "WATCH.IT | My List";
    }, []);

    const [mediaList, setMediaList] = useState([])
    const [userInfo, setUserInfo] = useState(null);
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState(null);
    let navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');


    const session = !!localStorage.getItem('user');
    useEffect(() => {
        if(!session){
            navigate('/login')
        }
    }, []);

    useEffect(() => {
        const getUserMedia = async () => {

            if(userId){
                const token = JSON.parse(localStorage.getItem('user')).token;
                const config = {headers: {Authorization: `Bearer ${token}`}};

                try {
                    const response = await listUserMedia(userId, config);
                    setMediaList(response.data);
                } catch (error) {
                    console.error('Failed to fetch media:', error);
                }
            }

        };

        getUserMedia()
    }, [userId]);


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

    //console.log(userInfo)

    useEffect(() => {
        if (userInfo) {
            setUserName(userInfo.first_name);
            setUserId(userInfo.id);
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
                            <a href="dashboard" className={styleMovies.Button}>Dashboard</a>
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

export default MylistPage;