import CommonService from '../../../../service/CommonService';
import { Remote } from '../../../../util/index';

class Service extends CommonService {
    getList(params) {
        return Remote.get(`/base/internalAccount/list?pageNo=${params.pageNo}&pageSize=${params.pageSize}&internalAccountNo=${params.internalAccountNo || ''}&subjectNo=${params.subjectNo || ''}&internalAccountStatus=${params.internalAccountStatus === undefined ? '' : params.internalAccountStatus}`);
    }
}
export default new Service();
