/* eslint-disable */
import Service from './Service';

export default {
    state: {
        detail: {},
    },
    reducers: {
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
        clearData(state) {
            return {
                ...state,
                detail: {},
            }
        }
    },
    effects: {
        async editOne(params) {
            const data = await Service.editOne(params);
            return data;
        },
        async editTogether(params) {
            const data = await Service.editTogether(params);
            return data;
        },
        async asyncGetDetail(params) {
            const data = await Service.getDetail(params);
            if (data.success) {
                this.setDetail(data.result);
            }
        }
    },
};
