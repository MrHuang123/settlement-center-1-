import Service from './Service';

export default {
    state: {
        initData: [],
        searchData: {},
        page: {},
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
        async asyncQueryTurnInList(params) {
            const data = await Service.queryTurnInList(params);
            return data;
        },
        async asyncAdd(params) {
            const data = await Service.add(params);
            return data;
        },
        async asyncCheckStatus(params) {
            const data = await Service.checkStatus(params);
            return data;
        },
    },
};
