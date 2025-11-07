const BASE = '/api/user/users';

const userUsersEndpoints = {
    list: `${BASE}/`,
    create: `${BASE}/`,
    one: (id) => `${BASE}/${id}`,
    update: (id) => `${BASE}/${id}`,
    remove: (id) => `${BASE}/${id}`,
};

export default userUsersEndpoints;


