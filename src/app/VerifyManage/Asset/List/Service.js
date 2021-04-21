import CommonService from '../../../../service/CommonService';
import { Remote } from '../../../../util/index';

class Service extends CommonService {
    getList(params) {
        return Remote.get('/capital/capitalLossFlow/list', params);
    }

    getDetail(params) {
        return Remote.get(`/capital/capitalLossFlow/queryById`, params);
    }

    setDetail(params) {
        return Remote.put(`/capital/capitalLossFlow/edit`, params);
    }

    getVerifyStatus(params) {
        return Remote.get(`/capital/capitalLossOperate/queryByCapitalLossNum`, params);
    }
}
export default new Service();
