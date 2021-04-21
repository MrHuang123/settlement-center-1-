import CommonService from '@/service/CommonService';
import { Remote } from '@/util';

class Service extends CommonService {
    getList(params) {
        return Remote.post(`/cashier/deliveryTotal/pageList?pageNo=${params.pageNo}&pageSize=${params.pageSize}`, params);
    }

    getDistinctDetail(params) {
        return Remote.post(`/cashier/deliveryTotal/queryDistinctDetail`, params);
    }

    getDetail(params) {
        return Remote.post(`/cashier/deliveryTotal/detail`, params);
    }

    commitDiff(params) {
        return Remote.post(`/cashier/deliveryTotal/commitDiff`, params);
    }
}
export default new Service();
