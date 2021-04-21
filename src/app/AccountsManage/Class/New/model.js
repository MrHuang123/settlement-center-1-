import Service from './Service';

export default {
    state: {},
    reducers: {},
    effects: {
        async asyncAddClass(params) {
            const data = await Service.addClass(params);
            return data;
        },
        async asyncCheckClass(params) {
            const data = await Service.checkClass(params);
            return data;
        },
        async asyncResetClass(params) {
            const data = await Service.resetClass(params);
            return data.result;
        },
    },
};
