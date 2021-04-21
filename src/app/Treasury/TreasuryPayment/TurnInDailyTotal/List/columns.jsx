import React from 'react';

export const columnsOptions = () => {
    return [
        {
            name: '操作',
            dataindex: 'id',
            width: 80,
            render: (text, rc) => {
                return <React.Fragment>
                    <span
                        style={{ color: 'blue', cursor: 'pointer' }}
                        onClick={() => {
                            window.open(`/treasury/payment/staffdailytotal/detail/${rc.saleDate}/${rc.shopCode}/${rc.cashierCode}`);
                        }}
                    >查看明细</span>
                </React.Fragment>;
            },
        }, {
            name: '销售日期',
            dataindex: 'saleDate',
            width: 180,
        }, {
            name: '收银员',
            dataindex: 'cashierName',
            width: 240,
        }, {
            name: '门店',
            dataindex: 'shopName',
            width: 180,
        }, {
            name: '备用金',
            dataindex: 'recieveAmount',
            width: 180,
        }, {
            name: '应收金额',
            dataindex: 'totalShouldReceive',
            width: 180,
        }, {
            name: '已交金额',
            dataindex: 'totalHandedAmount',
            width: 180,
        }, {
            name: '差额',
            dataindex: 'totalBalanceAmount',
            width: 120,
        }, {
            name: '最后交款时间',
            dataindex: 'lastDeliveryTime',
            width: 240,
        },
    ];
};
