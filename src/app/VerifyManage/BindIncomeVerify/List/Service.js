import CommonService from '../../../../service/CommonService';
import { Remote } from '../../../../util/index';

class Service extends CommonService {
    getList(params) {
        return Remote.get('/bindbill/verifyBindingExamine/pageQuery', params);
    }

    getDetail(params) {
        return Remote.get(`/bindbill/verifyBindingExamine/queryByBillCode`, params);
    }

    setDetail(params) {
        return Remote.post(`/bindbill/verifyBindingExamine/check`, params);
    }

    checkDetail(params) {
        return Remote.post('/bindbill/verifyBindingExamine/check', params);
    }
}
export default new Service();
