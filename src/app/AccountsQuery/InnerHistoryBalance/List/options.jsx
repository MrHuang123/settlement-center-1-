export const searchOptions = (options) => {
    return [
        {
            selfname: '内部账户号',
            selfid: 'accountNum',
            selftype: 'text',
        }, {
            selfname: '科目号',
            selfid: 'subjectNum',
            selftype: 'text',
        }, {
            selfname: '科目级别',
            selfid: 'subjectLevel',
            selftype: 'searchSelect',
            selfOptions: options.subjectLevelEnum,
            selfMaps: {
                id: ['code'],
                name: ['description'],
            },
            selfHasAll: {
                value: '',
                text: '全部',
            },
            selfFieldOptions: {
                initialValue: '',
            },
        },
    ];
};
