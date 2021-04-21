export const searchOptionsCommon = (type) => {
    if (type === 'classStatus') {
        return [{
            id: 0,
            code: 0,
            name: '失效',
            description: '失效',
        }, {
            id: 1,
            code: 1,
            name: '有效',
            description: '有效',
        }];
    }
    if (type === 'classLevel') {
        return [{
            name: '一级科目',
            id: '1',
        }, {
            name: '二级科目',
            id: '2',
        }, {
            name: '三级科目',
            id: '3',
        }];
    }
    if (type === 'classType') {
        return [
            {
                id: '1',
                name: '资产类',
            }, {
                id: '2',
                name: '负债类',
            }, {
                id: '3',
                name: '损益类',
            }, {
                id: '4',
                name: '共同类',
            }, {
                id: '5',
                name: '所有者权益',
            }, {
                id: '6',
                name: '成本类',
            },
        ];
    }
    return [];
};
