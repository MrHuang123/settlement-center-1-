// 交易流水详情，两个name字段待补充，POS字段不确定
import React from 'react';
import {
    Modal,
    Descriptions,
} from 'antd';

export const paymentStatus = [
    {
        id: '0',
        name: '待支付',
    }, {
        id: '1',
        name: '支付成功',
    }, {
        id: '-1',
        name: '支付失败',
    }, {
        id: '4',
        name: '待退款',
    }, {
        id: '5',
        name: '退款成功',
    }, {
        id: '-5',
        name: '退款失败',
    }, {
        id: '10',
        name: '已取消',
    },
];
export const tradeType = [
    {
        id: '1',
        name: '支付',
    }, {
        id: '2',
        name: '退款',
    },
];
const getStatus = (list, text) => {
    let result = '';
    list.forEach((element) => {
        // eslint-disable-next-line eqeqeq
        if (element.id == text) {
            result = element.name;
        }
    });
    return result;
};
export const columnsOptions = () => {
    return [
        {
            name: '操作',
            dataindex: 'id',
            width: 80,
            render: (text, rc) => {
                return <React.Fragment>
                    <span
                        style={{ color: 'blue', cursor: 'pointer' }}
                        onClick={() => {
                            Modal.info({
                                title: '详情',
                                content: <React.Fragment>
                                    <Descriptions column={1}>
                                        <Descriptions.Item label="订单时间">{rc.createTime}</Descriptions.Item>
                                        <Descriptions.Item label="收单小票号">{rc.posTicketCode}</Descriptions.Item>
                                        <Descriptions.Item label="交易订单号">{rc.bizOrderCode}</Descriptions.Item>
                                        <Descriptions.Item label="支付方式">{rc.paymentMethodName}</Descriptions.Item>
                                        <Descriptions.Item label="订单金额">{rc.paymentAmount}</Descriptions.Item>
                                        <Descriptions.Item label="订单状态">{getStatus(paymentStatus, rc.paymentStatus)}</Descriptions.Item>
                                        <Descriptions.Item label="交易类型">{getStatus(tradeType, rc.tradeType)}</Descriptions.Item>
                                        {/* <Descriptions.Item label="收银员">{rc.tradeType}</Descriptions.Item> */}
                                        {/* <Descriptions.Item label="门店">{rc.shopCode}</Descriptions.Item> */}
                                        <Descriptions.Item label="支付流水号">{rc.transactionId}</Descriptions.Item>
                                        {/* <Descriptions.Item label="POS备注">{rc.shopCode}</Descriptions.Item> */}
                                    </Descriptions>
                                </React.Fragment>,
                            });
                        }}
                    >查看明细</span>
                </React.Fragment>;
            },
        }, {
            name: '收单小票号',
            dataindex: 'posTicketCode',
            width: 180,
        }, {
            name: '订单时间',
            dataindex: 'createTime',
            width: 240,
        }, {
            name: '门店',
            dataindex: 'shopCode',
            width: 180,
        }, {
            name: '交易订单号',
            dataindex: 'bizOrderCode',
            width: 240,
        }, {
            name: '支付方式',
            dataindex: 'paymentMethodName',
            width: 120,
        }, {
            name: '交易类型',
            dataindex: 'tradeType',
            width: 240,
            render: (text) => {
                let result = '';
                tradeType.forEach((item) => {
                    // eslint-disable-next-line eqeqeq
                    if (item.id == text) {
                        result = item.name;
                    }
                });
                return <span>{result}</span>;
            },
        }, {
            name: '订单金额',
            dataindex: 'paymentAmount',
            width: 180,
        }, {
            name: '订单状态',
            dataindex: 'paymentStatus',
            width: 240,
            render: (text) => {
                let result = '';
                paymentStatus.forEach((item) => {
                    // eslint-disable-next-line eqeqeq
                    if (item.id == text) {
                        result = item.name;
                    }
                });
                return <span>{result}</span>;
            },
        },
    ];
};
