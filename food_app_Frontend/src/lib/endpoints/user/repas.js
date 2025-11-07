const BASE = '/api/user/repas';

const userRepasEndpoints = {
    list: `${BASE}/`,
    create: `${BASE}/`,
    one: (id) => `${BASE}/${id}`,
    update: (id) => `${BASE}/${id}`,
    remove: (id) => `${BASE}/${id}`,
    byCategory: (categoryId) => `${BASE}/category/${categoryId}`,
};

export default userRepasEndpoints;


