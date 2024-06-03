import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";


const register = (username, password, firstName, lastName) => {
    return axios.post(API_URL + "register", {username, password, firstName, lastName});
};

const login = (username, password) => {
    return axios
        .post(API_URL + "authenticate", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = async () => {
    try {
        localStorage.removeItem("user");
        localStorage.clear();
        await axios.post(API_URL + "logout");
    } catch (error) {
        console.error("Error:", error);
    }
};


const AuthService = {register, login, logout};

export default AuthService;