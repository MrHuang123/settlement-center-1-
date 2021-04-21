import Service from './Service';

export default {
    state: {
        detail: {},
        inComeList: [],
    },
    reducers: {
        setDetail(state, data) {
            return {
                ...state,
                detail: data[0],
                inComeList: data[1],
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
    },
};
