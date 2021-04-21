/* eslint-disable  */
import { Link } from 'react-router-dom';
import React from 'react';

export const columnsOptions = (sysAllDictItems)=>[
    {
        name: '操作',
        dataindex: 'edit',
        render: (text, record) => {
            return (
                <div>
                    <Link to={`/verifymanage/asset/detail/${record.id}`}>查看明细</Link>
                </div>
            );
        },
    }, {
        name: '资损流水编号',
        dataindex: 'capitalLossNum',
        width: 180,
    }, {
        name: '资损金额',
        dataindex: 'capitalLossMoney',
    }, {
        name: '资损处理状态',
        dataindex: 'capitalLossStatus',
        render:(text)=>{
            let result = '';
            sysAllDictItems.capital_loss_status.forEach(element => {
                if (element.value === text) {
                    result = element.title;
                };
            });
            return (
                <span>{result}</span>
            );
        }
    }, {
        name: '账务所属机构',
        width: 180,
        dataindex: 'orgNo',
        render:(text)=>{
            let result = '';
            sysAllDictItems.org_no.forEach(element => {
                if (element.value === text) {
                    result = element.title;
                };
            });
            return (
                <span>{result}</span>
            );
        }
    }, {
        name: '原支付订单号',
        dataindex: 'originalOrderNum',
    }, {
        name: '对账差错流水号',
        dataindex: 'errorSequenceNum',
        width:180,
    }, {
        name: '资损创建时间',
        dataindex: 'capitalLossTime',
        width: 180,
    },
];
