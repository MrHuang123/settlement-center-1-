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
                            window.open(`/treasury/payment/differenceverify/detail/${rc.id}`);
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
            name: '处理方式',
            dataindex: 'processType',
            width: 120,
        }, {
            name: '门店',
            dataindex: 'shopInfo',
            width: 180,
        }, {
            name: '审核状态',
            dataindex: 'processStatus',
            width: 180,
        }, {
            name: '审核人',
            dataindex: 'auditPerson',
            width: 120,
        }, {
            name: '审核时间',
            dataindex: 'auditTime',
            width: 180,
        },
    ];
};
