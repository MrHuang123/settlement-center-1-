import React from 'react';
import { Link } from 'react-router-dom';
import { Divider } from 'antd';

export const columnsOptions = (classAll) => {
    return [{
        name: '操作',
        dataindex: 'edit',
        width: 150,
        render: (text, record) => {
            return (
                <div>
                    <span className="buttonStyle">
                        <Link to={`/accountsmanage/inner/new/${record.internalAccountNo}`}>修改</Link>
                        <Divider type="vertical" />
                        <Link to={`/accountsmanage/inner/detail/${record.internalAccountNo}`}>查看</Link>
                    </span>
                </div>
            );
        },
    }, {
        name: '内部账户号',
        dataindex: 'internalAccountNo',
        width: 180,
    }, {
        name: '内部账户名称',
        dataindex: 'internalAccountName',
        width: 300,
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
        dataindex: 'internalAccountStatus',
        render: (text, record) => {
            return (
                <span>{record.internalAccountStatus === 0 ? '失效' : '生效'}</span>
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
