const BASE = '/api/admin/reviews';

const adminReviewsEndpoints = {
    list: `${BASE}/`,
    create: `${BASE}/`,
    one: (id) => `${BASE}/${id}`,
    update: (id) => `${BASE}/${id}`,
    remove: (id) => `${BASE}/${id}`,
    statsOverview: `/api/admin/reviews/stats/overview`,
};

export default adminReviewsEndpoints;


