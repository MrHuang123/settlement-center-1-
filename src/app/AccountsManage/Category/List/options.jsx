import { searchOptionsCommon } from '../optionsCommon';

export const searchOptions = () => {
    return [{
        selfname: '分类等级',
        selftype: 'searchSelect',
        selfid: 'classLevel',
        selfFieldOptions: {
            initialValue: '',
        },
        selfOptions: searchOptionsCommon('categoryLevel'),
    }, {
        selfname: '财务类编号',
        selftype: 'text',
        selfid: 'classNo',
        selfFieldOptions: {
            initialValue: '',
        },
    }];
};
