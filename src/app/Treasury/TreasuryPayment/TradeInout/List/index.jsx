import React from 'react';
import {
    MakeCommonPage,
} from 'bnq-sys-react-component';
import { connect } from 'react-redux';
import {
    Form,
    Spin,
} from 'antd';
import Proptypes from 'prop-types';
import { columnsOptions, paymentStatus } from './columns';
import { Tools } from '@/util/index';

class List extends React.Component {
    static propTypes = {
        initData: Proptypes.array,
        searchData: Proptypes.object,
        page: Proptypes.object,
        clearData: Proptypes.func,
        clearCasher: Proptypes.func,
        asyncGetList: Proptypes.func,
        form: Proptypes.object,
        loading: Proptypes.bool,
        asyncGetPayType: Proptypes.func,
        payType: Proptypes.array,
        shopList: Proptypes.array,
        asyncGetShopList: Proptypes.func,
        shopListLoading: Proptypes.bool,
        casherList: Proptypes.array,
        asyncGetCasherList: Proptypes.func,
    }

    static defaultProps = {
        initData: {},
        searchData: {},
        page: {},
        clearData: () => { },
        clearCasher: () => { },
        asyncGetList: () => { },
        form: null,
        loading: true,
        asyncGetPayType: () => { },
        payType: [],
        shopList: [],
        asyncGetShopList: () => { },
        shopListLoading: false,
        casherList: [],
        asyncGetCasherList: () => { },
    }

    componentDidMount() {
        const {
            asyncGetList,
            asyncGetPayType,
            asyncGetShopList,
            shopList,
        } = this.props;
        asyncGetPayType();
        if (shopList.length === 0) {
            asyncGetShopList();
        }
        asyncGetList({
            pageNo: 1,
            pageSize: 10,
        });
    }

    componentWillUnmount() {
        this.props.clearData();
        this.props.clearCasher();
    }

    handleClick = (values) => {
        const { asyncGetList } = this.props;
        const send = {
            ...values,
            payStartTime: values.RecordTime && values.RecordTime[0] && values.RecordTime[0].format('YYYY-MM-DD'),
            payEndTime: values.RecordTime && values.RecordTime[1] && values.RecordTime[1].format('YYYY-MM-DD'),
        };
        delete send.RecordTime;
        asyncGetList({
            ...send,
            pageNo: 1,
            pageSize: 10,
        });
    }

    render() {
        const {
            searchData,
            page,
            asyncGetList,
            loading,
            form,
            initData,
            payType,
            shopListLoading,
            shopList,
            casherList,
            asyncGetCasherList,
        } = this.props;
        const searchOptions = () => {
            return [
                {
                    selfname: '交易日期',
                    selfid: 'RecordTime',
                    selftype: 'datepicker',
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfDatePickerType: 'rangepicker',
                    format: 'YYYY/MM/DD',
                }, {
                    selfname: '交易订单号',
                    selfid: 'bizOrderCode',
                    selftype: 'text',
                }, {
                    selfname: '支付方式',
                    selfid: 'paymentMethodId',
                    selftype: 'searchSelect',
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfHasAll: { value: '', text: '请选择' },
                    selfOptions: payType,
                }, {
                    selfname: '订单状态',
                    selfid: 'paymentStatus',
                    selftype: 'searchSelect',
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfHasAll: { value: '', text: '请选择' },
                    selfOptions: paymentStatus,
                }, {
                    selfname: '门店号',
                    selfid: 'shopCode',
                    selftype: 'searchSelect',
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfHasAll: { value: '', text: '请选择' },
                    selfOptions: shopList.map((item) => {
                        return {
                            name: item.shopName,
                            id: item.shopCode,
                        };
                    }),
                    onChange: (shopCode) => {
                        asyncGetCasherList({
                            shopCode,
                        });
                    },
                }, {
                    selfname: '收银员',
                    selfid: 'payee',
                    selftype: 'searchSelect',
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfHasAll: { value: '', text: '请选择' },
                    selfOptions: casherList.map((item) => {
                        return {
                            name: `${item.attendanceLocation}--${item.employeeName}`,
                            id: item.id,
                        };
                    }),
                }, {
                    selfname: '收单小票号',
                    selfid: 'posTicketCode',
                    selftype: 'text',
                }, {
                    selfname: '支付流水号',
                    selfid: 'transactionIds',
                    selftype: 'text',
                },
            ];
        };

        const columns = Tools.genTableOptions(columnsOptions());
        const pagination = {
            showSizeChanger: true,
            onShowSizeChange: (current, pageSize) => {
                asyncGetList({
                    ...searchData,
                    pageNo: 1,
                    pageSize,
                });
            },
            current: searchData.pageNo,
            total: page.total,
            pageSize: page.size,
            onChange: (nextPage) => {
                asyncGetList({
                    ...searchData,
                    pageNo: nextPage,
                });
            },
        };
        return (
            <React.Fragment>
                <Spin spinning={shopListLoading}>
                    <MakeCommonPage
                        divider="hr"
                        form={form}
                        tableLayout="fixed"
                        selfSearchOptions={{
                            components: searchOptions(),
                            btns: [{
                                selfTypeName: 'search',
                            }, {
                                selfTypeName: 'reset',
                            }],
                            selfReset: () => {
                                form.resetFields();
                            },
                            selfSearch: this.handleClick,
                            selfExport: this.handleExport,
                        }}
                        columns={columns}
                        size="small"
                        rowKey={(record) => {
                            return record.index;
                        }}
                        scroll={{ x: 'scroll' }}
                        dataSource={initData.map((item, index) => {
                            return {
                                ...item,
                                index: index + 1,
                            };
                        })}
                        pagination={pagination}
                        loading={loading}
                    />
                </Spin>
            </React.Fragment>
        );
    }
}
const mapState = (state) => {
    return {
        initData: state.tradeInout.initData,
        searchData: state.tradeInout.searchData,
        page: state.tradeInout.page,
        shopListLoading: state.loading.effects.tradeInout.asyncGetCasherList,
        loading: state.loading.effects.tradeInout.asyncGetList,
        payType: state.tradeInout.payType,
        shopList: state.tradeInout.shopList,
        casherList: state.tradeInout.casherList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetList: dispatch.tradeInout.asyncGetList,
        clearData: dispatch.tradeInout.clearData,
        clearCasher: dispatch.tradeInout.clearCasher,
        asyncGetPayType: dispatch.tradeInout.asyncGetPayType,
        asyncGetShopList: dispatch.tradeInout.asyncGetShopList,
        asyncGetCasherList: dispatch.tradeInout.asyncGetCasherList,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
