/* eslint-disable  */
import React from 'react';
import { Link } from 'react-router-dom';

export const columnsOptions = (classAllList) => {
    return [{
        name: '操作',
        dataindex: 'id',
        width: 150,
        render: (text) => {
            return (
                <div>
                    <span className="buttonStyle">
                        <Link to={`/clearmanage/outmoney/detail/${text}`}>查看</Link>
                    </span>
                </div>
            );
        },
    }, {
        name: '序号',
        dataindex: 'index',
        render:(text)=>{
            return <span>{text+1}</span>
        }
    }, {
        name: '交易日期',
        dataindex: 'tradeTime',
        width: 240,
    }, {
        name: '原业务订单号',
        dataindex: 'primaryOrder',
        width: 240,
    }, {
        name: '商户编号/客户号',
        dataindex: 'customerCode',
        width: 180,
    }, {
        name: '商户/客户名称',
        dataindex: 'customerName',
        width: 240,
    }, {
        name: '账务所属机构',
        dataindex: 'orgName',
    }, {
        name: '交易类型',
        dataindex: 'tradeType',
        width:240,
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
        dataindex: 'busType',
        width:240,
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
        name: '订单实收金额',
        dataindex: 'orderAmount',
    }, {
        name: '平台服务费',
        dataindex: 'platFee',
    }, {
        name: '渠道手续费',
        dataindex: 'channelFee',
    }, {
        name: '出金结算金额',
        dataindex: 'payAmount',
    }];
};
