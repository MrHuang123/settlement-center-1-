import CommonService from '../../../../../service/CommonService';
import { Remote } from '../../../../../util/index';

class Service extends CommonService {
    getList(params) {
        return Remote.get(`/account/accountClearData/pageQuery`, params);
    }

    getDetail(params) {
        return Remote.get(`/payment/paymentAudit/detail`, params);
    }

    rePay(params) {
        return Remote.post(`/payorder/paymentOrder/repay`, params);
    }
}
export default new Service();
