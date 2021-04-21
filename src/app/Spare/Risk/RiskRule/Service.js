import CommonService from '@/service/CommonService';
import { Remote } from '@/util';

class Service extends CommonService {
    getList(params) {
        return Remote.get(`/virtualcash/virtualCashRule/list`, params);
    }

    getAccountList(params) {
        return Remote.get(`/virtualcash/virtualCashRule/queryByAccount`, params);
    }

    addOrReset(params) {
        return Remote.post(`/virtualcash/virtualCashRule/edit`, params);
    }
}
export default new Service();
