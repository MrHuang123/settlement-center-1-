import CommonService from '../../../../service/CommonService';
import { Remote } from '../../../../util/index';

class Service extends CommonService {
    getList(params) {
        return Remote.get(`/vo/OuterAccount/list`, params);
    }

    getDetail(params) {
        return Remote.get(`/vo/OuterAccount/queryById`, params);
    }
}
export default new Service();
