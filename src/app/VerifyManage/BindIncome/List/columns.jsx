/* eslint-disable  */
import { Link } from 'react-router-dom';
import React from 'react';
import { searchOptionsCommon } from '../New/commonOptions';

export const columnsOptions = (sysAllDictItems)=>[
    {
        name: '操作',
        dataindex: 'edit',
        render: (text, record) => {
            return (
                <div>
                    <Link to={`/verifymanage/bindincome/detail/${record.checkBatchNo}`}>查看明细</Link>
                </div>
            );
        },
    }, {
        name: '交易日期',
        dataindex: 'checkDate',
    }, {
        name: '合作机构名称',
        dataindex: 'businessBrchno',
        render: (text, record) => {
            let result = '';
            sysAllDictItems.business_brchno.forEach(element => {
                if (element.value === text) {
                    result = element.title;
                };
            });
            return (
                <span>{result}</span>
            );
        },
    }, {
        name: '合作业务',
        dataindex: 'cooperBusinessCode',
        render: (text, record) => {
            let result = '';
            sysAllDictItems.cooper_business_code.forEach(element => {
                if (element.value === text) {
                    result = element.title;
                };
            });
            return (
                <span>{result}</span>
            );
        },
    }, {
        name: '应结算金额',
        dataindex: 'settleMoney',
    }, {
        name: '绑定进账单金额',
        dataindex: 'bindMoney',
    }, {
        name: '进账单状态',
        dataindex: 'bindStatus',
        render:(text)=>{
            let result = '';
            searchOptionsCommon('bindStatus').forEach(element => {
                if (element.id === text) {
                    result = element.name;
                };
            });
            return (
                <span>{result}</span>
            );
        }
    },
];
