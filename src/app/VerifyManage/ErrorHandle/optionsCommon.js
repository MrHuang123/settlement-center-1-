/* eslint-disable */
export const optionsCommon = (type) => {
    if (type === 'errorType') {
        return [
            {
                id: '01',
                name: '长款',
            }, {
                id: '02',
                name: '短款',
            }
        ]
    } else if (type === 'nostroStatus') {
        return [
            {
                id: '01',
                name: '成功',
            }, {
                id: '02',
                name: '失败',
            }, {
                id: '03',
                name: '无',
            }
        ]
    }
}