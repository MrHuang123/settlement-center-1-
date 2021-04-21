/* eslint-disable  */
import React from 'react';
export const columnsOptions = (sysAllDictItems) => [
    {
        name: '序号',
        dataindex: 'index',
        width: 80,
    }, {
        name: '商户编号',
        dataindex: 'merchantCode',
        width: 180,
    }, {
        name: '商户名称',
        dataindex: 'merchantName',
        width: 300,
    }, {
        name: '商户结算状态',
        dataindex: 'enable',
        width: 240,
        render:(text)=>{
            let result;
            sysAllDictItems.settle_stop_settle_flag.forEach(element => {
                if(element.value==text){
                    result=element.title;
                }
            });
            return (<span>{result}</span>)
        },
    },
];
