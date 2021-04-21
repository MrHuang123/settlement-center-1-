import CommonService from '@/service/CommonService';
import { Remote } from '@/util';

class Service extends CommonService {
    getList(params) {
        return Remote.post(`/cashier/delivery/pageList`, params);
    }

    queryTurnInList(params) {
        return Remote.post(`/cashier/delivery/list`, params);
    }

    add(params) {
        return Remote.post(`/cashier/delivery/add`, params);
    }

    checkStatus(params) {
        return Remote.post(`/cashier/delivery/checkDelivery`, params);
    }
}
export default new Service();
