const BASE = '/api/admin/social-media';

const adminSocialMediaEndpoints = {
    list: `${BASE}/`,
    create: `${BASE}/`,
    one: (id) => `${BASE}/${id}`,
    update: (id) => `${BASE}/${id}`,
    remove: (id) => `${BASE}/${id}`,
    statsOverview: `/api/admin/social-media/stats/overview`,
};

export default adminSocialMediaEndpoints;

