const BASE = '/api/admin/contacts';

const adminContactsEndpoints = {
    list: `${BASE}/`,
    create: `${BASE}/`,
    one: (id) => `${BASE}/${id}`,
    update: (id) => `${BASE}/${id}`,
    remove: (id) => `${BASE}/${id}`,
    updateStatus: (id) => `${BASE}/${id}/status`,
    statsOverview: `${BASE}/stats/overview`,
};

export default adminContactsEndpoints;






