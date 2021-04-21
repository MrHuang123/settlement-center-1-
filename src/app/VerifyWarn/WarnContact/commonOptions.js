/* eslint-disable */
export const optionsCommon = (type) => {
    if (type === 'rule') {
        return [
            {
                id: '01',
                name: '对账差错笔数阈值',
            }, {
                id: '02',
                name: '差错处理账时帐龄（d）',
            }
        ]
    }
}