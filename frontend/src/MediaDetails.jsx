import siteLogo from '/logo.svg'
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getMedia} from "./service/MediaService.js";
import axios from "axios";
import AuthService from "./service/AuthService.js";
import style from './style/style.module.css';
import styleDetails from './style/details.module.css';
import userService from "./service/UserService.js";
import toInt from "validator/es/lib/toInt.js";


const MediaDetailsPage = () => {

    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [director, setDirector] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');

    const [userInfo, setUserInfo] = useState(null);
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState(null);
    const [added, setAdded] = useState(false);

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
        document.title = "WATCH.IT | " + title;
    }, [title]);

    const session = !!localStorage.getItem('user');


    useEffect(() => {
        const getUserInfo = async () => {
            if (session) {
                try {
                    const token = JSON.parse(localStorage.getItem('user')).token;
                    const config = {headers: {Authorization: `Bearer ${token}`}};

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
            setUserId(userInfo.id);
        }
    }, [userInfo]);


    useEffect(() => {
        const checkUserMedia = async () => {
            if(userId){
                try {
                    const token = JSON.parse(localStorage.getItem('user')).token;
                    const config = {headers: {Authorization: `Bearer ${token}`}};

                    const response = await userService.checkMyList(userId, toInt(id), config);
                    setAdded(response.data)
                } catch (error) {
                    console.error('Failed to fetch myList info:', error);
                }
            }
        }
        checkUserMedia();
    }, [userId]);

    const handleMyListClick = async (e) => {
        e.preventDefault();
        if(added){
            try {
                const token = JSON.parse(localStorage.getItem('user')).token;
                const config = {headers: {Authorization: `Bearer ${token}`}};

                const response = await userService.removeFromMyList(userId, toInt(id), config);
                //console.log(response.data)
                setAdded(false);
            } catch (error) {
                console.error('Failed to fetch myList info:', error);
            }
        }
        else {
            try {
                const token = JSON.parse(localStorage.getItem('user')).token;
                const config = {headers: {Authorization: `Bearer ${token}`}};

                const response = await userService.addToMyList(userId, toInt(id), config);
                setAdded(true);
            } catch (error) {
                console.error('Failed to fetch myList info:', error);
            }
        }
    }


    const handleLogout = () => {
        AuthService.logout();
        navigate('/dashboard');
    }

    return(
        <div className={style.baseContainer}>
            <header className={style.Header}>
                <div className={styleDetails.Logo}>
                    <img src={siteLogo} alt="Logo" />
                </div>
                <div className={styleDetails.Menu}>
                    <a href="/dashboard" className={styleDetails.Button}>Dashboard</a>
                    {session ? (
                        <>
                            <a href="/my-list" className={styleDetails.Button}>My List</a>
                            <a href="/profile" className={styleDetails.Button}>{userName}</a>
                            <a href="#" className={styleDetails.Button} onClick={handleLogout}>Sign Out</a>
                        </>
                    ) : (
                        <>
                            <a href="/register" className={styleDetails.Button}>Sign Up</a>
                            <a href="/login" className={styleDetails.Button}>Sign In</a>
                        </>
                    )}
                </div>
            </header>
            <section className={styleDetails.mediaDetails}>
                <div className={styleDetails.mediaTitle}>
                    <h1 className={styleDetails.H1}>{title}</h1>
                </div>
                <div className={styleDetails.mediaHeader}>
                    <div className={styleDetails.mediaHeaderText}>
                        <p>{releaseYear}</p>
                        <p>{genre}</p>
                        <p>{type}</p>
                    </div>
                    <div className={styleDetails.mediaHeaderButton}>
                        {session ? (
                            // <a className="button" id="myList" onClick={handleMyListClick}>
                            //     {added ? 'Remove from my list' : 'Add to my list'}
                            // </a>
                            <a className={styleDetails.Button} id="myList" onClick={handleMyListClick}>
                                {added ? 'Remove from my list' : 'Add to my list'}
                            </a>
                        ) : (
                            <a className="button1" id="myList" data-userid="nouser" data-mediaid="nouser"></a>
                        )}
                    </div>
                </div>
                <div className={styleDetails.mediaMain}>
                    <div className={styleDetails.mediaImageContainer}>
                        <img className={styleDetails.mediaImage} src={imageUrl} alt="Image" />
                    </div>
                    <div className={styleDetails.mediaDesc}>
                        <p>{description}</p>
                        <p>Director: {director}</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default MediaDetailsPage;