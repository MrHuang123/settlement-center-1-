import CommonService from '../../../../service/CommonService';
import { Remote } from '../../../../util';

class Service extends CommonService {
    check(params) {
        return Remote.post(`/ACCMCommon/check?flag=1&tableName=base_accounting_entry`, params);
    }

    addRule(params) {
        return Remote.post('/base/accountingEntry/add', params);
    }

    getDetail(params) {
        return Remote.get(`/base/accountingEntry/queryById?id=${params.id}`);
    }

    resetRule(params) {
        return Remote.put(`/base/accountingEntry/edit`, params);
    }
}
export default new Service();
