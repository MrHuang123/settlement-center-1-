import CommonService from '../../../../service/CommonService';
import { Remote } from '../../../../util/index';

class Service extends CommonService {
    getList(params) {
        return Remote.get(`/payment/paymentOnlineBank/pageQuery`, params);
    }

    down(params) {
        return Remote.get(`/payment/paymentCooperation/exportXls`, params);
    }

    clear(params) {
        return Remote.put(`/payment/paymentOnlineBank/settleUp`, params, 'formData');
    }
}
export default new Service();
