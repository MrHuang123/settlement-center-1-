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
        clearList(state) {
            return {
                ...state,
                initData: [],
            };
        },
    },
    effects: {
        // eslint-disable-next-line consistent-return
        async asyncGetList(params) {
            const data = await Service.getList(params);
            if (data.success) {
                this.setList(data.result);
                this.saveSearchData(params);
            }
        },
    },
};
