import { message } from 'antd';
import Service from './Service';

export default {
    state: {
        list: [],
        searchData: {},
        page: {},
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
                list: data.records,
                page: {
                    current: data.current,
                    pages: data.pages,
                    size: data.size,
                    total: data.total,
                },
            };
        },
        setEmployees(state, data) {
            return {
                ...state,
                employees: data,
            };
        },
        setShopEmployees(state, data) {
            return {
                ...state,
                shopEmployees: data,
            };
        },
        clearData(state) {
            return {
                ...state,
                list: [],
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
        async asyncGetEmployees(params) {
            const data = await Service.getEmployees(params);
            if (data.success) {
                this.setEmployees(data.result);
            }
        },
        async asyncSaveShopConfig(params) {
            const data = await Service.saveShopConfig(params);
            if (data.success) {
                message.success('操作成功');
            }
        },
        async asyncGetShopEmployees(params) {
            const data = await Service.getShopEmployees(params);
            if (data.success) {
                this.setShopEmployees(data.result.records);
            }
        },
    },
};
