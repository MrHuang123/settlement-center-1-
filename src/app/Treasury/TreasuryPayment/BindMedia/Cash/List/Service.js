import CommonService from '@/service/CommonService';
import { Remote } from '@/util';

class Service extends CommonService {
    getList(params) {
        return Remote.get(`/cashReceipt/list`, params);
    }

    getDetailList(params) {
        return Remote.get(`/cashReceipt/detail/list`, params);
    }
}
export default new Service();
