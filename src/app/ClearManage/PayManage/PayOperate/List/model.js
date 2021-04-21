import Service from './Service';

export default {
    state: {
        initData: [],
        searchData: {},
        page: {},
        detailList: [],
        detail: [],
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
        async gatherPay(params) {
            const data = await Service.gatherPay(params);
            return data;
        },
        async gatherEbank(params) {
            const data = await Service.gatherEbank(params);
            return data;
        },
        async gatherCancel(params) {
            const data = await Service.gatherCancel(params);
            return data;
        },
        async asyncGetDetail(params) {
            const data = await Service.getDetail(params);
            this.setDetail(data.result);
            return data;
        },
    },
};
