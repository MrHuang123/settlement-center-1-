import React from 'react';
import { Link } from 'react-router-dom';
import { Divider } from 'antd';

export const columnsOptions = (classEnum, sysAllDictItems) => {
    return [
        {
            name: '操作',
            dataindex: 'edit',
            render: (text, record) => {
                return (
                    <div>
                        <Link to={`/accountsmanage/class/new/${record.subjectNo}`}>修改</Link>
                        <Divider type="vertical" />
                        <Link to={`/accountsmanage/class/detail/${record.subjectNo}`}>查看</Link>
                    </div>
                );
            },
        }, {
            name: '科目号',
            dataindex: 'subjectNo',
            width: 180,
        }, {
            name: '科目名称',
            dataindex: 'subjectName',
            width: 300,
        }, {
            name: '科目级别',
            dataindex: 'subjectLevel',
            render: (text, record) => {
                let result = '';
                if (typeof classEnum === 'object') {
                    // eslint-disable-next-line no-restricted-syntax
                    for (const value of classEnum.subjectLevelEnum) {
                        if (value.code === record.subjectLevel) {
                            result = value.description;
                        }
                    }
                }
                return (
                    <span>{result}</span>
                );
            },
        }, {
            name: '上级科目',
            dataindex: 'parentSubjectNo',
        }, {
            name: '科目类别',
            dataindex: 'subjectType',
            render: (text, record) => {
                let result = '';
                if (typeof classEnum === 'object') {
                    // eslint-disable-next-line no-restricted-syntax
                    for (const value of classEnum.subjectCategoryEnum) {
                        if (value.code === record.subjectType) {
                            result = value.description;
                        }
                    }
                }
                return (
                    <span>{result}</span>
                );
            },
        }, {
            name: '科目状态',
            dataindex: 'subjectStatus',
            render: (text, record) => {
                return (
                    <span>{record.subjectStatus === 0 ? '失效' : '生效'}</span>
                );
            },
        }, {
            name: '余额方向',
            dataindex: 'balanceDirection',
            render: (text) => {
                let result = '';
                sysAllDictItems.balance_direction.forEach((element) => {
                    // eslint-disable-next-line eqeqeq
                    if (element.value == text) {
                        result = element.title;
                    }
                });
                return (
                    <span>{result}</span>
                );
            },
        }, {
            name: '损益结转标识',
            dataindex: 'profitLossFlag',
            render: (text) => {
                let result = '';
                sysAllDictItems.profit_loss_flag.forEach((element) => {
                    // eslint-disable-next-line eqeqeq
                    if (element.value == text) {
                        result = element.title;
                    }
                });
                return (
                    <span>{result}</span>
                );
            },
        }, {
            name: '最后修改时间',
            width: 180,
            dataindex: 'updateTime',
            render: (text, record) => {
                return (
                    <span>{record.updateTime ? record.updateTime : record.createTime}</span>
                );
            },
        },
    ];
};
