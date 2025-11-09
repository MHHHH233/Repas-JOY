import apiGuest from '../../apiguest';
import apiClient from '../../apiclient';
import authEndpoints from '../../endpoints/auth';

const ok = (r) => (r.status === 200 || r.status === 201) ? r.data : Promise.reject(r);

// Helper function to extract and store token from API response
const extractAndStoreToken = (responseData) => {
    // API returns: { success: true, data: { user, token, token_type } }
    const token = responseData?.data?.token || responseData?.token;
    if (token) {
        try {
            sessionStorage.setItem('token', token);
        } catch (error) {
            console.error('Failed to store token:', error);
        }
    }
    return responseData;
};

const authService = {
    register: async (payload) => {
        const res = await apiGuest.post(authEndpoints.register, payload);
        if (res.status === 200 || res.status === 201) {
            return extractAndStoreToken(res.data);
        }
        return Promise.reject(res);
    },
    login: async (payload) => {
        const res = await apiGuest.post(authEndpoints.login, payload);
        if (res.status === 200) {
            return extractAndStoreToken(res.data);
        }
        return Promise.reject(res);
    },
    logout: async () => {
        try { await apiClient.post(authEndpoints.logout); } finally { 
            try { 
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('user');
            } catch {} 
        }
    },
    profile: () => apiClient.get(authEndpoints.profile).then(ok),
    updateProfile: (payload) => apiClient.put(authEndpoints.updateProfile, payload).then(ok),
    changePassword: (payload) => apiClient.post(authEndpoints.changePassword, payload).then(ok),
    refresh: () => apiClient.post(authEndpoints.refresh).then(ok),
};

export default authService;


