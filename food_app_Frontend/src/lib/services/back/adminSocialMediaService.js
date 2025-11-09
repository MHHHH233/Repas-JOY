import apiClient from '../../apiclient';
import endpoints from '../../endpoints/admin/socialMedia';

const ok = (r) => (r.status === 200 || r.status === 201) ? r.data : Promise.reject(r);

const adminSocialMediaService = {
    list: (params = {}) => apiClient.get(endpoints.list, { params }).then(ok),
    create: (payload) => apiClient.post(endpoints.create, payload).then(ok),
    get: (id) => apiClient.get(endpoints.one(id)).then(ok),
    update: (id, payload) => apiClient.put(endpoints.update(id), payload).then(ok),
    remove: (id) => apiClient.delete(endpoints.remove(id)).then(ok),
    statsOverview: () => apiClient.get(endpoints.statsOverview).then(ok),
};

export default adminSocialMediaService;

