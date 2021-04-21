import CommonService from '@/service/CommonService';
import { Remote } from '@/util';

class Service extends CommonService {
    getList(params) {
        return Remote.post(`/shop/delivery/pageList`, params);
    }

    getDetail(params) {
        return Remote.post(`/shop/delivery/detail`, params);
    }
}
export default new Service();
