import Service from './Service';

export default {
    state: {
        initData: [],
        searchData: {},
        page: {},
        detail: {},
    },
    reducers: {
        setInitData(state, data) {
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
            const data = await Service.asyncGetList(params);
            if (data.success) {
                this.setInitData(data.result);
                this.saveSearchData(params);
            }
        },
        async asyncGetDetail(params) {
            const data = await Service.asyncGetDetail(params);
            if (data.success) {
                this.setDetail(data.result);
            }
        },
        async asyncGetChannelList(params) {
            // eslint-disable-next-line no-unused-vars
            const data = await Service.asyncGetChannelList(params);
        },
    },
};
