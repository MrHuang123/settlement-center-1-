/* eslint-disable  */
import React from 'react';
export const columnsOptions = (sysAllDictItems) => [
    {
        name: '序号',
        dataindex: 'index',
        width: 80,
    }, {
        name: '供应商编号',
        dataindex: 'merchantCode',
        width: 180,
    }, {
        name: '供应商名称',
        dataindex: 'merchantName',
        width: 300,
    }, {
        name: '供应商结算状态',
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
