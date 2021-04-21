import Service from './Service';

export default {
    state: {
        initData: [],
        searchData: {},
        page: {},
        detail: {},
    },
    reducers: {
        setList(state, data) {
            return {
                ...state,
                initData: data.records,
                page: {
                    current: data.current,
                    pages: data.pages,
                    size: data.size,
                    total: data.total,
                },
            };
        },
        saveSearchData(state, data) {
            return {
                ...state,
                searchData: data,
            };
        },
        setDetail(state, data) {
            return {
                ...state,
                detail: Object.assign({}, state.detail, data),
            };
        },
    },
    effects: {
        async asyncGetList(params) {
            const data = await Service.getList(params);
            if (data.success) {
                this.setList(data.result);
                this.saveSearchData(params);
            }
        },
        async asyncGetDetail(params) {
            const data = await Service.getDetail(params);
            if (data.success) {
                this.setDetail(data.result);
            }
            return data;
        },
        async asyncSetDetail(params) {
            const data = await Service.setDetail(params);
            return data;
        },
        async asyncGetVerifyStatus(params) {
            const data = await Service.getVerifyStatus(params);
            if (data.success) {
                this.setDetail(data.result);
            }
            return data;
        },
    },
};
