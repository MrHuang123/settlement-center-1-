/* eslint-disable */
import React from 'react';
export const columnsOptions =(sysAllDictItems,fn)=> [
    {
        name: '操作',
        dataindex: 'edit',
        render: (text, record) => {
            return (
                <div>
                    <a style={{cursor:'pointer'}} onClick={()=>{fn('detail',record)}}>查看详情</a>
                </div>
            );
        },
    }, {
        name: '进账单编号',
        dataindex: 'billCode',
    }, {
        name: '进账单类型',
        dataindex: 'billType',
        render:(text)=>{
            let result='';
            sysAllDictItems.bill_type.forEach((element)=>{
                if(element.value===text){
                    result=element.title;
                }
            });
            return (
                <span>{result}</span>
            )
        }
    }, {
        name: '绑进账单金额',
        dataindex: 'incomeAmount',
    }, {
        name: '审核状态',
        dataindex: 'examineStatus',
        render:(text)=>{
            let result='';
            sysAllDictItems.check_status.forEach((element)=>{
                if(element.value===text){
                    result=element.title;
                }
            });
            return (
                <span>{result}</span>
            )
        }
    }, {
        name: '审核时间',
        dataindex: 'examineTime',
        width: 180,
    }, {
        name: '审核人',
        dataindex: 'examineName',
    },
];
