import CommonService from '../../../../service/CommonService';
import { Remote } from '../../../../util/index';

class Service extends CommonService {
    getList(params) {
        return Remote.get(`/settleInfo/list`, {
            ...params,
            accountType: 4,
        });
    }

    getDetail(params) {
        return Remote.get(`/settleInfo/queryDetails`, params);
    }
}
export default new Service();
