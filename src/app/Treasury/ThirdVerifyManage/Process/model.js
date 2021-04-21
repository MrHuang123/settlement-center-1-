import Service from './Service';

export default {
    state: {
        initData: [],
        searchData: {},
        page: {},
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
    },
    effects: {
        async asyncGetList(params) {
            const data = await Service.getList(params);
            if (data.success) {
                this.setList(data.result);
                this.saveSearchData(params);
            }
        },
        async asyncSetDetail(params) {
            const data = await Service.setDetail(params);
            // if (data.success) {
            //     this.setList(data.result);
            //     this.saveSearchData(params);
            // }
            return data;
        },
    },
};
