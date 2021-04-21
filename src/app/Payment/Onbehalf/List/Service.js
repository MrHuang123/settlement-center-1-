import CommonService from '../../../../service/CommonService';
import { Remote } from '../../../../util';

class Service extends CommonService {
    getList(params) {
        return Remote.get(`/batpay/batpayDetail/pageQuery`, params);
    }

    down(params) {
        return Remote.get(`/batpay/batpayDetail/downloadBatPay`, params);
    }

    getDetail(params) {
        return Remote.get(`/batpay/batpayDetail/queryById`, params);
    }

    edit(params) {
        return Remote.put(`/batpay/batpayDetail/edit`, params);
    }

    rePay(params) {
        return Remote.get(`/batpay/batpayDetail/failureUp`, params);
    }
}
export default new Service();
