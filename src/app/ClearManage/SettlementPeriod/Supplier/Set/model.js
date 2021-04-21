/* eslint-disable */
import Service from './Service';

export default {
    state: {
        detail: {},
    },
    reducers: {
        setDetail(state,detail){
            return {
                ...state,
                detail,
            }
        }
    },
    effects: {
        async asyncGetDetail(params) {
            const data = await Service.getDetail(params);
            if(data.success){
                this.setDetail(data.result);
            }
            return data.result;
        },
        async asyncSearchName(params) {
            const data = await Service.searchName(params);
            return data;
        },
        async asyncReset(params) {
            const data = await Service.reset(params);
            return data;
        },
        async asyncNew(params) {
            const data = await Service.new(params);
            return data;
        }
    },
};
