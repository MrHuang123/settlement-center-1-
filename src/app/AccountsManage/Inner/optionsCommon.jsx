export const searchOptionsCommon = (type) => {
    if (type === 'innerStatus') {
        return [{
            id: 0,
            name: '失效',
        }, {
            id: 1,
            name: '有效',
        }];
    }
    if (type === 'innerOver') {
        return [{
            id: 0,
            name: '不允许透支',
        }, {
            id: 1,
            name: '允许透支',
        }];
    }
    return [];
};
