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
                detail: [],
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
        // async asyncDown(params) {
        //     const data = await Service.down(params);
        //     return data;
        // },
        // async asyncGetDetail(params) {
        //     const data = await Service.getDetail(params);
        //     this.setDetail(data.result);
        //     return data;
        // },
        async asyncSettleUp(params) {
            const data = await Service.settleUp(params);
            return data;
        },
        async handleClears(params) {
            const data = await Service.clear(params);
            return data;
        },
    },
};
