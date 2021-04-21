import Service from './Service';

export default {
    state: {},
    reducers: {},
    effects: {
        async asyncYl(params) {
            const data = await Service.getyl(params);
            return data;
        },
        async asyncYx(params) {
            const data = await Service.getyx(params);
            return data;
        },
    },
};
