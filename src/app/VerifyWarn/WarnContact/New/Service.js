import CommonService from '../../../../service/CommonService';
import { Remote } from '../../../../util/index';

class Service extends CommonService {
    newDetail(params) {
        return Remote.post('/alarm/verifyAlarmNotice/addNotice', params);
    }

    resetDetail(params) {
        return Remote.put('/alarm/verifyAlarmNotice/edit', params);
    }

    getDetail(params) {
        return Remote.post('/alarm/verifyAlarmNotice/queryById', params);
    }
}
export default new Service();
