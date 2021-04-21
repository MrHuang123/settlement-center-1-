import CommonService from '@/service/CommonService';
import { Remote } from '@/util/index';

class Service extends CommonService {
    newIncome(params) {
        return Remote.post('/cashReceipt/detail/add', params);
    }

    getBanKInfo(params) {
        return Remote.get('/bindbill/verifyBindingBill/getBankInfos', params);
    }

    getList(params) {
        return Remote.get('/bindbill/verifyBindingBill/queryByCheckBatchNo', params);
    }

    delIncome(params) {
        return Remote.post('/cashReceipt/delete', params);
    }

    queryAccountByShopCode(params) {
        return Remote.get('/cashReceipt/getAccountConfig', params);
    }

    edit(params) {
        return Remote.put('/cashReceipt/edit', params);
    }

    getUrl(params) {
        return Remote.post('/ACCMCommon/downloadUrl', params, 'formData');
    }
}
export default new Service();
