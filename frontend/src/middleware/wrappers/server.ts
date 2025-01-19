import cookieService from "@/services/cookie.service";
import axios from "axios";

const server = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    // withCredentials: true,
    timeout: 5000,
});

server.interceptors.request.use(config => {
    const token = cookieService.getCookie("accessToken");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
}, error => {
    return Promise.reject(error);
});

export default server;

export const mainServer = axios.create({
    baseURL: import.meta.env.VITE_MAIN_BACKEND_URL,
    // withCredentials: true,
    timeout: 5000,
});

mainServer.interceptors.request.use(config => {
    const token = cookieService.getCookie("accessToken");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
}, error => {
    return Promise.reject(error);
});