/* eslint-disable */
import { Link } from 'react-router-dom';
import React from 'react';
import { optionsCommon } from '../../../VerifyManage/ErrorHandle/optionsCommon';

// eslint-disable-next-line arrow-body-style
export const columnsOptions = (sysAllDictItems,classAllList) => [
    {
        name: '操作',
        dataindex: 'edit',
        render: (text, record) => {
            return (
                <div>
                    <Link to={`/clearinfomanage/merchant/detail/${record.accountNo}/${record.sequenceNum}`}>查看</Link>
                </div>
            );
        },
    }, {
        name: '序号',
        dataindex: 'index',
        render:(text)=>{
            return (<span>{text+1}</span>)
        }
    }, {
        name: '记账日期',
        dataindex: 'recordTime',
        width: 180,
    }, {
        name: '系统日期',
        dataindex: 'systemDate',
    }, {
        name: '系统时间',
        dataindex: 'systemTime',
    }, {
        name: '业务订单号',
        dataindex: 'orderNum',
        width: 240,
    }, {
        name: '帐户号',
        dataindex: 'accountNo',
        width: 240,
    }, {
        name: '帐户名称',
        dataindex: 'accountName',
        width: 300,
    }, {
        name: '交易类型',
        dataindex: 'tradeType',
        width: 240,
        render:(text)=>{
            let result;
            classAllList.forEach(element => {
                if((element.classNo===text)&&(element.classLevel==='02')){
                    result=`${element.classNo}-${element.className}`;
                }
            });
            return (<span>{result}</span>)
        }
    }, {
        name: '业务名称',
        dataindex: 'classNo',
        width: 300,
        render:(text)=>{
            let result;
            classAllList.forEach(element => {
                if((element.classNo===text)&&(element.classLevel==='03')){
                    result=`${element.classNo}-${element.className}`;
                }
            });
            return (<span>{result}</span>)
        }
    }, {
        name: '借方金额',
        dataindex: 'loanFlag',
        render:(text,record)=>{
            if(text===0){
                return (<span>{record.entryMoney}</span>)
            }else{
                return (<span>0</span>)
            }
        }
    }, {
        name: '贷方金额',
        dataindex: 'entryMoney',
        render:(text,record)=>{
            if(record.loanFlag===1){
                return (<span>{text}</span>)
            }else{
                return (<span>0</span>)
            }
        }
    }, {
        name: '当前余额',
        dataindex: 'currentBalance',
    }, 
];
