import CommonService from '@/service/CommonService';
import { Remote } from '@/util';

class Service extends CommonService {
    getList(params) {
        return Remote.post(`/report/shopReport/pageList`, params);
    }

    getDetail(params) {
        return Remote.post(`/report/shopReportDetail/detail`, params);
    }
}
export default new Service();
