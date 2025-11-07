const BASE = '/api/admin/users';

const adminUsersEndpoints = {
    list: `${BASE}/`,
    create: `${BASE}/`,
    one: (id) => `${BASE}/${id}`,
    update: (id) => `${BASE}/${id}`,
    remove: (id) => `${BASE}/${id}`,
    statsOverview: `/api/admin/users/stats/overview`,
};

export default adminUsersEndpoints;


