import { Remote } from '../util';

class CommonService {
    delay = (time) => {
        return new Promise((resolve) => {
            return setTimeout(() => {
                return resolve();
            }, time);
        });
    };

    getMenus() {
        return Remote.get('/sys/permission/getUserPermissionByToken');
    }

    getAllMenus() {
        return Remote.get('/sys/permission/getUserPermissionByToken');
    }

    getAreaInit() {
        return Remote.get('/area/getState.do');
    }

    getCity(params) {
        return Remote.get('/area/getCity.do', params);
    }

    getCounty(params) {
        return Remote.get('/area/getCounty.do', params);
    }

    getStreet(params) {
        return Remote.get('/area/getStreet.do', params);
    }

    upload(params) {
        return Remote.get('/ACCMCommon/upload', params);
    }

    setOrg(params) {
        return Remote.post('/sys/user/changeCompany', params);
    }

    getOrg(params) {
        return Remote.get('/sys/user/getCurrentCompany', params);
    }

    getShopList(params) {
        return Remote.get('/sys/user/getShopList', params);
    }
}

export default CommonService;
