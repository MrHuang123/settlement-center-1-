import React from 'react';
import { Link } from 'react-router-dom';

export const TR = [
    ['金库交款金额', 'handedAmount'],
    ['串户处理金额', 'contraError'],
    ['补款处理金额', 'fillingAmount'],
    ['拾遗处理金额', 'appropriateAmount'],
    ['差额', 'balence'],
    ['查看处理', 'TR_ckcl'],
];
export const TPR = [
    ['第三方到账金额', 'otherMoney'],
    ['手续费', 'channelMoney'],
    ['差额', 'errorMoney'],
    ['查看处理', 'TPR_ckcl'],
];

export const columns = ({ max }) => {
    return [
        {
            title: '公司代码',
            dataIndex: 'shopCode',
            render: (value, row, index) => {
                const obj = {
                    children: value,
                    props: {},
                };
                if (index === 0) {
                    obj.props.rowSpan = 15;
                } else {
                    obj.props.rowSpan = 0;
                }
                return obj;
            },
        },
        {
            title: '支付方式',
            dataIndex: 'psname',
            render: (text, row, index) => {
                if (index < max + 1) {
                    return <span>{text}</span>;
                }
                return {
                    children: <span>{text}</span>,
                    props: {
                        className: 'highLight',
                    },
                };
            },
        },
        {
            title: '系统应收金额',
            dataIndex: 'posShouldRecieve',
            render: (text, row, index) => {
                if (index < max + 2) {
                    if (index === max + 1) {
                        return {
                            children: <span>{text}</span>,
                            props: {
                                className: 'highLight',
                            },
                        };
                    }
                    return <span>{text}</span>;
                }
                return {
                    children: <span>{text}</span>,
                    props: {
                        colSpan: max + 2,
                        className: 'highLight',
                    },
                };
            },
        },
        {
            title: '金库对账',
            dataIndex: 'TR',
            children: [...TR].map((v) => {
                return {
                    title: v[0],
                    dataIndex: v[1],
                    key: v[1],
                    width: 100,
                    render: (text, row, index) => {
                        if (row.otherMoney === null && v[0] === '查看处理') {
                            return <Link to={
                                {
                                    pathname: '/treasury/payment/differencemanage',
                                    state: {
                                        shopCode: row.shopCode,
                                        reportDate: row.reportDate,
                                    },
                                }
                            }
                            >查看交款差额</Link>;
                        }
                        if (index < max + 2) {
                            if (index === max + 1) {
                                return {
                                    children: <span>{text}</span>,
                                    props: {
                                        className: 'highLight',
                                    },
                                };
                            }
                            return <span>{text}</span>;
                        }
                        return {
                            children: <span>{text}</span>,
                            props: {
                                colSpan: 0,
                            },
                        };
                    },
                };
            }),
        },
        {
            title: '第三方对账',
            dataIndex: 'TPR',
            children: [...TPR].map((v) => {
                return {
                    title: v[0],
                    dataIndex: v[1],
                    key: v[1],
                    width: 100,
                    render: (text, row, index) => {
                        if (row.handedAmount === null && v[0] === '查看处理') {
                            return <Link to={
                                {
                                    pathname: '/treasury/thirdverify/errorhandle',
                                    state: {
                                        shopCode: row.shopCode,
                                        reportDate: row.reportDate,
                                        psid: row.psid,
                                    },
                                }
                            }
                            >查看对账差错</Link>;
                        }
                        if (index < max + 2) {
                            if (index === max + 1) {
                                return {
                                    children: <span>{text}</span>,
                                    props: {
                                        className: 'highLight',
                                    },
                                };
                            }
                            return <span>{text}</span>;
                        }
                        return {
                            children: <span>{text}</span>,
                            props: {
                                colSpan: 0,
                            },
                        };
                    },
                };
            }),
        },
    ];
};
