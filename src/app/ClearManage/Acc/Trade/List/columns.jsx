import React from 'react';

// eslint-disable-next-line arrow-body-style
export const columnsOptions = () => [
    {
        name: '序号',
        dataindex: 'index',
        width: 120,
    }, {
        name: '入账时间',
        dataindex: 'accountTime',
        width: 240,
    }, {
        name: '原业务订单号',
        dataindex: 'orderNum',
        width: 120,
    }, {
        name: '商户编号/客户号',
        dataindex: 'customerNum',
        width: 180,
    }, {
        name: '商户/客户名称',
        dataindex: 'customerName',
        width: 180,
    }, {
        name: '交易类型',
        dataindex: 'tradeTypeName',
        width: 120,
        render: (text, record) => {
            return <span>{`${record.tradeType}--${text}`}</span>;
        },
    }, {
        name: '业务名称',
        dataindex: 'businessName',
        width: 240,
        render: (text, record) => {
            return <span>{`${record.businessType}--${text}`}</span>;
        },
    }, {
        name: '订单金额',
        dataindex: 'orderMoney',
        width: 120,
    }, {
        name: '平台收入',
        dataindex: 'platformIncome',
        width: 120,
    }, {
        name: '税费',
        dataindex: 'taxMoney',
        width: 120,
    }, {
        name: '渠道手续费',
        dataindex: 'channelServiceMoney',
        width: 120,
    }, {
        name: '结算/入账金额',
        dataindex: 'settleMoney',
        width: 120,
    },
];
