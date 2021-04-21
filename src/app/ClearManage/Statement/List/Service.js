import CommonService from '../../../../service/CommonService';
import { Remote } from '../../../../util/index';

class Service extends CommonService {
    getList(params) {
        return Remote.get(`/settleorder/settleAccountOrder/list`, params);
    }

    getDetail(params) {
        return Remote.get(`/settleorder/settleAccountDetail/queryBySaId`, params);
    }
}
export default new Service();
