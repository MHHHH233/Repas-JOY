const BASE = '/api/admin/commandes';

const adminCommandesEndpoints = {
    list: `${BASE}/`,
    create: `${BASE}/`,
    one: (id) => `${BASE}/${id}`,
    update: (id) => `${BASE}/${id}`,
    remove: (id) => `${BASE}/${id}`,
    statsOverview: `/api/admin/commandes/stats/overview`,
};

export default adminCommandesEndpoints;


