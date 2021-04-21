import React from 'react';
import { Link } from 'react-router-dom';
import { Divider } from 'antd';

export const columnsOptions = (classAllList, ruleStatus) => {
    return [{
        name: '操作',
        dataindex: 'edit',
        width: 150,
        render: (text, record) => {
            return (
                <div>
                    <span className="buttonStyle">
                        <Link to={`/accountsmanage/rule/modify/${record.id}`}>修改</Link>
                        <Divider type="vertical" />
                        <Link to={`/accountsmanage/rule/detail/${record.id}`}>查看</Link>
                    </span>
                </div>
            );
        },
    }, {
        name: '账务类型',
        dataindex: 'classNoOne',
        width: 240,
        // render: (text, record) => {
        //     for (const i of classAllList) {
        //         if (i === record.classNoOne) {
        //             return <span>{`${i}-${classMap[i]}`}</span>;
        //         }
        //     }
        //     return <span />;
        // },
        render: (text) => {
            let result;
            classAllList.forEach((element) => {
                if ((element.classNo === text) && (element.classLevel === '01')) {
                    result = `${text}-${element.className}`;
                }
            });
            return (<span>{result}</span>);
        },
    }, {
        name: '交易类型',
        dataindex: 'classNoTwo',
        width: 300,
        // eslint-disable-next-line consistent-return
        // render: (text, record) => {
        //     for (const i in classMap) {
        //         if (i === record.classNoTwo) {
        //             return <span>{`${i}-${classMap[i]}`}</span>;
        //         }
        //     }
        // },
        render: (text) => {
            let result;
            classAllList.forEach((element) => {
                if ((element.classNo === text) && (element.classLevel === '02')) {
                    result = `${text}-${element.className}`;
                }
            });
            return (<span>{result}</span>);
        },
    }, {
        name: '业务名称',
        dataindex: 'classNoThree',
        width: 300,
        // eslint-disable-next-line consistent-return
        // render: (text, record) => {
        //     for (const i in classMap) {
        //         if (i === record.classNoThree) {
        //             return <span>{`${i}-${classMap[i]}`}</span>;
        //         }
        //     }
        // },
        render: (text) => {
            let result;
            classAllList.forEach((element) => {
                if ((element.classNo === text) && (element.classLevel === '03')) {
                    result = `${text}-${element.className}`;
                }
            });
            return (<span>{result}</span>);
        },
    }, {
        name: '借方数',
        dataindex: 'dcnt',
        width: 80,
    }, {
        name: '贷方数',
        dataindex: 'ccnt',
        width: 80,
    }, {
        name: '分录状态',
        dataindex: 'ruleStatus',
        // eslint-disable-next-line consistent-return
        render: (text, record) => {
            // eslint-disable-next-line no-restricted-syntax
            for (const i of ruleStatus) {
                if (i.id === record.ruleStatus) {
                    return <span>{i.name}</span>;
                }
            }
        },
    }, {
        name: '税',
        dataindex: 'tax',
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
