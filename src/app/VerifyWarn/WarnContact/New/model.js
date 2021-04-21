import Service from './Service';

export default {
    state: {
        detail: {},
        dataSourceList: [],
    },
    reducers: {
        setDataSourceList(state, data) {
            return {
                ...state,
                dataSourceList: data.map((item, index) => {
                    return {
                        ...item,
                        index,
                    };
                }),
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
                dataSourceList: [],
                detail: {},
            };
        },
    },
    effects: {
        async asyncNew(params) {
            const data = await Service.newDetail(params);
            return data;
        },
        async asyncReset(params) {
            const data = await Service.resetDetail(params);
            return data;
        },
        async asyncGetDetail(params) {
            const data = await Service.getDetail(params);
            if (data.success) {
                this.setDetail(data.result);
                this.setDataSourceList(data.result.businessBoList.map((item, index) => {
                    return {
                        ...item,
                        key: index,
                    };
                }));
            }
            return data;
        },
    },
};
