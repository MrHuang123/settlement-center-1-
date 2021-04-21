import Service from './Service';

export default {
    state: {
        str: '',
    },
    reducers: {
        setStr(state, text) {
            return {
                ...state,
                str: text,
            };
        },

    },
    effects: {
        async asyncUpdatePassword(data) {
            const obj = await Service.updatePassword(data);
            this.setStr(obj.msg);
        },
    },
};
