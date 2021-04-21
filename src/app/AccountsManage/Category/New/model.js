import Service from './Service';

export default {
    state: {
        categoryLevel: '01',
        detail: {},
    },
    reducers: {
        setCategoryLevel(state, data) {
            return {
                ...state,
                ...data,
            };
        },
        setCategoryDetail(state, data) {
            return {
                ...state,
                detail: data,
            };
        },
        clearData(state) {
            return {
                ...state,
                detail: {},
            };
        },
    },
    effects: {
        async asyncAddCategory(params) {
            const data = await Service.addCategory(params);
            return data;
        },
        async asyncGetOptions(params) {
            const data = await Service.getOptions(params);
            return data.result;
        },
        async asyncGetDetail(params) {
            const data = await Service.getDetail(params);
            if (data.success) {
                this.setCategoryDetail(data.result);
                return data.result;
            }
            return {};
        },
        async asyncJustDetail(params) {
            const data = await Service.getDetail(params);
            if (data.success) {
                return data.result;
            }
            return {};
        },
        async asyncCheckCategory(params) {
            const data = await Service.check(params);
            return data;
        },
        async asyncSetCategory(params) {
            const data = await Service.setCategory(params);
            return data;
        },
    },
};
