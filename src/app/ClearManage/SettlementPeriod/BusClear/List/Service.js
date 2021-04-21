import CommonService from '@/service/CommonService';
import { Remote } from '@/util';

class Service extends CommonService {
    getList(params) {
        return Remote.post(`/cycle/settleMerchantConfig/businessPageQuery`, params);
    }
}
export default new Service();
