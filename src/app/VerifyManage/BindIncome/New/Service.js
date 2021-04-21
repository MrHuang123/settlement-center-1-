import CommonService from '../../../../service/CommonService';
import { Remote } from '../../../../util/index';

class Service extends CommonService {
    newIncome(params) {
        return Remote.post('/bindbill/verifyBindingBill/add', params);
    }

    getBanKInfo(params) {
        return Remote.get('/bindbill/verifyBindingBill/getBankInfos', params);
    }

    getList(params) {
        return Remote.get('/bindbill/verifyBindingBill/queryByCheckBatchNo', params);
    }

    delIncome(params) {
        return Remote.get('/bindbill/verifyBindingBill/delete', params);
    }
}
export default new Service();
