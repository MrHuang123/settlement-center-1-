import { Link } from 'react-router-dom';
import React from 'react';

export const columnsOptions = [
    {
        name: '操作',
        dataindex: 'edit',
        render: (text, record) => {
            return (
                <div>
                    <Link to={`/accountquery/inout/detail/${record.inOutId}`}>查看</Link>
                </div>
            );
        },
    }, {
        name: '序号',
        dataindex: 'number',
        width: 80,
    }, {
        name: '记账日期',
        dataindex: 'recordDay',
    }, {
        name: '系统日期',
        dataindex: 'systemDay',
    }, {
        name: '系统时间',
        dataindex: 'systemHMS',
    }, {
        name: '帐户号',
        dataindex: 'accountNum',
        width: 180,
    }, {
        name: '帐户类型',
        dataindex: 'accountTypeName',
        width: 180,
    }, {
        name: '帐户名称',
        dataindex: 'accountName',
        width: 300,
    }, {
        name: '账务类型',
        dataindex: 'billType',
        width: 300,
    }, {
        name: '交易类型',
        dataindex: 'tradeType',
        width: 300,
    }, {
        name: '业务名称',
        dataindex: 'businessType',
        width: 300,
    }, {
        name: '资金种类',
        dataindex: 'moneyType',
    }, {
        name: '贷方发生额',
        dataindex: 'inMoney',
    }, {
        name: '借方发生额',
        dataindex: 'outMoney',
    }, {
        name: '当前余额',
        dataindex: 'currentBalance',
    },
];
