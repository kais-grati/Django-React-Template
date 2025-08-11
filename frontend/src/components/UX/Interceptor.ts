import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

let currentToken: string | null = null;

export const setApiToken = (token: string | null) => {
    currentToken = token;
};

api.interceptors.request.use(
    (config) => {
        if (currentToken) {
            config.headers = config.headers || {};
            config.headers["Authorization"] = `Bearer ${currentToken}`;
        }
        return config;
    },
    (error) => {
    
        return Promise.reject(error);
    }
);

export default api;