import CommonService from '../../../../service/CommonService';
import { Remote } from '../../../../util';

class Service extends CommonService {
    getList(params) {
        return Remote.get(`/tax/list`, params);
    }

    getDetail(params) {
        return Remote.get(`/tax/detail`, params);
    }

    upload(params) {
        return Remote.post(`/tax/upload/zip`, params);
    }

    push(params) {
        return Remote.put(`/tax/push`, params, 'formData');
    }

    down(params) {
        return Remote.get(`/tax/downloadTax`, params);
    }
}
export default new Service();
