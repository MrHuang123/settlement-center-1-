/* eslint-disable */
import { Link } from 'react-router-dom';
import React from 'react';
import { optionsCommon } from '../commonOptions';

export const columnsOptions = [
    // {
    //     name: '操作',
    //     dataindex: 'edit',
    //     render: () => {
    //         return (
    //             <div>
    //                 <Link to="/verifywarn/warncontact/detail">查看明细</Link>
    //             </div>
    //         );
    //     },
    // }, 
    {
        name: '告警联系人姓名',
        dataindex: 'alarmName',
    }, {
        name: '联系电话',
        dataindex: 'alarmTele',
    }, {
        name: '邮箱',
        dataindex: 'alarmEmail',
    }, {
        name: '告警项数',
        dataindex: 'alarmRule',
        render: (text) => {
            let result=[];
            let arr=text.split('');
            optionsCommon('rule').forEach((element,index) => {
                if(arr[index]==='1'){
                    // 该项被选择
                    result.push(element.name);
                }
            });
            return (<span>{result.length}</span>);
        },
    },
];
