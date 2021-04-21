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
        name: '用户账户',
        dataindex: 'userAccount',
        width: 180,
    }, {
        name: '用户名称',
        dataindex: 'userName',
        width: 120,
    }, {
        name: '备用金账户名称',
        dataindex: 'acountName',
    }, {
        name: '在用金额',
        dataindex: 'inuseAmount',
    }, {
        name: '在用笔数',
        dataindex: 'inuseNum',
    }, {
        name: '历史累计金额',
        dataindex: 'sumAmount',
    }, {
        name: '历史累计笔数',
        dataindex: 'sumNum',
    }
];
