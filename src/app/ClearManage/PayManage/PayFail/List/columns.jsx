/* eslint-disable */
import React from 'react';

// eslint-disable-next-line arrow-body-style
export const columnsOptions = (sysAllDictItems) => [
    {
        name: '序号',
        dataindex: 'indexNum',
    }, {
        name: '付款日期',
        dataindex: 'payDate',
        width: 180,
    }, {
        name: '商户/客户号',
        dataindex: 'customerCode',
        width: 180,
    }, {
        name: '商户名称',
        dataindex: 'customerName',
        width: 240,
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
        name: '申请总笔数',
        dataindex: 'num',
    }, {
        name: '申请总金额',
        dataindex: 'amount',
    }, {
        name: '付款状态',
        dataindex: 'paymentState',
    }, {
        name: '失败原因',
        dataindex: 'failReason',
        width: 240,
    }
];
