import CommonService from '../../../../service/CommonService';
import { Remote } from '../../../../util/index';

class Service extends CommonService {
    editOne(params) {
        return Remote.put('/error/verifyErrorFlow/edit', params);
    }

    editTogether(params) {
        return Remote.put('/error/verifyErrorFlow/batchEdit', params, 'formData');
    }

    getDetail(params) {
        return Remote.get('/error/verifyErrorFlow/queryById', params);
    }
}
export default new Service();
