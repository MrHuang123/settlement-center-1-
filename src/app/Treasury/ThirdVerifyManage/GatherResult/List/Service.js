import CommonService from '@/service/CommonService';
import { Remote } from '@/util/index';

class Service extends CommonService {
    getList(params) {
        return Remote.get('/error/verifyDataCheckSum/pageQuery', params);
    }

    getDetail(params) {
        return Remote.get(`/error/verifyDataCheckSum/queryByCheckBatchNo`, params);
    }
}
export default new Service();
