import CommonService from '../../../../service/CommonService';
import { Remote } from '../../../../util/index';

class Service extends CommonService {
    getList(params) {
        return Remote.get(`/base/accountingClass/list?classStatus=1&pageNo=${params.pageNo}&pageSize=${params.pageSize}&classLevel=${params.classLevel || ''}&classNo=${params.classNo || ''}&parentClassNo=${params.parentClassNo || ''}`);
    }
}
export default new Service();
