/* eslint-disable  */
import Service from './Service';

export default {
    state: {
        initData: [],
        searchData: {},
        page: {},
        bankInfo:[],
        photoList:[],
        detail:{},
    },
    reducers: {
        clearData(state){
            return {
                ...state,
                detail:{},
                initData:[],
            }
        },
        setList(state, data) {
            return {
                ...state,
                initData: data,
            };
        },
        setDetail(state,data){
            return {
                ...state,
                detail:data,
            }
        },
        saveSearchData(state, data) {
            return {
                ...state,
                searchData: data,
            };
        },
        setBankInfo(state,data){
            return {
                ...state,
                paymentInfo: data.result ? data.result.paymentList.map((item, index) => {
                    return {
                        id: index,
                        // key:index,
                        name: `${item.account}/${item.org}`,
                        org:item.org,
                        account:item.account,
                        text:item.name,
                    }
                }) : [],
                collectionInfo:data.result?data.result.collectionList.map((item, index) => {
                    return {
                        id: index,
                        // key:index,
                        name: `${item.account}/${item.org}`,
                        org:item.org,
                        account:item.account,
                        text:item.name,
                    }
                }) :[],
            }
        },
        setPhotolist(state,data){
            return{
                ...state,
                photoList:data
            }
        }
    },
    effects: {
        async asyncGetList(params) {
            const data = await Service.getList(params);
            if (data.success) {
                this.setList(data.result[1].map((element,index)=>{
                    return {
                        ...element,
                        index:index+1,
                    }
                }));
                this.setDetail(data.result[0]);
            }
        },
        async asyncNewIncome(params) {
            const data = await Service.newIncome(params);
            return data;
        },
        async asyncGetBankInfo(params) {
            const data = await Service.getBanKInfo(params);
            if (data.success) {
                this.setBankInfo(data);
            }
        },
        async asyncDelIncome(params){
            const data = await Service.delIncome(params);
            return data;
        }
    },
};
