import CommonService from '../../../service/CommonService';
import { Remote } from '../../../util/index';

class Service extends CommonService {
    getClassAll() {
        return Remote.get('/base/internalAccount/getAllSubjects');
    }

    getInnerDetail(params) {
        return Remote.get(`/base/internalAccount/queryByNo?no=${params.no}`);
    }

    putInner(params) {
        return Remote.put(`/base/internalAccount/edit`, params);
    }
}
export default new Service();
