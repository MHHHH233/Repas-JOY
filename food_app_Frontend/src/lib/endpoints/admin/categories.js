const BASE = '/api/admin/categories';

const adminCategoriesEndpoints = {
    list: `${BASE}/`,
    create: `${BASE}/`,
    one: (id) => `${BASE}/${id}`,
    update: (id) => `${BASE}/${id}`,
    remove: (id) => `${BASE}/${id}`,
    statsOverview: `/api/admin/categories/stats/overview`,
};

export default adminCategoriesEndpoints;


