import CommonService from '../../../service/CommonService';
import { Remote } from '../../../util/index';

class Service extends CommonService {
    getyl(params) {
        return Remote.get(`/settleInfo/queryYYBalance`, params);
    }

    getyx(params) {
        return Remote.get(`/settleInfo/queryYXBalance`, params);
    }
}
export default new Service();
