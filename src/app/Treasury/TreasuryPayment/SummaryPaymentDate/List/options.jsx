import React from 'react';
import { Link } from 'react-router-dom';

export const columnsOptions = () => {
    return [
        {
            name: '操作',
            dataindex: 'id',
            width: 80,
            render: (id, item) => {
                return <Link to={
                    {
                        pathname: '/treasury/summaryPaymentDate/detail',
                        state: { ...item },
                    }
                }
                >查看明细</Link>;
            },
        }, {
            name: '销售日期',
            dataindex: 'saleDate',
            width: 180,
        }, {
            name: '门店',
            dataindex: 'shopName',
            width: 240,
        }, {
            name: '备用金',
            dataindex: 'shopRecieveAmount',
            width: 180,
        }, {
            name: '应收金额',
            dataindex: 'shopShouldRecieve',
            width: 180,
        }, {
            name: '已交金额',
            dataindex: 'shopHandedAmount',
            width: 180,
        }, {
            name: '差额',
            dataindex: 'shopBalenceAmount',
            width: 180,
        },
    ];
};

export const searchOptions = ({ shopList }) => {
    return [
        {
            selfname: '销售日期',
            selfid: 'saleDate',
            selftype: 'datepicker',
            selfDatePickerType: 'rangepicker',
            format: 'YYYY/MM/DD',
        }, {
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
    ];
};
