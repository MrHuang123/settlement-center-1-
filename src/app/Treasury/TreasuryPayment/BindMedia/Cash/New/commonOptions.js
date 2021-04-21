export const searchOptionsCommon = (type) => {
    if (type === 'billType') {
        return [{
            id: '1',
            name: '现金存款单',
        }];
    // eslint-disable-next-line no-else-return
    } else if (type === 'bindStatus') {
        return [{
            id: '1',
            name: '待绑定',
        }, {
            id: '2',
            name: '进账单金额不足',
        }, {
            id: '3',
            name: '审核中',
        }, {
            id: '4',
            name: '审核完成',
        }];
    } else if (type === 'bindState') {
        return [{
            id: '1',
            name: '待审核',
        }, {
            id: '2',
            name: '审核拒绝',
        }, {
            id: '3',
            name: '审核通过',
        }];
    }
    return [];
};
