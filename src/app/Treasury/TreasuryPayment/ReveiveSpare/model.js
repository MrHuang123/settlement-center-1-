import { message } from 'antd';
import Service from './Service';

export default {
    state: {
        list: [],
        searchData: {},
        employees: [],
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
        clearData(state) {
            return {
                ...state,
                list: [],
            };
        },
        setEmployees(state, data) {
            return {
                ...state,
                employees: data,
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
        async asyncAdd(params) {
            const data = await Service.add(params);
            if (data.success) {
                message.success('领取成功');
            }
        },
    },
};
