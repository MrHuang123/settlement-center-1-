/* eslint-disable  */
import React from 'react';
export const columnsOptions = (sysAllDictItems) => [
    {
        name: '序号',
        dataindex: 'index',
        width: 80,
    }, {
        name: '账务类型',
        dataindex: 'billType',
        width:240,
        render:(text,record)=>{
            return (<span>{text}</span>)
        },
    }, {
        name: '交易类型',
        dataindex: 'tradeType',
        width:240,
        render:(text,record)=>{
            return (<span>{text}</span>)
        },
    }, {
        name: '业务类型',
        dataindex: 'businessCode',
        width:240,
        render:(text,record)=>{
            return (<span>{text}</span>)
        },
    }, {
        name: '结算状态',
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
