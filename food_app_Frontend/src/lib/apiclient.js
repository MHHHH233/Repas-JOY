import axios from 'axios';

// Safe sessionStorage access
const safeStorage = {
    getItem: (key) => {
        try { return sessionStorage.getItem(key); } catch { return null; }
    },
    removeItem: (key) => {
        try { sessionStorage.removeItem(key); } catch {}
    }
};

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${safeStorage.getItem('token') || ''}`
    },
});

apiClient.interceptors.request.use((config) => {
    const token = safeStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            safeStorage.removeItem('token');
            window.location.href = '/signin';
        }
        return Promise.reject(error);
    }
);

export default apiClient;


