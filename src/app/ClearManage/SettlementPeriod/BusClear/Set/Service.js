import CommonService from '@/service/CommonService';
import { Remote } from '@/util';

class Service extends CommonService {
    getDetail(params) {
        return Remote.get('/cycle/settleMerchantConfig/getBusinessCycleInfo', params);
    }

    reset(params) {
        return Remote.post('/cycle/settleMerchantConfig/alterBusinessCycleInfo', params);
    }
}
export default new Service();
