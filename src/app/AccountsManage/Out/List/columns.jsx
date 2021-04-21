/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';

export const columnsOptions = (sysAllDictItems, classAll) => {
    return [{
        name: '操作',
        dataindex: 'id',
        width: 150,
        render: (text,record) => {
            return (
                <div>
                    <span className="buttonStyle">
                        <Link to={`/accountsmanage/out/detail/${text}/${record.subjectNo}`}>查看</Link>
                    </span>
                </div>
            );
        },
    }, {
        name: '外部账户号',
        dataindex: 'outerAccountNo',
        width: 180,
    }, {
        name: '外部账户名称',
        dataindex: 'outerAccountName',
        width: 240,
    }, {
        name: '商户/客户名称',
        dataindex: 'custna',
        width: 300,
    }, {
        name: '商户/客户账号',
        dataindex: 'custno',
        width:180,
    }, {
        name: '对应科目号',
        dataindex: 'subjectNo',
    }, {
        name: '对应科目名称',
        dataindex: 'subjectName',
        width: 240,
        render: (text, record) => {
            let result = '';
            if (typeof classAll === 'object') {
                // eslint-disable-next-line no-restricted-syntax
                for (const value of classAll) {
                    if (value.subjectNo === record.subjectNo) {
                        result = value.subjectName;
                    }
                }
            }
            return (
                <span>{result}</span>
            );
        },
    }, {
        name: '账户状态',
        dataindex: 'outAccountStatus',
        render: (text, record) => {
            return (
                <span>{record.internalAccountStatus === 0 ? '失效' : '生效'}</span>
            );
        },
    }, {
        name: '帐户所属机构',
        dataindex: 'orgNo',
        render: (text) => {
            let result = '';
            sysAllDictItems.org_no.forEach(element => {
                if (element.value === text) {
                    result = element.title;
                };
            });
            return (
                <span>{result}</span>
            );
        },
    }, {
        name: '最后修改时间',
        dataindex: 'updateTime',
        width: 180,
        render: (text, record) => {
            return (
                <span>{record.updateTime ? record.updateTime : record.createTime}</span>
            );
        },
    }];
};
