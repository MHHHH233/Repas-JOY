const BASE = '/api';

const authEndpoints = {
    register: `${BASE}/register`,
    login: `${BASE}/login`,
    logout: `${BASE}/logout`,
    profile: `${BASE}/profile`,
    updateProfile: `${BASE}/profile`, // PUT
    changePassword: `${BASE}/change-password`,
    refresh: `${BASE}/refresh`,
};

export default authEndpoints;


