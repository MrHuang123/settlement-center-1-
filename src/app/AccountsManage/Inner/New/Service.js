import CommonService from '../../../../service/CommonService';
import { Remote } from '../../../../util/index';

class Service extends CommonService {
    checkInner(params) {
        return Remote.post('/ACCMCommon/check?flag=0&tableName=base_internal_account', params);
    }

    addInner(params) {
        return Remote.post('/base/internalAccount/add', params);
    }
}
export default new Service();
