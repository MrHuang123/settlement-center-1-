import CommonService from '@/service/CommonService';
import { Remote } from '@/util';

class Service extends CommonService {
    getDetail(params) {
        return Remote.get('/cycle/settleMerchantConfig/viewConfigInfo', params);
    }

    searchName(params) {
        return Remote.get('/cycle/settleMerchantConfig/getMerchantInfo', {
            ...params,
            principalType: '01',
        });
    }

    reset(params) {
        return Remote.post('/cycle/settleMerchantConfig/alterConfigInfo', {
            ...params,
            principalType: '01',
        });
    }

    new(params) {
        return Remote.post('/cycle/settleMerchantConfig/addConfigInfo', {
            ...params,
            principalType: '01',
        });
    }
}
export default new Service();
