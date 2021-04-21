import React from 'react';
import { Link } from 'react-router-dom';
import { Divider } from 'antd';

export const columnsOptions = (levelAll) => {
    return [{
        name: '操作',
        dataindex: '',
        render: (text, record) => {
            return (
                <div>
                    <span className="buttonStyle">
                        <Link to={`/accountsmanage/category/modify/${record.classNo}/${record.classLevel}`}>修改</Link>
                        <Divider type="vertical" />
                        <Link to={`/accountsmanage/category/detail/${record.classNo}/${record.classLevel}`}>查看</Link>
                    </span>
                </div>
            );
        },
    }, {
        name: '类编号',
        dataindex: 'classNo',
    }, {
        name: '类名称',
        dataindex: 'className',
        width: 240,

    }, {
        name: '分类等级',
        dataindex: 'classLevel',
        render: (text) => {
            let result = '';
            // eslint-disable-next-line no-restricted-syntax
            for (const v of levelAll) {
                if (v.id === text) {
                    result = v.name;
                }
            }
            return (
                <span>{result}</span>
            );
        },
    }, {
        name: '排列序号',
        dataindex: 'sortNo',
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
