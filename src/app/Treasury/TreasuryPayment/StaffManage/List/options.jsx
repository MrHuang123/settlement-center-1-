import React from 'react';

export const columnsOptions = ({ setVisible, setType }) => {
    return [
        {
            name: '操作',
            dataindex: 'index',
            width: 80,
            render: (text, item) => {
                return <a onClick={() => {
                    setVisible(true);
                    setType({ employeeId: item.employeeId, id: item.id });
                }}
                >修改</a>;
            },
        }, {
            name: '收银员姓名',
            dataindex: 'employeeName',
        }, {
            name: '收银员工号',
            dataindex: 'jobNo',
        }, {
            name: '职位名称',
            dataindex: 'positionName',
        }, {
            name: '所属部门',
            dataindex: 'deptName',
        }, {
            name: '所属门店',
            dataindex: 'shopName',
        }, {
            name: '门店编号',
            dataindex: 'shopCode',
        }, {
            name: '生效标志',
            dataindex: 'status',
            render: (text) => { return text === 1 ? '有效' : '无效'; },
        }, {
            name: '更新时间',
            dataindex: 'updateTime',
            width: 180,
        },
    ];
};

export const searchOptions = ({ shopList, onShopChange, employees }) => {
    return [
        {
            selfname: '所属门店',
            selfid: 'shopCode',
            selftype: 'searchSelect',
            selfOptions: shopList.map((item) => {
                return {
                    id: item.shopCode,
                    name: item.shopName,
                };
            }),
            onChange: onShopChange,
        }, {
            selfname: '收银员',
            selfid: 'jobNo',
            selftype: 'searchSelect',
            selfOptions: employees.map((item) => {
                return {
                    id: item.jobNo,
                    name: item.employeeName,
                };
            }),
        },
    ];
};
