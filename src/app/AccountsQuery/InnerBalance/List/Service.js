import CommonService from '../../../../service/CommonService';
import { Remote } from '../../../../util/index';

class Service extends CommonService {
    getList(params) {
        return Remote.post('/account/accountBalanceHistory/todayPageQuery', params);
    }
}
export default new Service();
