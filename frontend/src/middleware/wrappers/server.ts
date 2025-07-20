import cookieService from "@/services/cookie.service";
import axios from "axios";

const server = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    // withCredentials: true,
    timeout: 5000,
});

server.interceptors.request.use(config => {
    const token = cookieService.getCookie("access_token");
    console.log('Request URL:', config.url);
    console.log('Request method:', config.method);
    console.log('Token:', token ? 'Present' : 'Missing');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
}, error => {
    console.error('Request error:', error);
    return Promise.reject(error);
});

server.interceptors.response.use(
    response => {
        console.log('Response received:', response.config.url, response.status);
        return response;
    },
    error => {
        console.error('Response error:', error.config?.url, error.response?.status, error.message);
        return Promise.reject(error);
    }
);

export default server;

export const mainServer = axios.create({
    baseURL: import.meta.env.VITE_MAIN_BACKEND_URL,
    // withCredentials: true,
    timeout: 5000,
});

mainServer.interceptors.request.use(config => {
    const token = cookieService.getCookie("access_token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
}, error => {
    return Promise.reject(error);
});