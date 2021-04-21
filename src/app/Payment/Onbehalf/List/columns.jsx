/* eslint-disable  */
import {
    Modal,
} from 'antd';
import React from 'react';
export const companyType=[{
    id:'1',
    code:'1',
    name:'对私',
    description:'对私'
},{
    id:'0',
    code:'0',
    name:'对公',
    description:'对公'
}]
export const columnsOptions = (sysAllDictItems) => [
    {
        name: '序号',
        dataindex: 'index',
        width: 80,
    }, {
        name: '代付批次号',
        dataindex: 'batpayNo',
        width: 180,
    }, {
        name: '对公/对私',
        dataindex: 'companyType',
        width: 120,
        render: (text, record)=>{
            let result='';
            companyType.forEach(item=>{
                if(item.id==text){
                    result=item.name;
                }
            })
            return <span>{result}</span>;
        }
    }, {
        name: '收款账户名称',
        dataindex: 'receviName',
        width: 300,
    }, {
        name: '收款账户账号',
        dataindex: 'receCardno',
        width: 240,
    }, {
        name: '收款开户行名称',
        dataindex: 'receBankname',
        width: 240,
    }, {
        name: '收款开户行行号',
        dataindex: 'reveBankno',
        width: 240,
    }, {
        name: '付款金额',
        dataindex: 'amout',
        width: 180,
    }, {
        name: '付款用途',
        dataindex: 'payDesc',
        width: 120,
    }, {
        name: '付款状态',
        dataindex: 'batpayStatu',
        width: 120,
        render:(text,record)=>{
            if(text=='03'){
                return <a type="link" onClick={()=>{
                    Modal.info({
                        title:'失败原因',
                        content:record.failDesc,
                    })
                }}>查看失败原因</a>
            }else{
                let result='';
                sysAllDictItems.batpay_statu.forEach(item=>{
                    if(item.value==text){
                        result=item.title;
                    }
                })
                return result;
            }
        }
    }, {
        name: '付款时间',
        dataindex: 'batpayTime',
        width: 240,
    },
];
