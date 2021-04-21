import CommonService from '../../../../service/CommonService';
import { Remote } from '../../../../util/index';

class Service extends CommonService {
    getList(params) {
        return Remote.get('/alarm/verifyAlarmRule/pageQuery', params);
    }

    getDetail(params) {
        return Remote.get(`/alarm/verifyAlarmRule/queryById`, params);
    }

    newDetail(params) {
        return Remote.post(`/alarm/verifyAlarmRule/add`, params);
    }

    delDetail(params) {
        return Remote.put('/alarm/verifyAlarmRule/delete', params);
    }

    resetDetail(params) {
        return Remote.put('/alarm/verifyAlarmRule/edit', params);
    }
}
export default new Service();
