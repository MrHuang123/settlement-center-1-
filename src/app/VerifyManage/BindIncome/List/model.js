import Service from './Service';

export default {
    state: {
        initData: [],
        searchData: {},
        page: {},
        detail: {},
        inComeList: [],
    },
    reducers: {
        setList(state, data) {
            return {
                ...state,
                initData: data.records.map((item, index) => {
                    return {
                        ...item,
                        index: index + 1,
                    };
                }),
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
                detail: data[0],
                inComeList: data[1],
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
        },
    },
};
