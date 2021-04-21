import CommonService from '../../../../service/CommonService';
import { Remote } from '../../../../util/index';

class Service extends CommonService {
    getList(params) {
        return Remote.get(`/base/accountingSubject/list?pageNo=${params.pageNo}&pageSize=${params.pageSize}&subjectLevel=${params.subjectLevel || ''}&subjectNo=${params.subjectNo || ''}`);
    }
}
export default new Service();
