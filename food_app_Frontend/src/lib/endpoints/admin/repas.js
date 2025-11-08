const BASE = '/api/admin/repas';

const adminRepasEndpoints = {
    list: `${BASE}/`,
    create: `${BASE}/`,
    one: (id) => `${BASE}/${id}`,
    update: (id) => `${BASE}/${id}`,
    remove: (id) => `${BASE}/${id}`,
    statsOverview: `/api/admin/repas/stats/overview`,
    toggleVisibility: (id) => `${BASE}/${id}/toggle-visibility`,
};

export default adminRepasEndpoints;


