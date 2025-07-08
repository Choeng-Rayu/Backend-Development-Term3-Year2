import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000/api', // adjust if your backend uses a different port
});

const token = localStorage.getItem('token');
if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}


export default API;
