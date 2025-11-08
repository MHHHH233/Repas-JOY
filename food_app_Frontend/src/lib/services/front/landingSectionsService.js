import apiClient from '../../apiclient';
import endpoints from '../../endpoints/user/landingSections';

const ok = (r) => (r.status === 200 || r.status === 201) ? r.data : Promise.reject(r);

const userLandingSectionsService = {
    list: (params = {}) => apiClient.get(endpoints.list, { params }).then(ok),
    active: (params = {}) => apiClient.get(endpoints.active, { params }).then(ok),
    create: (payload) => apiClient.post(endpoints.create, payload).then(ok),
    get: (id) => apiClient.get(endpoints.one(id)).then(ok),
    update: (id, payload) => apiClient.put(endpoints.update(id), payload).then(ok),
    remove: (id) => apiClient.delete(endpoints.remove(id)).then(ok),
};

export default userLandingSectionsService;


