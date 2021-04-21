/* eslint-disable */
import { Link } from 'react-router-dom';
import React from 'react';

export const columnsOptions = (sysAllDictItems)=> [
    {
        name: '操作',
        dataindex: 'edit',
        render: (text, record) => {
            return (
                <div>
                    <Link to={`/verifymanage/gatherresult/detail/${record.checkBatchNo}`}>查看</Link>
                </div>
            );
        },
    }, {
        name: '序号',
        dataindex: 'number',
    }, {
        name: '对账批次号',
        dataindex: 'checkBatchNo',
        width:180,
    }, {
        name: '交易日期',
        dataindex: 'origiTrandt',
    }, {
        name: '账务所属机构',
        dataindex: 'accountBrchno',
        render:(text)=>{
            let result = '';
            sysAllDictItems.org_no.forEach(element => {
                if (element.value === text) {
                    result = element.title;
                };
            });
            return (
                <span>{result}</span>
            )
        },
    }, {
        name: '合作机构名称',
        dataindex: 'businessBrchno',
        render:(text)=>{
            let result = '';
            sysAllDictItems.business_brchno.forEach(element => {
                if (element.value === text) {
                    result = element.title;
                };
            });
            return (
                <span>{result}</span>
            )
        },
    }, {
        name: '合作业务',
        width: 180,
        dataindex: 'cooperBusinessCode',
        render:(text,record)=>{
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
        name: '我方对账文件总笔数',
        dataindex: 'nostroNum',
        width: 180,
    }, {
        name: '对方对账文件总笔数',
        dataindex: 'reciprNum',
        width: 180,
    }, {
        name: '平账笔数',
        dataindex: 'balanceNum',
    }, {
        name: '差错笔数',
        dataindex: 'errorNum',
        width: 180,
    }, {
        name: '挂起笔数',
        dataindex: 'breakNum',
        width: 180,
    },
];
