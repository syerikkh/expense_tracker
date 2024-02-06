import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 5000,
    headers: {
        'Authorization': 'Bearer',
    },
});

export default axiosInstance;

