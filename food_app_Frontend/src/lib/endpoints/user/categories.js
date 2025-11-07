const BASE = '/api/user/categories';

const userCategoriesEndpoints = {
    list: `${BASE}/`,
    create: `${BASE}/`,
    one: (id) => `${BASE}/${id}`,
    update: (id) => `${BASE}/${id}`,
    remove: (id) => `${BASE}/${id}`,
};

export default userCategoriesEndpoints;


