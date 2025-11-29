import apiGuest from '../../apiguest';
import endpoints from '../../endpoints/user/contacts';

const ok = (r) => (r.status === 200 || r.status === 201) ? r.data : Promise.reject(r);

const contactService = {
    sendMessage: (payload) => apiGuest.post(endpoints.create, payload).then(ok),
};

export default contactService;






