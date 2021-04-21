import CommonService from '../../../../service/CommonService';
import { Remote } from '../../../../util/index';

class Service extends CommonService {
    getList(params) {
        return Remote.get('/alarm/verifyAlarmNotice/pageQuery', params);
    }

    delDetail(params) {
        return Remote.post('/alarm/verifyAlarmNotice/deleteBatch', params);
    }
}
export default new Service();
