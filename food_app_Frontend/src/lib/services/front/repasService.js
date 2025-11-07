import apiClient from '../../apiclient';
import endpoints from '../../endpoints/user/repas';

const ok = (r) => (r.status === 200 || r.status === 201) ? r.data : Promise.reject(r);

const userRepasService = {
    list: (params = {}) => apiClient.get(endpoints.list, { params }).then(ok),
    create: (payload) => apiClient.post(endpoints.create, payload).then(ok),
    get: (id) => apiClient.get(endpoints.one(id)).then(ok),
    update: (id, payload) => apiClient.put(endpoints.update(id), payload).then(ok),
    remove: (id) => apiClient.delete(endpoints.remove(id)).then(ok),
    byCategory: (categoryId, params = {}) => apiClient.get(endpoints.byCategory(categoryId), { params }).then(ok),
};

export default userRepasService;


