import Service from './Service';

export default {
    state: {
        initData: [],
        searchData: {},
        page: {},
        detail: {},
        selectValue: [],
        selectKey: [],
    },
    reducers: {
        setSelect(state, data) {
            return {
                ...state,
                selectValue: data.v,
                selectKey: data.k,
            };
        },
        clearSelect(state) {
            return {
                ...state,
                selectValue: [],
                selectKey: [],
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
            const data = await Service.getList(params);
            if (data.success) {
                this.setList(data.result);
                this.saveSearchData(params);
            }
        },
        async asyncGetDel(params) {
            const data = await Service.delDetail(params);
            return data;
        },
    },
};
