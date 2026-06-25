import axios from "axios";

const authAPi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    withCredentials: true,
    headers: {
        "Content-Type" : 'multipart/form-data',
        Accept: 'application/json',
    }
});

authAPi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

authAPi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/authentication/user-login';
        }
        return Promise.reject(error);
    }
);

export default authAPi;