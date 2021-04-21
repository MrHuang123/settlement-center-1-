/* eslint-disable  */
import React from 'react';
export const payState = [{
    id:'1',
    name:'待付款',
},{
    id:'2',
    name:'付款完成',
}];
export const columnsOptions = (sysAllDictItems) => [
    {
        name: '序号',
        dataindex: 'index',
        width: 80,
    }, {
        name: '代付批次号',
        dataindex: 'batchId',
        width: 180,
    }, {
        name: '付款开户行',
        dataindex: 'payOpenAccount',
        width: 300,
    }, {
        name: '付款账号/卡号',
        dataindex: 'payAccount',
        width: 240,
    }, {
        name: '付款账户名称',
        dataindex: 'payAccountName',
        width: 240,
    }, {
        name: '收款开户行名称',
        dataindex: 'receiveBankName',
        width: 300,
    }, {
        name: '收款账户账号',
        dataindex: 'receiveAccount',
        width: 150,
    }, {
        name: '收款账户名称',
        dataindex: 'receiveAccountName',
        width: 240,
    }, {
        name: '涉及打款笔数',
        dataindex: 'num',
        width: 120,
    }, {
        name: '手续费总金额',
        dataindex: 'poundageAmount',
        width: 180,
    }, {
        name: '应付银联总金额',
        dataindex: 'amount',
        width: 180,
    }, {
        name: '打款文件下载次数',
        dataindex: 'fileDownCount',
        width: 180,
    }, {
        name: '打款状态',
        dataindex: 'payState',
        width: 120,
        render:(text)=>{
            let result='';
            payState.forEach(item=>{
                if(item.id==text){
                    result=item.name;
                }
            });
            return <span>{result}</span>
        }
    }, {
        name: '打款完成时间',
        dataindex: 'payDate',
        width: 240,
    },
];
