/* eslint-disable  */
import { message } from 'antd';
import Login from '../service/LoginService';

export default {
    state: {
        sysAllDictItems: {},
    },
    reducers: {
        getSysAllDictItems(state) {
            return {
                ...state,
                sysAllDictItems: JSON.parse(localStorage.getItem('sysAllDictItems')),
            }
        },
    },
    effects: {
        async asyncSendLogin(data) {
            const res = await Login.sendLogin(data);
            if (res.success) {
                //存储登录信息
                localStorage.setItem('token', res.result.token);
                //存储字典信息
                localStorage.setItem('sysAllDictItems', JSON.stringify(res.result.sysAllDictItems));
                //存储用户信息
                localStorage.setItem('userInfo',JSON.stringify(res.result.userInfo));
                message.success('登录成功');
                window.location.href = '/';
            } else {
                message.error(res.message, 1);
            }
            // if (res.code === 2) {
            //     message.success(res.msg);
            //     setTimeout(() => {
            //         window.location.href = '/';
            //     }, 1000);
            // }
        },
        async asyncLogout() {
            const res = await Login.logOut();
            localStorage.setItem('userInfo','');
            // localStorage.setItem('token','');
            if (res.success) {
                window.location.href = '/login';
            }
        },
        async asyncSendPhoneVerificodeMsg(data) {
            const res = await Login.sendPhoneVerificodeMessage(data);
            console.info(res);
            return res;
        },
        async asyncCheckPhoneVerificodeMsg(data) {
            const res = await Login.checkPhoneVerificodeMessage(data);
            console.info(res);
            return res;
        },
        async asyncUpdatePassWord(data) {
            const res = await Login.updatePassWord(data);
            console.info(res);
            return res;
        },
    },
};
