import axios from "axios";

const API_URL = "http://localhost:8080/api/media";

export const listMedia = () => {
    return axios.get(API_URL);
}

export const getMedia = (mediaId) => {
    return axios.get(API_URL + '/' + mediaId);
}

export const listUserMedia = (userId, config) => {
    return axios.get(API_URL + '/user/' + userId, config);
}