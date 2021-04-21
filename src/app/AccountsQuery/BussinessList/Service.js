import CommonService from '../../../service/CommonService';
import { Remote } from '../../../util/index';

class Service extends CommonService {
    asyncGetChannelList(params) {
        return Remote.post(`/account/accountInOutDetail/channelPageQuery`, params);
    }
}
export default new Service();
