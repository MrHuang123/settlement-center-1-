/* eslint-disable */
import { Link } from 'react-router-dom';
import React from 'react';
// eslint-disable-next-line arrow-body-style
export const columnsOptions = (sysAllDictItems) => [
    {
        name: '序号',
        dataindex: 'number',
    }, {
        name: '付款日期',
        dataindex: 'payDate',
        width: 180,
    }, {
        name: '付款类型',
        dataindex: 'tradeType',
        width: 240,
    }, {
        name: '付款机构名称',
        dataindex: 'payOrgName',
    }, {
        name:'商户客户号',
        dataindex:'customerCode'
    }, {
        name:'商户客户名称',
        dataindex:'customerName',
        width:240,
    }, {
        name: '付款处理方式',
        dataindex: 'operButton',
    }, {
        name: '申请总笔数',
        dataindex: 'num',
    }, {
        name: '申请总金额',
        dataindex: 'amount',
    }, {
        name: '付款审核状态',
        dataindex: 'auditState',
    }
];
