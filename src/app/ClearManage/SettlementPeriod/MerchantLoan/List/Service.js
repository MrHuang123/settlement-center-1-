import CommonService from '@/service/CommonService';
import { Remote } from '@/util';

class Service extends CommonService {
    getList(params) {
        return Remote.post(`/cycle/settleMerchantConfig/merchantPageQuery`, {
            ...params,
            principalType: '01',
        });
    }
}
export default new Service();
