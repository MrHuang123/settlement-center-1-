/* eslint-disable */
import { Link } from 'react-router-dom';
import React from 'react';
import { optionsCommon } from '../../ErrorHandle/optionsCommon';

// eslint-disable-next-line arrow-body-style
export const columnsOptions = (sysAllDictItems) => [
    {
        name: '操作',
        dataindex: 'edit',
        render: (text, record) => {
            return (
                <div>
                    <Link to={`/verifymanage/handleverify/detail/${record.operateId}`}>查看详情</Link>
                </div>
            );
        },
    }, {
        name: '差错流水号',
        dataindex: 'errorSequenceNum',
        width: 180,
    }, {
        name: '审核状态',
        dataindex: 'checkStatus',
        render: (text)=>{
            let result = '';
            sysAllDictItems.check_status.forEach((element) => {
                if (element.value === text) {
                    result = element.title;
                }
            });
            return (<span>{result}</span>);
        }
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
            return (<span>{result}</span>);
        },
    }, {
        name: '账务所属机构',
        dataindex: 'orgNoName',
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
        width: 180,
    }, {
        name: '差错处理方式',
        dataindex: 'errorOperateType',
        render: (text) => {
            let result = '';
            sysAllDictItems.error_operate_type.forEach((element) => {
                if (element.value === text) {
                    result = element.title;
                }
            });
            return (<span>{result}</span>);
        },
    }, {
        name: '审核人',
        dataindex: 'checkBy',
        width: 180,
    }, {
        name: '审核时间',
        dataindex: 'checkTime',
        width: 180,
    },
];
