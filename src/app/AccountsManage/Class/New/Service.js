import CommonService from '../../../../service/CommonService';
import { Remote } from '../../../../util/index';

class Service extends CommonService {
    addClass(params) {
        return Remote.post('/base/accountingSubject/add', params);
    }

    checkClass(params) {
        return Remote.post('/ACCMCommon/check?flag=0&tableName=base_accounting_subject', params);
    }

    resetClass(params) {
        return Remote.put('/base/accountingSubject/edit', params);
    }
}
export default new Service();
