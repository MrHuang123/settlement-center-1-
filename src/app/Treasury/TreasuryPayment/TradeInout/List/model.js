import Service from './Service';

export default {
    state: {
        initData: [],
        searchData: {},
        page: {},
        detail: {},
        payType: [],
        shopList: [],
        casherList: [],
    },
    reducers: {
        saveSearchData(state, data) {
            return {
                ...state,
                searchData: data,
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
        clearData(state) {
            return {
                ...state,
                initData: [],
            };
        },
        clearCasher(state) {
            return {
                ...state,
                casherList: [],
            };
        },
        clearDetail(state) {
            return {
                ...state,
                detail: {},
            };
        },
        setPayType(state, payType) {
            return {
                ...state,
                payType,
            };
        },
        setShopList(state, shopList) {
            return {
                ...state,
                shopList: shopList.result,
            };
        },
        setCasherList(state, casherList) {
            return {
                ...state,
                casherList: casherList.result,
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
        async asyncGetDetail() {
            // const data = await Service.getList(params);
            // if (data.success) {
            //     this.setList(data.result);
            //     this.saveSearchData(params);
            // }
        },
        async asyncGetPayType() {
            const data = await Service.getPayType();
            this.setPayType(data);
        },
        async asyncGetShopList() {
            const data = await Service.getShopList();
            this.setShopList(data);
        },
        async asyncGetCasherList(params) {
            const data = await Service.getCasherList(params);
            this.setCasherList(data);
        },
    },
};
