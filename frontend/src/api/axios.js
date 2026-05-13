import axios from 'axios';

const api = axios.create({ //Creates reusable axios instance
    baseURL: "http://localhost:3000/api",
    withCredentials: true, 
});

export default api;