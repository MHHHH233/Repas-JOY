import apiGuest from '../../apiguest';
import apiClient from '../../apiclient';
import authEndpoints from '../../endpoints/auth';

const ok = (r) => (r.status === 200 || r.status === 201) ? r.data : Promise.reject(r);

const authService = {
    register: (payload) => apiGuest.post(authEndpoints.register, payload).then(ok),
    login: async (payload) => {
        const res = await apiGuest.post(authEndpoints.login, payload);
        if (res.status === 200 && res.data?.token) {
            try { sessionStorage.setItem('token', res.data.token); } catch {}
        }
        return res.data;
    },
    logout: async () => {
        try { await apiClient.post(authEndpoints.logout); } finally { try { sessionStorage.removeItem('token'); } catch {} }
    },
    profile: () => apiClient.get(authEndpoints.profile).then(ok),
    updateProfile: (payload) => apiClient.put(authEndpoints.updateProfile, payload).then(ok),
    changePassword: (payload) => apiClient.post(authEndpoints.changePassword, payload).then(ok),
    refresh: () => apiClient.post(authEndpoints.refresh).then(ok),
};

export default authService;


