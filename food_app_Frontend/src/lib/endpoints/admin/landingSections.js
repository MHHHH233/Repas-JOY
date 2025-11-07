const BASE = '/api/admin/landing-sections';

const adminLandingEndpoints = {
    list: `${BASE}/`,
    create: `${BASE}/`,
    one: (id) => `${BASE}/${id}`,
    update: (id) => `${BASE}/${id}`,
    remove: (id) => `${BASE}/${id}`,
    statsOverview: `/api/admin/landing-sections/stats/overview`,
};

export default adminLandingEndpoints;


