import Service from './Service';

export default {
    state: {
        initData: [],
        searchData: {},
        page: {},
        detail: {},
    },
    reducers: {
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
        saveSearchData(state, data) {
            return {
                ...state,
                searchData: data,
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
            const data = await Service.getFlow(params);
            if (data.success) {
                this.setList(data.result.page);
                this.saveSearchData(params);
                return data.result.sapCertStatus;
            // eslint-disable-next-line no-else-return
            } else {
                // this.setList([]);
                this.saveSearchData(params);
            }
            return [];
        },
        async asyncGetDetail(params) {
            const data = await Service.getDetail(params);
            if (data.success) {
                this.setDetail(data.result);
            }
        },
        async asyncGetReason(params) {
            const data = await Service.getReason(params);
            return data;
        },
        async asyncPut(params) {
            const data = await Service.put(params);
            return data;
        },
        async asyncRePut(params) {
            const data = await Service.rePut(params);
            return data;
        },
    },
};
