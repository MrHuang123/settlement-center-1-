/* eslint-disable */
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
        clearDetail(state){
            return {
                ...state,
                detail:{},
            }
        }
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
            if (data.success) {
                this.setDetail(data.result);
            }
        },
        async asyncSetDetail(params){
            const data = await Service.setDetail(params);
            if (data.success) {
                this.setDetail(data.result);
            }
        },
        async asyncCheck(params){
            const data = await Service.checkDetail(params);
            return data;
        }
    },
};
