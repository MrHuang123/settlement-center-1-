import CommonService from '../../../../service/CommonService';
import { Remote } from '../../../../util/index';

class Service extends CommonService {
    getList(params) {
        return Remote.get('/bindbill/verifyBindingBill/pageQuery', params);
    }

    getDetail(params) {
        return Remote.get(`/bindbill/verifyBindingBill/queryByCheckBatchNo?checkBatchNo=${params.id}`);
    }
}
export default new Service();
