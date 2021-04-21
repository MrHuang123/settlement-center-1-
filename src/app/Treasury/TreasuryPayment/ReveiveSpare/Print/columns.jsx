import React from 'react';

export const columnsOptions = () => {
    return [
        {
            name: '序号',
            dataindex: 'index',
            width: 80,
        },
        {
            name: '收银员',
            dataindex: 'employeeName',
            width: 180,
        }, {
            name: '领取金额',
            dataindex: 'receiveAmount',
            width: 240,
        },
    ];
};
