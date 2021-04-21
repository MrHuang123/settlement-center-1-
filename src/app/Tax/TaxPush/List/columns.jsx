/* eslint-disable  */
import React from 'react';
export const columnsOptions = (sysAllDictItems) => [
    {
        name: '序号',
        dataindex: 'index',
        width: 80,
    }, {
        name: '操作',
        dataindex: 'edit',
        width: 120,
        render: (text, record)=>{
            return <a href={`/tax/taxpush/detail/${record.id}`}>详情</a>;
        }
    }, {
        name: '公司编码/公司名称',
        dataindex: 'companyCode',
        width: 270,
        render: (text, record)=>{
            return <span>{`${text}/${record.companyName}`}</span>;
        }
    }, {
        name: '报表类型',
        dataindex: 'reportType',
        width: 120,
        render:(text)=>{
            let result;
            sysAllDictItems.tax_type.forEach(element => {
                if(element.value===text){
                    result=element.title;
                }
            });
            return (<span>{result}</span>)
        },
    }, {
        name: '纳税月份',
        dataindex: 'taxMonth',
        width: 180,
    }, {
        name: 'SAP报表状态',
        dataindex: 'sapStatu',
        width: 180,
        render:(text)=>{
            let result;
            sysAllDictItems.sap_statu.forEach(element => {
                if(element.value===text){
                    result=element.title;
                }
            });
            return (<span>{result}</span>)
        },
    }, {
        name: '上传手工报表',
        dataindex: 'manupFlag',
        width: 150,
        render:(text)=>{
            let result;
            sysAllDictItems.manup_flag.forEach(element => {
                if(element.value===text){
                    result=element.title;
                }
            });
            return (<span>{result}</span>)
        },
    }, {
        name: '上传手工报表时间',
        dataindex: 'manupTime',
        width: 240,
    }, {
        name: '推送神州云状态',
        dataindex: 'pushFlag',
        width: 150,
        render:(text)=>{
            let result;
            sysAllDictItems.declare_push_flag.forEach(element => {
                if(element.value===text){
                    result=element.title;
                }
            });
            return (<span>{result}</span>)
        },
    }, {
        name: '推送神州云时间',
        dataindex: 'pushTime',
        width: 240,
    },
];
