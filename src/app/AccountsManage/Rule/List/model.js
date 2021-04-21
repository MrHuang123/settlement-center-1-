import Service from './Service';

export default {
    state: {
        initData: [],
        searchData: {},
        page: {},
    },
    reducers: {
        setInitData(state, data) {
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
        clearData(state) {
            return {
                ...state,
                initData: [],
            };
        },
    },
    effects: {
        async asyncGetList(params) {
            const data = await Service.getRuleList(params);
            if (data.success) {
                this.setInitData(data.result);
                this.saveSearchData(params);
            }
        },
    },
};
