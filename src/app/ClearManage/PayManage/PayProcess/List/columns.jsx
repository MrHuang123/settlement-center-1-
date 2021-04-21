/* eslint-disable */
import React from 'react';

// eslint-disable-next-line arrow-body-style
export const columnsOptions = (sysAllDictItems) => [
    {
        name: '序号',
        dataindex: 'indexNum',
    }, {
        name: '商户号/客户编号',
        dataindex: 'customerCode',
    }, {
        name: '商户名称/客户名称',
        dataindex: 'customerName',
        width: 180,
    }, {
        name: '付款日期',
        dataindex: 'payDate',
    }, {
        name: '付款类型',
        dataindex: 'tradeType',
        width: 180,
    }, {
        name: '付款业务',
        dataindex: 'busType',
        width: 240,
    }, {
        name: '付款机构名称',
        dataindex: 'payOrgName',
    }, {
        name: '付款总笔数',
        dataindex: 'num',
    }, {
        name: '付款总金额',
        dataindex: 'amount',
    }, {
        name: '付款操作状态',
        dataindex: 'operState',
    }, {
        name: '审核状态',
        dataindex: 'auditState',
    }, {
        name: '付款状态',
        dataindex: 'paymentState',
    }
];
