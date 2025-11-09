import apiClient from '../../apiclient';
import endpoints from '../../endpoints/admin/dashboard';

const ok = (r) => (r.status === 200 || r.status === 201) ? r.data : Promise.reject(r);

const adminDashboardService = {
    overview: () => apiClient.get(endpoints.overview).then(ok),
};

export default adminDashboardService;

