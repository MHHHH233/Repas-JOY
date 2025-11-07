const BASE = '/api/admin/sous-categories';

const adminSousCategoriesEndpoints = {
    list: `${BASE}/`,
    create: `${BASE}/`,
    one: (id) => `${BASE}/${id}`,
    update: (id) => `${BASE}/${id}`,
    remove: (id) => `${BASE}/${id}`,
    statsOverview: `/api/admin/sous-categories/stats/overview`,
};

export default adminSousCategoriesEndpoints;


