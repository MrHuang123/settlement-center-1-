import Service from './Service';

export default {
    state: {
        initData: [],
        searchData: {},
        page: {},
        detailList: [],
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
        setDetail(state, data) {
            return {
                ...state,
                detail: data,
                detailList: data.detailList.map((item, index) => {
                    return {
                        ...item,
                        index,
                    };
                }),
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
            this.setDetail(data.result);
            return data;
        },
        async asyncPass(params) {
            const data = await Service.pass(params);
            return data;
        },
        async asyncRefuse(params) {
            const data = await Service.refuse(params);
            return data;
        },
    },
};
