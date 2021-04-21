// 收银员交款，List已完成，开始交款页做好了数据结构，没有调试
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
import { columnsOptions } from './columns';
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
        initData: [],
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
            startSaleDate: values.saleDate && values.saleDate[0] && values.saleDate[0].format('YYYY-MM-DD'),
            endSaleDate: values.saleDate && values.saleDate[1] && values.saleDate[1].format('YYYY-MM-DD'),
        };
        delete send.saleDate;
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
                    selfname: '销售日期',
                    selfid: 'saleDate',
                    selftype: 'datepicker',
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfDatePickerType: 'rangepicker',
                    format: 'YYYY/MM/DD',
                }, {
                    selfname: '所属门店',
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
                    selfid: 'cashierCode',
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
                },
            ];
        };

        const columns = Tools.genTableOptions(columnsOptions(payType));
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
                        selfControlBtns={[{
                            name: '开始交款',
                            handleClick: () => {
                                window.open('/treasury/payment/turninnew');
                            },
                            style: { margin: '0 12px 0 0' },
                        }]}
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
        initData: state.turninSpare.initData,
        searchData: state.turninSpare.searchData,
        page: state.turninSpare.page,
        loading: state.loading.effects.turninSpare.asyncGetList,
        payType: state.tradeInout.payType,
        shopList: state.tradeInout.shopList,
        casherList: state.tradeInout.casherList,
        shopListLoading: state.loading.effects.tradeInout.asyncGetCasherList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetList: dispatch.turninSpare.asyncGetList,
        clearData: dispatch.turninSpare.clearData,
        clearCasher: dispatch.tradeInout.clearCasher,
        asyncGetPayType: dispatch.tradeInout.asyncGetPayType,
        asyncGetShopList: dispatch.tradeInout.asyncGetShopList,
        asyncGetCasherList: dispatch.tradeInout.asyncGetCasherList,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
