const BASE = '/api/user/commandes';

const userCommandesEndpoints = {
    list: `${BASE}/`,
    create: `${BASE}/`,
    one: (id) => `${BASE}/${id}`,
    update: (id) => `${BASE}/${id}`,
    remove: (id) => `${BASE}/${id}`,
    byUser: (userId) => `${BASE}/user/${userId}`,
};

export default userCommandesEndpoints;


