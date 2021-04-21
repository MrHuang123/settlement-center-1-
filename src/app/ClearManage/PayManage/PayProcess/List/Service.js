import CommonService from '../../../../../service/CommonService';
import { Remote } from '../../../../../util/index';

class Service extends CommonService {
    getList(params) {
        return Remote.get(`/payorder/paymentOrder/progressPageQuery`, params);
    }

    getDetail(params) {
        return Remote.get(`/payorder/paymentOrder/progressDetail`, params);
    }
}
export default new Service();
