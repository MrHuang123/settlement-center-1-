export const searchOptions = (options) => {
    return [{
        selfname: '科目号',
        selfid: 'subjectNo',
        selftype: 'text',
        selfFieldOptions: {
            initialValue: '',
        },
    }, {
        selfname: '科目级别',
        selfid: 'subjectLevel',
        selftype: 'searchSelect',
        selfFieldOptions: {
            initialValue: '',
        },
        selfMaps: { id: ['code', 'id'], name: 'description' },
        selfHasAll: true,
        selfOptions: options.subjectLevelEnum,
    }];
};
