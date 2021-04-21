import { searchOptionsCommon } from '../optionsCommon';

export const searchOptions = (classAll) => {
    return [{
        selfname: '内部账户号',
        selftype: 'text',
        selfid: 'internalAccountNo',
        selfFieldOptions: {
            initialValue: '',
        },
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
        selfid: 'internalAccountStatus',
        selfFieldOptions: {
            initialValue: '',
        },
        selfHasAll: true,
        selfOptions: searchOptionsCommon('innerStatus'),
    }];
};
