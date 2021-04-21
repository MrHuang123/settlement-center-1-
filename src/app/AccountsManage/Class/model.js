import Service from './Service';

export default {
    state: {
        classEnum: {},
        classDetail: {},
    },
    reducers: {
        setClassEnum(state, data) {
            return {
                ...state,
                classEnum: data,
            };
        },
        setClassDetail(state, data) {
            return {
                ...state,
                classDetail: data,
            };
        },
        clearClassDetail(state) {
            return {
                ...state,
                classDetail: {},
            };
        },
    },
    effects: {
        async asyncGetClassEnum() {
            const data = await Service.getClassEnum();
            this.setClassEnum(data.result);
        },
        async asyncGetClassDetail(params) {
            const data = await Service.getClassDetail(params);
            this.setClassDetail(data.result);
            return data;
        },
    },
};
