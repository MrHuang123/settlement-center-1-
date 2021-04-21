import CommonService from './CommonService';
import { Remote } from '../util';

class Login extends CommonService {
    logOut() {
        return Remote.post('/sys/logout');
    }

    sendLogin(params) {
        return Remote.post('/sys/login', params);
    }

    sendPhoneVerificodeMessage(params) {
        return Remote.post('/auth/sendPhoneVerificodeMessage.do', params);
    }

    checkPhoneVerificodeMessage(params) {
        return Remote.post('/auth/checkPhoneVerificodeMessage.do', params);
    }

    updatePassWord(params) {
        return Remote.post('/auth/updatePassWord.do', params);
    }
}

export default new Login();
