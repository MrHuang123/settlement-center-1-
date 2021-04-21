/* eslint-disable  */
import React from 'react';
export const companyType=[{
    id:'1',
    code:'1',
    name:'对私',
    description:'对私'
},{
    id:'0',
    code:'0',
    name:'对公',
    description:'对公'
}]
export const columnsOptions = (sysAllDictItems) => [
    {
        name: '序号',
        dataindex: 'index',
        width: 80,
    }, {
        name: '备用金账户号',
        dataindex: 'virtAccount',
        width: 180,
    }, {
        name: '备用金账户名称',
        dataindex: 'acountName',
        width: 120,
    }, {
        name: '单笔限额',
        dataindex: 'amountLimit',
    }, {
        name: '在用笔数限额',
        dataindex: 'numLimit',
    }, {
        name: '最后修改时间',
        dataindex: 'updateTime',
        width: 240,
    }
];
