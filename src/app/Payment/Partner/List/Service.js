import CommonService from '../../../../service/CommonService';
import { Remote } from '../../../../util';

class Service extends CommonService {
    getList(params) {
        return Remote.get(`/batpay/batpayCooperation/pageQuery`, params);
    }

    down(params) {
        return Remote.get(`/batpay/batpayDetail/downloadBatPay`, params);
    }

    settleUp(params) {
        return Remote.get(`/batpay/batpayCooperation/settleUp?ids=${params.ids}`);
    }
}
export default new Service();
