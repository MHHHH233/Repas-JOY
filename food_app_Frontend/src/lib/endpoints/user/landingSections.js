const BASE = '/api/user/landing-sections';

const userLandingEndpoints = {
    list: `${BASE}/`,
    active: `${BASE}/active`,
    create: `${BASE}/`,
    one: (id) => `${BASE}/${id}`,
    update: (id) => `${BASE}/${id}`,
    remove: (id) => `${BASE}/${id}`,
};

export default userLandingEndpoints;


