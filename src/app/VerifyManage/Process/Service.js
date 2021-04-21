import CommonService from '../../../service/CommonService';
import { Remote } from '../../../util/index';

class Service extends CommonService {
    getList(params) {
        return Remote.get('/data/verifyDataProcess/pageQuery', params);
    }

    setDetail(params) {
        return Remote.put('/data/verifyDataProcess/gobatch', params);
    }
}
export default new Service();
