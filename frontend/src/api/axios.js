import axios from 'axios';

const api = axios.create({ //Creates reusable axios instance
    baseURL: "https://vaultix-0s7k.onrender.com/api",
    withCredentials: true, 
});

export default api;