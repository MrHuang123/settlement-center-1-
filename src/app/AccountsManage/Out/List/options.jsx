import { searchOptionsCommon } from '../optionsCommon';

export const searchOptions = (classAll) => {
    return [{
        selfname: '外部账户号',
        selftype: 'text',
        selfid: 'outerAccountNo',
    }, {
        selfname: '对应科目号',
        selftype: 'searchSelect',
        selfid: 'subjectNo',
        selfOptions: classAll,
        selfMaps: {
            id: ['subjectNo'],
            name: 'subjectNo',
        },
        selfFieldOptions: {
            initialValue: '',
        },
    }, {
        selfname: '账户状态',
        selftype: 'searchSelect',
        selfid: 'outAccountStatus',
        selfFieldOptions: {
            initialValue: '',
        },
        selfHasAll: true,
        selfOptions: searchOptionsCommon('innerStatus'),
    }, {
        selfname: '商户/客户账号',
        selftype: 'text',
        selfid: 'custno',
    }];
};
