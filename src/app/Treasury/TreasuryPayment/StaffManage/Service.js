import CommonService from '@/service/CommonService';
import { Remote } from '@/util';

class Service extends CommonService {
    getList(params) {
        return Remote.get(`/employee/shopConfig/list`, params);
    }

    saveShopConfig(params) {
        return Remote.post(`/employee/saveShopConfig`, params, 'formData');
    }

    getShopEmployees(params) {
        return Remote.get(`/employee/exchequer/list`, params);
    }

    getEmployees(params) {
        return Remote.get(`/employee/cashier/list`, params);
    }
}
export default new Service();
