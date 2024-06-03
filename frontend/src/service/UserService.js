import axios from "axios";

const API_URL = "http://localhost:8080/api/user/";

const checkMyList = (userId, mediaId, config) =>{
    return axios.get(API_URL + userId + '/myList/' + mediaId, config)
}

const addToMyList = (userId, mediaId, config) =>{
    return axios.post(API_URL + userId + '/myList/' + mediaId, null, config)
}

const removeFromMyList = (userId, mediaId, config) =>{
    return axios.delete(API_URL + userId + '/myList/' + mediaId, config)
}

const changePassword = (oldPassword, newPassword, config) =>{
    return axios.put(API_URL + 'changePassword', {oldPassword, newPassword}, config)
}

const changeDetails = (firstName, lastName, birthDate, config) =>{
    return axios.put(API_URL + 'updateUserInfo', {firstName, lastName, birthDate}, config)
}

const UserService = {checkMyList, addToMyList, removeFromMyList, changePassword, changeDetails};

export default UserService;