import CommonService from '@/service/CommonService';
import { Remote } from '@/util';

class Service extends CommonService {
    getList(params) {
        return Remote.post(`/exchequern/exchequernDifferenceAudit/pageQuery`, params);
    }

    getDetail(params) {
        return Remote.get(`/exchequern/exchequernDifferenceAudit/detail`, params);
    }

    verify(params) {
        return Remote.post(`/exchequern/exchequernDifferenceAudit/audit`, params);
    }
}
export default new Service();
