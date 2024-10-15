import axios from 'axios';
import authService from './authService';

const API_URL = 'http://localhost:8080/api/v1/auth';

const axiosInstance = axios.create({
    baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.accessToken) {
            config.headers['Authorization'] = 'Bearer ' + user.accessToken; // Добавляем токен
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const user = JSON.parse(localStorage.getItem('user'));

        if (error.response.status === 401 && !originalRequest._retry && user?.refreshToken) {
            originalRequest._retry = true;

            const newTokens = await authService.refreshToken(user.refreshToken);
            localStorage.setItem('user', JSON.stringify(newTokens));
            
            originalRequest.headers['Authorization'] = 'Bearer ' + newTokens.accessToken;
            return axiosInstance(originalRequest);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
