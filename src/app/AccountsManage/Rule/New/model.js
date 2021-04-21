import Service from './Service';

export default {
    state: {
        dataSourceList: [],
        initData: {},
        remoteList: [],
    },
    reducers: {
        setDataSourceList(state, data) {
            return {
                ...state,
                dataSourceList: data,
            };
        },
        setRemoteList(state, data) {
            return {
                ...state,
                remoteList: data,
            };
        },
        setInitData(state, data) {
            return {
                ...state,
                initData: data.accountingEntry,
                dataSourceList: data.accountingEntryRule.map((item, index) => {
                    return {
                        ...item,
                        key: index,
                    };
                }),
            };
        },
        clearData(state) {
            return {
                ...state,
                initData: {},
                dataSourceList: [],
            };
        },
    },
    effects: {
        async asyncCheck(params) {
            const data = await Service.check(params);
            return data;
        },
        async asyncAddRule(params) {
            const data = await Service.addRule(params);
            return data;
        },
        async asyncResetRule(params) {
            const data = await Service.resetRule(params);
            return data;
        },
        async asyncGetDetail(params) {
            const data = await Service.getDetail(params);
            if (data.success) {
                this.setInitData(data.result[0]);
                this.setRemoteList(data.result[0].accountingEntryRule);
            }
            return data.result[0].accountingEntryRule;
        },
    },
};
