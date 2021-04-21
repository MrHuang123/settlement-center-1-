import CommonService from '@/service/CommonService';
import { Remote } from '@/util';

class Service extends CommonService {
    getList(params) {
        return Remote.post(`/exchequern/exchequernDifferenceManage/pageQuery`, params);
    }

    getDetail(params) {
        return Remote.get(`/exchequern/exchequernDifferenceManage/detail`, params);
    }

    set(params) {
        return Remote.post(`/exchequern/exchequernDifferenceManage/diffProcess`, params);
    }
}
export default new Service();
