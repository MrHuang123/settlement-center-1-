export const columnsOptions = () => {
    return [
        {
            title: '序号',
            dataIndex: 'index',
            width: 80,
        }, {
            title: '支付类型',
            dataIndex: 'psname',
            width: 180,
        }, {
            title: '备用金',
            dataIndex: 'recieveAmount',
            width: 240,
        }, {
            title: '应收金额',
            dataIndex: 'shouldReceive',
            width: 180,
        }, {
            title: '交款金额',
            dataIndex: 'handedAmount',
            width: 180,
        }, {
            title: '串户处理金额',
            dataIndex: 'errorMoney',
            width: 180,
        }, {
            title: '补款处理金额',
            dataIndex: 'ownMoney',
            width: 180,
        }, {
            title: '拾遗处理金额',
            dataIndex: 'pickUpMoney',
            width: 180,
        }, {
            title: '差额',
            dataIndex: 'nowBalance',
            width: 180,
        },
    ];
};
