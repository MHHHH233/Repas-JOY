import axios from 'axios';

const apiGuest = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: false,
});

apiGuest.interceptors.request.use((config) => config);

export default apiGuest;


