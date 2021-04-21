import React from 'react';
import { optionsCommon } from '../optionsCommon';

export const columnsOptions = (sysAllDictItems) => {
    return [
        {
            name: '操作',
            dataindex: 'edit',
            render: (text, record) => {
                return (
                    <span
                        style={{
                            color: 'blue',
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            window.open(`/treasury/thirdverify/errorhandle/detail/${record.errorId}`);
                        }}
                    >查看明细</span>
                );
            },
        }, {
            name: '差错流水号',
            dataindex: 'errorSequenceNum',
            width: 180,
        }, {
            name: '差错日期',
            dataindex: 'errorTime',
            width: 180,
        }, {
            name: '交易类型',
            dataindex: 'tradeType',
            render: (text) => {
                let result = '';
                sysAllDictItems.trade_type.forEach((element) => {
                    if (element.value === text) {
                        result = element.text;
                    }
                });
                return (
                    <span>{result}</span>
                );
            },
        }, {
            name: '合作业务',
            dataindex: 'cooperBusinessCode',
            width: 180,
            render: (text) => {
                let result = '';
                sysAllDictItems.cooper_business_code.forEach((element) => {
                    if (element.value === text) {
                        result = element.text;
                    }
                });
                return (
                    <span>{result}</span>
                );
            },
        }, {
            name: '合作机构名称',
            dataindex: 'businessBrchno',
            render: (text) => {
                let result = '';
                sysAllDictItems.business_brchno.forEach((element) => {
                    if (element.value === text) {
                        result = element.text;
                    }
                });
                return (
                    <span>{result}</span>
                );
            },
        }, {
            name: '差错类型',
            dataindex: 'errorType',
            render: (text) => {
                let result = '';
                optionsCommon('errorType').forEach((element) => {
                    if (element.id === text) {
                        result = element.name;
                    }
                });
                return (
                    <span>{result}</span>
                );
            },
        }, {
            name: '我方金额',
            dataindex: 'nostroMoney',
        }, {
            name: '对方金额',
            dataindex: 'reciprMoney',
        }, {
            name: '原交易订单号',
            dataindex: 'origiOrderNum',
            width: 240,
        }, {
            name: '门店号',
            dataindex: 'shopId',
        },
    ];
};
