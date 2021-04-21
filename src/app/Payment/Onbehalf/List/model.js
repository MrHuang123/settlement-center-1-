import Service from './Service';

export default {
    state: {
        initData: [],
        searchData: {},
        page: {},
        detailList: [],
        detail: {},
        sumBatDetail: {},
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
                initData: data.records[0].pageResult,
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
                detail: {},
            };
        },
        setDetail(state, data) {
            return {
                ...state,
                detail: data,
            };
        },
        setSumBatDetail(state, sumBatDetail) {
            return {
                ...state,
                sumBatDetail,
            };
        },
    },
    effects: {
        async asyncGetList(params) {
            const data = await Service.getList(params);
            if (data.success) {
                this.setList(data.result);
                this.setSumBatDetail(data.result.records[0].sumBatDetail);
                this.saveSearchData(params);
            }
        },
        async asyncDown(params) {
            const data = await Service.down(params);
            return data;
        },
        async asyncGetDetail(params) {
            const data = await Service.getDetail(params);
            this.setDetail(data.result);
            return data;
        },
        async asyncEdit(params) {
            const data = await Service.edit(params);
            return data;
        },
        async asyncRePay(params) {
            const data = await Service.rePay(params);
            return data;
        },
        // async asyncPush(params) {
        //     const data = await Service.push(params);
        //     return data;
        // },
    },
};
