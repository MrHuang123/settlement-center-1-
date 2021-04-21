import React from 'react';

export const uploadStatus = [
    {
        id: '0',
        name: '未上传',
    }, {
        id: '1',
        name: '无需存款',
    }, {
        id: '2',
        name: '不匹配',
    }, {
        id: '3',
        name: '上传完成',
    },
];
export const columnsOptions = () => {
    return [
        {
            name: '操作',
            dataindex: 'index',
            width: 80,
        }, {
            name: '销售日期',
            dataindex: 'createDate',
            width: 180,
        }, {
            name: '门店',
            dataindex: 'shopName',
            width: 240,
        }, {
            name: '已交现金金额',
            dataindex: 'handedAmount',
            width: 240,
        }, {
            name: '处理提款/投诉金额',
            dataindex: 'withdrawAmount',
            width: 240,
        }, {
            name: '应存款金额',
            dataindex: 'receivablesAmount',
            width: 180,
        }, {
            name: '存单金额',
            dataindex: 'actualAmount',
            width: 180,
        }, {
            name: '影印件上传状态',
            dataindex: 'status',
            width: 180,
            render: (text) => {
                let result = '';
                uploadStatus.forEach((element) => {
                    // eslint-disable-next-line eqeqeq
                    if (element.id == text) {
                        result = element.name;
                    }
                });
                return <span>{result}</span>;
            },
        },
    ];
};
