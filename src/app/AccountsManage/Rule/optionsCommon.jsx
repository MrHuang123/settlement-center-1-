export const searchOptionsCommon = (type) => {
    if (type === 'ruleStatus') {
        return [{
            id: 0,
            name: '失效',
        }, {
            id: 1,
            name: '有效',
        }];
    }
    if (type === 'ruleLoanSide') {
        return [
            {
                id: 0,
                name: '借方',
            }, {
                id: 1,
                name: '贷方',
            },
        ];
    }
    return [];
};
