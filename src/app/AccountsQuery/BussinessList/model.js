import Service from './Service';

export default {
    state: {
        initData: [],
        searchData: {},
        page: {},
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
    },
    effects: {
        async asyncGetChannelList(params) {
            const data = await Service.asyncGetChannelList(params);
            if (data.success) {
                this.saveSearchData(params);
                this.setInitData(data.result);
            }
        },
    },
};
