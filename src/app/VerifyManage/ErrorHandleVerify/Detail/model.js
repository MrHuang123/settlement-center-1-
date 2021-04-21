import Service from './Service';

export default {
    state: {
        detail: {},
    },
    reducers: {
        setDetail(state, data) {
            return {
                ...state,
                detail: data,
            };
        },
    },
    effects: {
        async asyncGetDetail(params) {
            const data = await Service.getDetail(params);
            if (data.success) {
                this.setDetail(data.result);
            }
        },
        async asyncEditDetail(params) {
            const data = await Service.editDetail(params);
            return data;
        },
    },
};
