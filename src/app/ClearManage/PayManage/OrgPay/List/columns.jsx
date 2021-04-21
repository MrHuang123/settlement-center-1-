/* eslint-disable */
import React from 'react';
import { optionsCommon } from '../../../../VerifyManage/ErrorHandle/optionsCommon';

export const commonOption=(type)=>{
    if(type==='dealStatus'){
        return [
            {
                id:'1',
                name:'未操作',
            },{
                id:'2',
                name:'已操作',
            },
        ]
    }else if(type==='payState'){
        return [
            {
                id:'1',
                name:'待付款',
            },{
                id:'2',
                name:'付款处理中',
            },{
                id:'3',
                name:'部分付款失败',
            },{
                id:'4',
                name:'付款完成',
            },
        ]
    }
}
export const columnsOptions = (sysAllDictItems) => [
    {
        name: '序号',
        dataindex: 'index',
    }, {
        name: '付款日期',
        dataindex: 'payDate',
        width: 180,
    }, {
        name: '付款开户行',
        dataindex: 'payOpenAccount',
        width: 300,
    }, {
        name: '付款账号/卡号',
        dataindex: 'payAccount',
        width:180,
    }, {
        name: '付款账户名称',
        dataindex: 'payAccountName',
        width: 240,
    }, {
        name: '收款开户行名称',
        dataindex: 'receiveBankName',
        width: 240,
    }, {
        name: '收款账户账号',
        dataindex: 'receiveAccount',
        width: 240,
    }, {
        name: '收款账户名称',
        dataindex: 'receiveAccountName',
        width: 180,
    }, {
        name: '付款总金额',
        dataindex: 'amount',
    }, {
        name: '打款文件下载次数',
        dataindex: 'fileDownCount',
        width: 180,
    }, {
        name: '操作状态',
        dataindex: 'dealStatus',
        // 1.未操作，2.已操作
        width: 180,
        render:(text)=>{
            let result;
            commonOption('dealStatus').forEach(element => {
                if(element.id==text){
                    result=element.name;
                }
            });
            return (<span>{result}</span>)
        }
    }, {
        name: '付款状态',
        dataindex: 'payState',
        // 1.待付款；2付款处理中 ; 3.部分付款失败 ;4.付款完成
        width: 180,
        render:(text)=>{
            let result;
            commonOption('payState').forEach(element => {
                if(element.id==text){
                    result=element.name;
                }
            });
            return (<span>{result}</span>)
        }
    }, {
        name: '付款结束时间',
        dataindex: 'paySuccTime',
        width: 180,
    }
];
