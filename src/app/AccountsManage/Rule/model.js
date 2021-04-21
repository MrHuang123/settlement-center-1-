import Service from './Service';

export default {
    state: {
        classList: [],
        // classMap: {},
        subjectList: [],
    },
    reducers: {
        setClass(state, data) {
            return {
                ...state,
                classList: data.AccountingClass,
                // classMap: data.AccountingNameByNo,
            };
        },
        setSubjectList(state, data) {
            return {
                ...state,
                subjectList: data,
            };
        },
    },
    effects: {
        async asyncGetClassList(params) {
            const data = await Service.getClassList(params);
            if (data.success) {
                this.setClass(data.result);
            }
        },
        // async asyncGetRuleDetail(params) {

        // },
        async asyncGetAllSubject(params) {
            const data = await Service.getSubject(params);
            if (data.success) {
                this.setSubjectList(data.result);
            }
        },
    },
};
