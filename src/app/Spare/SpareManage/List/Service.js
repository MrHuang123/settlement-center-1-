import CommonService from '@/service/CommonService';
import { Remote } from '@/util';

class Service extends CommonService {
    getList(params) {
        return Remote.get(`/pettycash/pettyCashManagement/list`, params);
    }

    // 新增账户
    add(params) {
        return Remote.post(`/pettycash/pettyCashManagement/add`, params);
    }

    // 重置状态
    reset(params) {
        return Remote.get(`/pettycash/pettyCashManagement/updateState`, params);
    }

    upanddown(params) {
        return Remote.get(`/pettycash/pettyCashManagement/addOrRed`, params);
    }
}
export default new Service();
