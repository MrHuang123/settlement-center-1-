/* eslint-disable  */
export const tradeTypeList=[
    {
        id:'01',
        name:'支付',
    }, {
        id:'02',
        name:'还款',
    }, {
        id:'03',
        name:'账户提额',
    }, {
        id:'04',
        name:'帐户降额',
    }
];
export const columnsOptions = () => [
    {
        name: '序号',
        dataindex: 'index',
        width: 80,
    }, {
        name: '账户收支流水号',
        dataindex: 'cashFlowno',
        width: 240,
    }, {
        name: '系统日期',
        dataindex: 'creatTime',
        width: 240,
    }, {
        name: '备用金账户号',
        dataindex: 'virtAccount',
    }, {
        name: '备用金账户名称',
        dataindex: 'acountName',
    }, {
        name: '交易类型',
        dataindex: 'tradeType',
        render:(text)=>{
            let result='';
            tradeTypeList.forEach(item=>{
                if(item.id==text){
                    result=item.name;
                }
            });
            return result;
        },
    }, {
        name: '发生额',
        dataindex: 'tradeMoney',
    }, {
        name: '业务订单号',
        dataindex: 'tradeNo',
        width: 240,
    }, {
        name: '支付流水号',
        dataindex: 'payNo',
        width: 240,
    }, {
        name: '用户帐号',
        dataindex: 'userAccount',
    }, {
        name: '用户名称',
        dataindex: 'userName',
        width: 180,
    }
];
