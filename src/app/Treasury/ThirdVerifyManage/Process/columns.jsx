import React from 'react';

export const columnsOptions = (sysAllDictItems) => {
    return [
        {
            name: '对账批次号',
            dataindex: 'batchNum',
            width: 180,
        }, {
            name: '交易日期',
            dataindex: 'tradeTime',
        }, {
            name: '合作机构名称',
            dataindex: 'cooperOrgCode',
            width: 180,
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
            name: '合作业务',
            dataindex: 'cooperBusinessCode',
            width: 180,
            render: (text) => {
                let result = '';
                sysAllDictItems.cooper_business_code.forEach((element) => {
                    if (element.value === text) {
                        result = element.title;
                    }
                });
                return (
                    <span>{result}</span>
                );
            },
        }, {
            name: '文件入库状态',
            dataindex: 'docStorageStausName',
        }, {
            name: '对账作业状态',
            width: 180,
            dataindex: 'reconciliationStausName',
        }, {
            name: '差错入库状态',
            dataindex: 'errorStorageStatusName',
        }, {
            name: '结果汇总状态',
            dataindex: 'resultSummaryStatusName',
        }, {
            name: '对账开始时间',
            dataindex: 'verifyStartTime',
            width: 180,
        }, {
            name: '对账结束时间',
            dataindex: 'verifyEndTime',
            width: 180,
        },
    ];
};
