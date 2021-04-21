import Service from './Service';

export default {
    state: {
        initData: [],
        searchData: {},
        page: {},
        detailList: [],
    },
    reducers: {
        saveSearchData(state, data) {
            return {
                ...state,
                searchData: data,
            };
        },
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
        setDetailList(state, data) {
            return {
                ...state,
                detailList: data.records,
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
            const data = await Service.getList(params);
            if (data.success) {
                this.setList(data.result);
                this.saveSearchData(params);
            }
        },
        async asyncGetDetailList(params) {
            const data = await Service.getDetailList(params);
            if (data.success) {
                this.setDetailList(data.result);
            }
        },
    },
};
