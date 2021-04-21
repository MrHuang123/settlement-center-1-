import CommonService from '../../service/CommonService';
import { Remote } from '../../util';

class Service extends CommonService {
    updatePassword(data) {
        return Remote.post('/user/updatePassword.do', data, {
            urlType: 'auth',
        });
    }
}

export default new Service();
