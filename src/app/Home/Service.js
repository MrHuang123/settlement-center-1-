import CommonService from '../../service/CommonService';
import { Remote } from '../../util';

class Service extends CommonService {
    logOut(params) {
        return Remote.post('/sys/logout', params);
    }
}

export default new Service();
