import CommonService from '../../../../service/CommonService';
import { Remote } from '../../../../util/index';

class Service extends CommonService {
    getFlow(params) {
        return Remote.post('/account/accountFlow/pageQuery', params);
    }

    getDetail(params) {
        return Remote.get(`/account/accountFlow/detail?id=${params.id}`);
    }

    getReason(params) {
        return Remote.get(`/account/accountFlow/getFailReason`, params);
    }

    put(params) {
        return Remote.post(`/account/accountFlow/reversal`, params);
    }

    rePut(params) {
        return Remote.post(`/account/accountFlow/retrySap`, params, 'formData');
    }
}
export default new Service();
