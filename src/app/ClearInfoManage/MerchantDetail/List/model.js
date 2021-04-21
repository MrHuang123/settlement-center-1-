import Service from './Service';

export default {
    state: {
        initData: [],
        searchData: {},
        page: {},
        detail: {},
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
                initData: data.records.map((ite, index) => {
                    return {
                        ...ite,
                        index,
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
        setDetail(state, data) {
            return {
                ...state,
                detail: data,
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
        // eslint-disable-next-line consistent-return
        async asyncGetList(params) {
            const data = await Service.getList(params);
            if (data.success) {
                this.setList(data.result);
                this.saveSearchData(params);
            }
            return data;
        },
        async asyncGetDetail(params) {
            const data = await Service.getDetail(params);
            this.setDetail(data.result);
            return data;
        },
    },
};
