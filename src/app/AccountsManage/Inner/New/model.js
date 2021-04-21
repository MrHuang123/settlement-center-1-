import Service from './Service';

export default {
    state: {},
    reducers: {},
    effects: {
        async asyncCheckInner(params) {
            const data = await Service.checkInner(params);
            return data;
        },
        async asyncInnerAdd(params) {
            const data = await Service.addInner(params);
            return data;
        },
    },
};
