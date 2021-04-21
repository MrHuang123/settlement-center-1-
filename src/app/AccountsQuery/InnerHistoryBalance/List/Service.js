import CommonService from '../../../../service/CommonService';
import { Remote } from '../../../../util/index';

class Service extends CommonService {
    getHistoryList(params) {
        return Remote.post('/account/accountBalanceHistory/historyPageQuery', params);
    }
}
export default new Service();
