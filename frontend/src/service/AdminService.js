import axios from "axios";
import UserService from "./UserService.js";

const API_URL = "http://localhost:8080/api/admin/media/";

const addMedia = (title, genre, releaseYear, director, imageUrl, description, type, config) => {
    return axios.post(API_URL + "add", {
        title,
        genre,
        releaseYear,
        director,
        imageUrl,
        description,
        type
    }, config);
}

const editMedia = (mediaId, title, genre, releaseYear, director, imageUrl, description, type, config) => {
    return axios.put(API_URL + "edit/" + mediaId, {
        title,
        genre,
        releaseYear,
        director,
        imageUrl,
        description,
        type
    }, config);
}


const AdminService = {addMedia, editMedia}

export default AdminService;