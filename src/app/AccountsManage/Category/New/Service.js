import CommonService from '../../../../service/CommonService';
import { Remote } from '../../../../util';

class Service extends CommonService {
    addCategory(params) {
        return Remote.post('/base/accountingClass/add', params);
    }

    getOptions(params) {
        return Remote.get(`/base/accountingClass/list?classStatus=1&pageNo=${params.pageNo}&pageSize=${params.pageSize}&classLevel=${params.classLevel || ''}&classNo=${params.classNo || ''}&parentClassNo=${params.parentClassNo}`);
    }

    getDetail(params) {
        return Remote.get(`/base/accountingClass/queryByNo?classNo=${params.no}&level=${params.level}`);
    }

    check(params) {
        return Remote.post(`/ACCMCommon/check?flag=1&tableName=base_accounting_class`, params);
    }

    setCategory(params) {
        return Remote.put('/base/accountingClass/edit', params);
    }
}
export default new Service();
