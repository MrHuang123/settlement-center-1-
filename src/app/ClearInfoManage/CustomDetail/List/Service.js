import CommonService from '../../../../service/CommonService';
import { Remote } from '../../../../util/index';

class Service extends CommonService {
    getList(params) {
        return Remote.get(`/settleInfo/list`, {
            ...params,
            accountType: 3,
        });
    }

    getDetail(params) {
        return Remote.get(`/cashout/cashOutTrade/queryById`, params);
    }
}
export default new Service();
