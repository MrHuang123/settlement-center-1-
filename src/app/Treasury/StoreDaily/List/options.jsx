import React from 'react';
import { Link } from 'react-router-dom';

const reportStatusList = [
    { id: 0, name: '交款差额待处理' },
    { id: 1, name: '对账差额待处理' },
    { id: 2, name: '日报完成' },
];
const distinctStatusList = [
    { id: '01', name: '未处理' },
    { id: '02', name: '待审核' },
    { id: '03', name: '处理完成' },
    { id: '04', name: '已取消' },
    { id: '05', name: '审核拒绝待处理' },
];

export const columnsOptions = () => {
    return [
        {
            name: '操作',
            dataindex: 'id',
            width: 80,
            render: (id, item) => {
                const {
                    shopCode, reportDate, shopName, totalShouldRecieve,
                } = item;
                return (
                    <Link
                        to={{
                            pathname: '/treasury/storeDaily/detail',
                            state: {
                                shopCode,
                                reportDate,
                                shopName,
                                totalShouldRecieve,
                            },
                        }}
                    >
                        查看明细
                    </Link>
                );
            },
        },
        {
            name: '报表日期',
            dataindex: 'reportDate',
            width: 180,
        },
        {
            name: '门店',
            dataindex: 'shopName',
            width: 240,
        },
        {
            name: '应收营业额总额',
            dataindex: 'totalShouldRecieve',
            width: 180,
        },
        {
            name: '汇总差额',
            dataindex: 'totalBanlence',
            width: 180,
        },
        {
            name: '日报进度',
            dataindex: 'reportStatus',
            width: 180,
            render: (text) => {
                const reportStatus = reportStatusList.find((v) => { return v.id === text; }) || {};
                return reportStatus.name;
            },
        },
    ];
};

export const searchOptions = ({ shopList }) => {
    return [
        {
            selfname: '报表日期',
            selfid: 'reportDate',
            selftype: 'datepicker',
            selfDatePickerType: 'rangepicker',
            format: 'YYYY/MM/DD',
        },
        {
            selfname: '门店号',
            selfid: 'shopCode',
            selftype: 'searchSelect',
            selfOptions: shopList.map((item) => {
                return {
                    id: item.shopCode,
                    name: item.shopName,
                };
            }),
        },
        {
            selfname: '对账差错处理状态',
            selfid: 'distinctStatus',
            selftype: 'searchSelect',
            selfOptions: distinctStatusList,
        },
    ];
};
