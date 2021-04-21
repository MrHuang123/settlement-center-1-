import CommonService from '@/service/CommonService';
import { Remote } from '@/util';

class Service extends CommonService {
    getList(params) {
        return Remote.post(`/cashier/tradeFlow/pageList`, params);
    }

    getPayType(params) {
        return Remote.get(`/cashier/delivery/getAllPaymentMethod`, params);
    }

    getShopList(params) {
        return Remote.get(`/sys/user/getShopList`, params);
    }

    getCasherList(params) {
        return Remote.get(`/employee/cashier/list`, params);
    }
}
export default new Service();
