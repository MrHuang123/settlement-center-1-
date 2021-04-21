import CommonService from '../../../../service/CommonService';
import { Remote } from '../../../../util/index';

class Service extends CommonService {
    getDetail(params) {
        return Remote.get('/error/verifyErrorOperate/queryById', params);
    }

    editDetail(params) {
        return Remote.put('/error/verifyErrorOperate/edit', params);
    }
}
export default new Service();
