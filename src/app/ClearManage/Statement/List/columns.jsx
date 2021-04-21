/* eslint-disable  */
import React from 'react';
import { Link } from 'react-router-dom';

export const columnsOptions = (classAllList) => {
    return [{
        name: '操作',
        dataindex: 'id',
        render: (text) => {
            return (
                <div>
                    <span className="buttonStyle">
                        <Link to={`/clearmanage/statement/detail/${text}`}>查看</Link>
                    </span>
                </div>
            );
        },
    }, {
        name: '序号',
        dataindex: 'index',
        render:(text)=>{
            return (<span>{text+1}</span>)
        }
    }, {
        name: '付款日期',
        dataindex: 'payDate',
        width: 180,
    }, {
        name: '结算周期',
        dataindex: 'settleBeginDate',
        width: 240,
        render:(text,record)=>{
            return (
                <div>
                    <span>{record.settleBeginDate+' ~ '+record.settleEndDate}</span>
                </div>
            )
        }
    }, {
        name: '账务类型',
        dataindex: 'billTypeName',
        width:240,
        render:(text,record)=>{
            return (<span>{record.billType+'-'+text}</span>)
        },
    }, {
        name: '交易类型',
        dataindex: 'tradeTypeName',
        width:240,
        render:(text,record)=>{
            return (<span>{record.tradeType+'-'+text}</span>)
        },
    }, {
        name: '业务名称',
        dataindex: 'busTypeName',
        width:240,
        render:(text,record)=>{
            return (<span>{record.busType+'-'+text}</span>)
        },
    }, {
        name: '商户号/客户编号',
        dataindex: 'customerCode',
        width: 180,
    }, {
        name: '商户/客户名称',
        dataindex: 'customerName',
        width: 180,
    }, {
        name: '结算笔数',
        dataindex: 'num',
    }, {
        name: '结算金额',
        dataindex: 'amount',
    }];
};
