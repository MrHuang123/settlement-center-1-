/* eslint-disable */
import { Link } from 'react-router-dom';
import React from 'react';

export const columnsOptions = (sysAllDictItems)=>[
    {
        name: '操作',
        dataindex: 'edit',
        render: (text, record) => {
            return (
                <div>
                    <Link to={`/verifywarn/warnrule/detail/${record.ruleId}`}>查看明细</Link>
                </div>
            );
        },
    }, {
        name: '告警规则ID',
        dataindex: 'alarmNum',
    }, {
        name: '账务所属机构',
        dataindex: 'accountBrchno',
        render: (text) => {
            let result = '';
            sysAllDictItems.org_no.forEach((element) => {
                if (element.value === text) {
                    result = element.title;
                }
            });
            return (<span>{result}</span>);
        },
    }, {
        name: '合作机构名称',
        dataindex: 'businessBrchno',
        render: (text) => {
            let result = '';
            sysAllDictItems.business_brchno.forEach((element) => {
                if (element.value === text) {
                    result = element.title;
                }
            });
            return (<span>{result}</span>);
        },
    }, {
        name: '合作业务',
        width: 180,
        dataindex: 'cooperBusinessCode',
        render: (text) => {
            let result = '';
            sysAllDictItems.cooper_business_code.forEach((element) => {
                if (element.value === text) {
                    result = element.title;
                }
            });
            return (<span>{result}</span>);
        },
    }, {
        name: '对账差错笔数阈值',
        dataindex: 'errorFileCount',
        width: 180,
    }, {
        name: '差错处理超账龄(d)',
        dataindex: 'errorBatchDays',
        width: 180,
    },
];
