import CommonService from '@/service/CommonService';
import { Remote } from '@/util';

class Service extends CommonService {
    getList(params) {
        return Remote.get(`/reserveFund/list`, params);
    }

    getEmployees(params) {
        return Remote.get(`/employee/cashier/list`, params);
    }

    add(params) {
        return Remote.post(`/reserveFund/add`, params);
    }
}
export default new Service();
