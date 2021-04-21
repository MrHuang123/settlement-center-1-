/* eslint-disable */
import { Link } from 'react-router-dom';
import React from 'react';

// eslint-disable-next-line arrow-body-style
export const columnsOptions = (sysAllDictItems) => [
    {
        name: '序号',
        dataindex: 'index',
    }, {
        name: '商户号/客户编号',
        dataindex: 'customerCode',
        width: 180,
    }, {
        name: '商户名称/客户名称',
        dataindex: 'customerName',
        width: 180,
    }, {
        name: '付款日期',
        dataindex: 'payDate',
        width: 180,
    }, {
        name: '付款类型',
        dataindex: 'tradeTypeName',
        width: 240,
        render:(text,record)=>{
            return (<span>{record.tradeType+'-'+text}</span>)
        }
    }, {
        name: '付款业务',
        dataindex: 'busTypeName',
        width:240,
        render:(text,record)=>{
            return (<span>{record.busType+'-'+text}</span>)
        }
    }, {
        name: '付款机构名称',
        dataindex: 'payOrgName',
        width:300,
    }, {
        name: '付款总笔数',
        dataindex: 'num',
    }, {
        name: '付款总金额',
        dataindex: 'amount',
    }, {
        name: '打款文件下载次数',
        dataindex: 'fileDownCount',
        width: 180,
    }, {
        name: '付款状态',
        dataindex: 'payonlineState',
        render:(text)=>{
            let result;
            sysAllDictItems.payonline_state.forEach(element => {
                if(element.value==text){
                    result=element.title;
                }
            });
            return (<span>{result}</span>)
        }
    }, {
        name: '付款结束时间',
        dataindex: 'paySuccTime',
        width: 180,
    }, {
        name:'失败原因',
        dataindex:'failReason',
        width:240,
    }
];
