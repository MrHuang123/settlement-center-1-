import CommonService from '../../../../../service/CommonService';
import { Remote } from '../../../../../util/index';

class Service extends CommonService {
    getList(params) {
        return Remote.get(`/payment/paymentAudit/pageQuery`, params);
    }

    getDetail(params) {
        return Remote.get(`/payment/paymentAudit/detail`, params);
    }

    pass(params) {
        return Remote.post(`/payment/paymentAudit/pass`, params);
    }

    refuse(params) {
        return Remote.post(`/payment/paymentAudit/refuse`, params);
    }
}
export default new Service();
