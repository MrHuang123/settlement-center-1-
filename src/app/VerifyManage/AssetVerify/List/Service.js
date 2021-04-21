import CommonService from '../../../../service/CommonService';
import { Remote } from '../../../../util/index';

class Service extends CommonService {
    getList(params) {
        return Remote.get('/capital/capitalLossOperate/pageQuery', params);
    }

    setDetail(params) {
        return Remote.put(`/capital/capitalLossOperate/edit`, params);
    }

    getDetail(params) {
        return Remote.get(`/capital/capitalLossOperate/queryById`, params);
    }
}
export default new Service();
