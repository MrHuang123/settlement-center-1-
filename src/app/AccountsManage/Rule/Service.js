import CommonService from '../../../service/CommonService';
import { Remote } from '../../../util';

class Service extends CommonService {
    getClassList(params) {
        return Remote.post('/base/accountingEntry/getAccountingList', params);
    }

    getSubject(params) {
        return Remote.post('/base/accountingEntry/getSubjectList', params);
    }
}
export default new Service();
