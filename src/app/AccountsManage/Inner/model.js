import Service from './Service';

export default {
    state: {
        classAll: [],
        innerDetail: {},
    },
    reducers: {
        setClassAll(state, data) {
            return {
                ...state,
                classAll: data,
            };
        },
        setInnerDetail(state, data) {
            return {
                ...state,
                innerDetail: data,
            };
        },
        clearInnerDetail(state) {
            return {
                ...state,
                innerDetail: {},
            };
        },
    },
    effects: {
        async asyncGetClassAll() {
            const data = await Service.getClassAll();
            this.setClassAll(data.result);
        },
        async asyncGetInnerDetail(params) {
            const data = await Service.getInnerDetail(params);
            this.setInnerDetail(data.result);
        },
        async asyncSetInner(params) {
            const data = await Service.putInner(params);
            return data;
        },
    },
};
