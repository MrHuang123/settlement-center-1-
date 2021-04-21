import CommonService from '../../../../../service/CommonService';
import { Remote } from '../../../../../util/index';

class Service extends CommonService {
    getList(params) {
        return Remote.get(`/payorder/paymentOrder/payQuery`, params);
    }

    gatherPay(params) {
        return Remote.put(`/payorder/paymentOrder/paymentsConfirm`, params, 'formData');
    }

    gatherEbank(params) {
        return Remote.put(`/payorder/paymentOrder/paymentsToEbank`, params, 'formData');
    }

    gatherCancel(params) {
        return Remote.put(`/payorder/paymentOrder/paymetsWithdraw`, params, 'formData');
    }

    getDetail(params) {
        return Remote.get(`/payorder/paymentOrder/queryByOrderId`, params);
    }
}
export default new Service();
