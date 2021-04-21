import React from 'react';

export const columnsOptions = () => {
    return [
        {
            name: '操作',
            dataindex: 'index',
            width: 80,
            render: (text, rc) => {
                return <React.Fragment>
                    <span
                        style={{ cursor: 'pointer', color: 'blue' }}
                        onClick={() => {
                            window.open(`/treasury/payment/differencemanage/detail/${rc.id}`);
                        }}
                    >
                        查看明细
                    </span>
                </React.Fragment>;
            },
        }, {
            name: '差额处理流水号',
            dataindex: 'serialNumber',
            width: 240,
        }, {
            name: '门店',
            dataindex: 'shopInfo',
            width: 240,
        }, {
            name: '收银员',
            dataindex: 'cashierInfo',
            width: 240,
        }, {
            name: '差额',
            dataindex: 'differenceMoney',
            width: 180,
        }, {
            name: '差额原因',
            dataindex: 'differenceType',
            width: 180,
        }, {
            name: '支付方式',
            dataindex: 'payType',
            width: 120,
        }, {
            name: '处理方式',
            dataindex: 'processType',
            width: 240,
        }, {
            name: '处理状态',
            dataindex: 'processStatus',
            width: 240,
        }, {
            name: '差额日期',
            dataindex: 'differenceTime',
            width: 240,
        },
    ];
};
