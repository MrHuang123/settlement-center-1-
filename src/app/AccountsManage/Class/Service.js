import CommonService from '../../../service/CommonService';
import { Remote } from '../../../util/index';

class Service extends CommonService {
    getClassEnum() {
        return Remote.get('/base/accountingSubject/getSubjectEnums');
    }

    getClassDetail(params) {
        return Remote.get(`/base/accountingSubject/queryByNo?no=${params.subjectNo}`);
    }
}
export default new Service();
