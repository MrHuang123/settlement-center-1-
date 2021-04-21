import CommonService from '../../../../service/CommonService';
import { Remote } from '../../../../util/index';

class Service extends CommonService {
    asyncGetList(params) {
        return Remote.post('/account/accountInOutDetail/pageQuery', params);
    }

    asyncGetDetail(params) {
        return Remote.get(`/account/accountInOutDetail/detail?id=${params.id}`);
    }

    asyncGetChannelList(params) {
        return Remote.post(`/account/accountInOutDetail/channelPageQuery`, params);
    }
}
export default new Service();
