/* eslint-disable */
// import { Link } from 'react-router-dom';
import React from 'react';
import { searchOptionsCommon } from '../New/commonOptions';

export const columnsOptions = (sysAllDictItems)=>[
    {
        name: '序号',
        dataindex: 'index',
    }, {
        name: '进账单状态',
        dataindex: 'bindState',
        width: 180,
        render:(text)=>{
            let result='';
            searchOptionsCommon('bindState').forEach((element)=>{
                if(element.id===text){
                    result=element.name;
                }
            });
            return (
                <span>{result}</span>
            )
        }
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
        name: '收款账户',
        width: 180,
        dataindex: 'collectionAccount',
    }, {
        name: '收款户名',
        dataindex: 'collectionName',
    }, {
        name: '进账金额',
        dataindex: 'incomeAmount',
    }, {
        name: '付款账户',
        dataindex: 'paymentAccount',
        width: 180,
    }, {
        name: '付款户名',
        dataindex: 'paymentName',
    }, {
        name: '影印件上传',
        dataindex: 'imageUrl',
        render:(text)=>{
            let result='未上传';
            if(text){
                result='上传成功'
            }
            return (
                <span>{result}</span>
            )
        }
    },
];
