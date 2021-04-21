/* eslint-disable */
import React from 'react';
const alarmTypeList=[
    {
        id:'1',
        name:'短信',
    },{
        id:'2',
        name:'邮件',
    }
]
export const columnsOptions = [
    {
        name: '序号',
        dataindex: 'index',
        width: 80,
    }, {
        name: '通知记录编号',
        dataindex: 'noticeNum',
    }, {
        name: '告警通知发送时间',
        dataindex: 'alarmTime',
        width: 180,
    }, {
        name: '通知类型',
        dataindex: 'alarmType',
        render:(text)=>{
            let result = '';
            alarmTypeList.forEach((element) => {
                if (element.id === text) {
                    result = element.name;
                }
            });
            return (
                <span>{result}</span>
            );
        }
    }, {
        name: '短信/邮件主题',
        width: 180,
        dataindex: 'alarmContent',
    }, {
        name: '通知对象',
        dataindex: 'alarmParty',
    }, {
        name: '联系人姓名',
        dataindex: 'alarmMan',
    },
];
