import React from 'react';

export const columnsOptions = (payType) => {
    return [
        {
            name: '序号',
            dataindex: 'index',
            width: 80,
        }, {
            name: '销售日期',
            dataindex: 'saleDate',
            width: 180,
        }, {
            name: '支付方式',
            dataindex: 'psid',
            width: 240,
            render: (text) => {
                let result = '';
                payType.forEach((element) => {
                    if (element.id === text) {
                        result = element.name;
                    }
                });
                return <span>{result}</span>;
            },
        }, {
            name: '交款金额',
            dataindex: 'nowPayment',
            width: 180,
        }, {
            name: '门店',
            dataindex: 'shopName',
            width: 180,
        }, {
            name: '收银员',
            dataindex: 'cashierName',
            width: 180,
        }, {
            name: '交款时间',
            dataindex: 'createTime',
            width: 240,
        },
    ];
};
