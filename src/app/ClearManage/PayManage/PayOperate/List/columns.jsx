/* eslint-disable */
import React from 'react';

// eslint-disable-next-line arrow-body-style
export const columnsOptions = (sysAllDictItems,classAllList) => [
    {
        name: '序号',
        dataindex: 'index',
        render:(text)=>{
            return (<span>{text+1}</span>)
        },
    }, {
        name: '付款日期',
        dataindex: 'payDate',
        width: 180,
    }, {
        name: '商户/客户编号',
        dataindex: 'customerCode',
        width: 180,
    }, {
        name: '商户/客户名称',
        dataindex: 'customerName',
        width: 240,
    }, {
        name: '付款类型',
        dataindex: 'tradeTypeName',
        width: 240,
    }, {
        name: '付款业务',
        dataindex: 'busTypeName',
        width: 240,
    }, {
        name: '付款机构名称',
        dataindex: 'payOrgName',
    }, {
        name: '申请总笔数',
        dataindex: 'num',
    }, {
        name: '申请总金额',
        dataindex: 'amount',
    }, {
        name: '付款操作状态',
        dataindex: 'operState',
        render:(text)=>{
            let result;
            sysAllDictItems.payment_order_oper_status.forEach(element => {
                if(element.value==text){
                    result=element.title;
                }
            });
            return (<span>{result}</span>)
        }
    }, {
        name:'审核状态',
        dataindex:'auditState',
        render:(text)=>{
            let result;
            sysAllDictItems.payment_order_audit_status.forEach(element => {
                if(element.value==text){
                    result=element.title;
                }
            });
            return (<span>{result}</span>)
        }
    }
];
