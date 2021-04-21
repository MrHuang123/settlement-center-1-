export const searchOptionsCommon = (type) => {
    if (type === 'categoryLevel') {
        return [
            {
                name: '账务类型',
                id: '01',
            }, {
                name: '交易类型',
                id: '02',
            }, {
                name: '业务名称',
                id: '03',
            },
        ];
    }
    return [];
};
