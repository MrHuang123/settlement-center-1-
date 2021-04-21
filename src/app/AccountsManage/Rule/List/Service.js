import CommonService from '../../../../service/CommonService';
import { Remote } from '../../../../util';

class Service extends CommonService {
    getRuleList(params) {
        return Remote.get(`/base/accountingEntry/list?pageNo=${params.pageNo || 1}&pageSize=${params.pageSize || 10}&classNoOne=${params.classNoOne || ''}&classNoTwo=${params.classNoTwo || ''}&classNoThree=${params.classNoThree || ''}`);
    }
}
export default new Service();
