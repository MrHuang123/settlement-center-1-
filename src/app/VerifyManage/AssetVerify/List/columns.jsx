/* eslint-disable */
import { Link } from 'react-router-dom';
import React from 'react';
export const columnsOptions = (sysAllDictItems)=>[
    {
        name: '资损信息编号',
        dataindex: 'capitalLossNum',
        width: 180,
    }, {
        name: '资损金额',
        dataindex: 'capitalLossMoney',
    }, {
        name: '处理方式',
        dataindex: 'capitalLossOperateType',
        render:(text)=>{
            let result = '';
            sysAllDictItems.capital_loss_operate_type.forEach(element => {
                if (element.value === text) {
                    result = element.title;
                };
            });
            return (
                <span>{result}</span>
            );
        }
    }, {
        name: '审核状态',
        dataindex: 'checkStatus',
        render:(text)=>{
            let result = '';
            sysAllDictItems.check_status.forEach(element => {
                if (element.value === text) {
                    result = element.title;
                };
            });
            return (
                <span>{result}</span>
            );
        },
    }, {
        name: '原支付订单号',
        dataindex: 'originalOrderNum',
    }, {
        name: '对账差错流水号',
        dataindex: 'errorSequenceNum',
        width: 180,
    }, {
        name: '审核人',
        dataindex: 'checkBy',
    }, {
        name: '审核时间',
        dataindex: 'checkTime',
        width: 180,
    },
];
