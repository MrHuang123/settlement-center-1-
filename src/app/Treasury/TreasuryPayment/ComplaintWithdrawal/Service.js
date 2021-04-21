import CommonService from '@/service/CommonService';
import { Remote } from '@/util';

class Service extends CommonService {
    getList(params) {
        return Remote.get(`/withdraw/list`, params);
    }

    save(params) {
        return Remote.post(`/withdraw/add`, params);
    }
}
export default new Service();
