import CommonService from '../../../../service/CommonService';
import { Remote } from '../../../../util/index';

class Service extends CommonService {
    getList(params) {
        return Remote.get('/alarm/verifyAlarmRecord/pageQuery', params);
    }
}
export default new Service();
