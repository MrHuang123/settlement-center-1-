import CommonService from '../../../../../service/CommonService';
import { Remote } from '../../../../../util/index';

class Service extends CommonService {
    getList(params) {
        return Remote.get(`/acountfee/accountFeeParam/list`, params);
    }

    reSet(params) {
        return Remote.put(`/acountfee/accountFeeParam/edit`, params);
    }
}
export default new Service();
