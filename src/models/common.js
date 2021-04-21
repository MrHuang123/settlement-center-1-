import CommonService from '../service/CommonService';
import { menus as localMenus } from '../../config/config';


const CommonServices = new CommonService();

export default {
    state: {
        menus: [],
        orgCode: '',
    },
    reducers: {
        /**
         * 获取角色列表
         * @param state
         * @param data
         * @returns {{roleList: []}}
         */
        setRoleList(state, data) {
            return {
                ...state,
                roleList: data,
            };
        },
        /**
         * 获取产品线
         * @param state
         * @param data
         * @returns {{productList: *}}
         */
        setProductList(state, data) {
            return {
                ...state,
                productList: data,
            };
        },
        /**
         * 获取商品信息
         * @param state
         * @param data
         * @returns {{storeList: *}}
         */
        setStoreList(state, data) {
            return {
                ...state,
                storeList: data,
            };
        },
        setMenus(state, data) {
            return {
                ...state,
                menus: data,
                // menus: Config.menus,
            };
        },
        setcategorycode(state, data) {
            return {
                ...state,
                categorycode: data,
            };
        },
        setTypeMap(state, data) {
            return {
                ...state,
                contractType: data,
            };
        },
        setCommonFlag(state, data) {
            return {
                ...state,
                commonFlag: data,
            };
        },
        setAttachUrl(state, data) {
            return {
                ...state,
                attachUrl: data,
            };
        },
        stateList(state, data) {
            return {
                ...state,
                areaList: data.data,
            };
        },
        cityList(state, data) {
            return {
                ...state,
                cityList: data.data,
            };
        },
        countyList(state, data) {
            return {
                ...state,
                countyList: data.data,
            };
        },
        streetList(state, data) {
            return {
                ...state,
                streetList: data.data,
            };
        },
        setMemoryData(state, data) {
            return {
                ...state,
                memoryInfo: data,
            };
        },
        setOrg(state, data) {
            return {
                ...state,
                orgCode: data.orgCode,
            };
        },
        setShopList(state, data) {
            return {
                ...state,
                shopList: data,
            };
        },
    },
    effects: {
        async asyncGetRoleList() {
            const data = await CommonServices.getRoleList();
            this.setRoleList(data.result);
        },
        async asyncGetProductList() {
            const data = await CommonServices.getProductList();
            this.setProductList(data.result);
        },
        async asyncGetStoreList() {
            const data = await CommonServices.getStoreList();
            this.setStoreList(data.result);
        },
        async asyncGetMenus(params) {
            const res = await CommonServices.getMenus(params);
            if (process.env.CURRENT_ENV === 'development') {
                this.setMenus(localMenus);
                return;
            }
            this.setMenus(res.result.menu);
        },
        // async asyncGetMenus() {
        //     this.setMenus(localMenus);
        // },
        async asyncGetcategorycode(params) {
            const res = await CommonServices.getcategorycode(params);
            this.setcategorycode(res.result);
            return res.result;
        },
        async asyncGetTypeMap(params) {
            const res = await CommonServices.getTypeMap(params);
            this.setTypeMap(res.result);
            return res.result;
        },
        async asyncGetCommonFlag(params) {
            const res = await CommonServices.getFlag(params);
            this.setCommonFlag(res.result);
            return res.result;
        },
        async downloadAttach(params) {
            const res = await CommonServices.downloadAttach(params);
            this.setAttachUrl(res.result);
            return res.result;
        },
        async asyncGetAreaInit() {
            const data = await CommonServices.getAreaInit();
            this.stateList(data.result);
            return data;
        },
        async asyncGetCity(params) {
            const data = await CommonServices.getCity(params);
            this.cityList(data.result);
            return data;
        },
        async asyncGetCounty(params) {
            const data = await CommonServices.getCounty(params);
            this.countyList(data.result);
            return data;
        },
        async asyncGetStreet(params) {
            const data = await CommonServices.getStreet(params);
            this.streetList(data.result);
            return data;
        },
        async asyncUpload(params) {
            const data = await CommonServices.upload(params);
            return data;
        },
        async asyncToggleOrg(params) {
            const data = await CommonServices.setOrg(params);
            return data;
        },
        async asyncGetOrg(params) {
            const data = await CommonServices.getOrg(params);
            this.setOrg(data.result);
            return data;
        },
        async asyncGetShopList(params) {
            const data = await CommonServices.getShopList(params);
            this.setShopList(data.result);
            return data;
        },
    },
};
