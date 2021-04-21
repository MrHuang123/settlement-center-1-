import React from 'react';

export const columnsOptions = (sysAllDictItems) => {
    return [
        {
            name: '操作',
            dataindex: 'edit',
            render: (text, record) => {
                return (
                    <span
                        style={{
                            color: 'blue',
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            window.open(`/treasury/thirdverify/gatherresult/detail/${record.checkBatchNo}`);
                        }}
                    >查看汇总详情</span>
                );
            },
        }, {
            name: '序号',
            dataindex: 'number',
        }, {
            name: '对账批次号',
            dataindex: 'checkBatchNo',
            width: 180,
        }, {
            name: '对账日期',
            dataindex: 'createTime',
        }, {
            name: '合作机构名称',
            dataindex: 'businessBrchno',
            render: (text) => {
                let result = '';
                sysAllDictItems.business_brchno.forEach((element) => {
                    if (element.value === text) {
                        result = element.title;
                    }
                });
                return (
                    <span>{result}</span>
                );
            },
        }, {
            name: '我方对账文件总笔数',
            dataindex: 'nostroNum',
            width: 180,
        }, {
            name: '对方对账文件总笔数',
            dataindex: 'reciprNum',
            width: 180,
        }, {
            name: '平账笔数',
            dataindex: 'balanceNum',
        }, {
            name: '差错笔数',
            dataindex: 'errorNum',
            width: 180,
        },
    ];
};
