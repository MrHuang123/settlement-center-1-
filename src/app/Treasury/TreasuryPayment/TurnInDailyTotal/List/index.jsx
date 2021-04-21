// 备用金字段未解决
/* eslint-disable  */
import React from 'react';
import {
    MakeCommonPage,
} from 'bnq-sys-react-component';
import { connect } from 'react-redux';
import {
    Form,
    Spin,
    message,
} from 'antd';
import Proptypes from 'prop-types';
import { columnsOptions } from './columns';
import { Tools } from '@/util/index';
import ModalSet from './Modal/ModalSet';

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
        shopList: Proptypes.array,
        asyncGetShopList: Proptypes.func,
        shopListLoading: Proptypes.bool,
        casherList: Proptypes.array,
        asyncGetCasherList: Proptypes.func,
        asyncGetDistinctDetail: Proptypes.func,
        asyncCommitDiff: Proptypes.func,
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
        shopList: [],
        asyncGetShopList: () => { },
        shopListLoading: false,
        casherList: [],
        asyncGetCasherList: () => { },
        asyncGetDistinctDetail: () => { },
        asyncCommitDiff: () => { },
    }

    constructor(props) {
        super(props);
        this.state = {
            selectValue: [],
            showModalSet: false,
            confirmLoading: false,
            columnsList: [],
        };
    }

    componentDidMount() {
        const {
            asyncGetList,
            asyncGetShopList,
            shopList,
        } = this.props;
        // 获取list无数据，待沟通
        asyncGetList({
            pageNo: 1,
            pageSize: 10,
            // totalShouldReceive: 0,
        });
        if (shopList.length === 0) {
            asyncGetShopList();
        }
    }

    componentWillUnmount() {
        this.props.clearData();
        this.props.clearCasher();
    }

    handleChange = (key, value) => {
        this.setState({
            selectValue: value,
        });
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
            shopListLoading,
            shopList,
            casherList,
            asyncGetCasherList,
            asyncGetDistinctDetail,
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
                    selfid: 'cashierCode',
                    selftype: 'searchSelect',
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfHasAll: { value: '', text: '请选择' },
                    selfOptions: casherList.map((item) => {
                        return {
                            name: `${item.attendanceLocation}--${item.employeeName}`,
                            id: item.jobNo,
                        };
                    }),
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
                this.setState({
                    selectValue: [],
                });
            },
        };
        return (
            <React.Fragment>
                <ModalSet
                    domProps={{
                        visible: this.state.showModalSet,
                        onCancel: () => {
                            this.setState({
                                showModalSet: false,
                            });
                        },
                        title: '提交差额管理',
                        width: '60%',
                        destroyOnClose: true,
                        okText: '提交',
                        confirmLoading: this.state.confirmLoading,
                        onOk: () => {
                            const {
                                asyncCommitDiff,
                            } = this.props;
                            const {
                                selectValue,
                            } = this.state;
                            this.setState({
                                confirmLoading: true,
                            }, () => {
                                const send={
                                    id: selectValue[0].id,
                                    cashierCode: selectValue[0].cashierCode,
                                    shopCode: selectValue[0].shopCode,
                                    saleDate: selectValue[0].saleDate,
                                };
                                asyncCommitDiff(send).then(data => {
                                    if (data.success) {
                                        message.success(data.message);
                                    }else{
                                        message.error(data.message);
                                    }
                                    this.setState({
                                        confirmLoading: false,
                                        showModalSet: false,
                                    });
                                });
                            });
                        },
                    }}
                    columnsList={this.state.columnsList}
                    that={this}
                />
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
                            name: '提交差额处理',
                            handleClick: () => {
                                const {
                                    selectValue,
                                } = this.state;
                                if (selectValue.length !== 1) {
                                    message.warning('请选择1条记录');
                                } else {
                                    asyncGetDistinctDetail({
                                        saleDate:selectValue[0].saleDate,
                                        shopCode:selectValue[0].shopCode,
                                        cashierCode:selectValue[0].cashierCode,
                                    }).then((data) => {
                                        if (data.success) {
                                            this.setState({
                                                showModalSet: true,
                                                columnsList: data.result,
                                            });
                                        } else {
                                            message.error(data.message);
                                        }
                                    });
                                }
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
                        rowSelection={{
                            type: 'radio',
                            onChange: this.handleChange,
                        }}
                    />
                </Spin>
            </React.Fragment>
        );
    }
}
const mapState = (state) => {
    return {
        initData: state.turninDailyTotal.initData,
        searchData: state.turninDailyTotal.searchData,
        page: state.turninDailyTotal.page,
        loading: state.loading.effects.turninDailyTotal.asyncGetList,
        shopListLoading: state.loading.effects.tradeInout.asyncGetCasherList,
        shopList: state.tradeInout.shopList,
        casherList: state.tradeInout.casherList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetList: dispatch.turninDailyTotal.asyncGetList,
        clearData: dispatch.turninDailyTotal.clearData,
        asyncGetDistinctDetail: dispatch.turninDailyTotal.asyncGetDistinctDetail,
        clearCasher: dispatch.tradeInout.clearCasher,
        asyncGetShopList: dispatch.tradeInout.asyncGetShopList,
        asyncGetCasherList: dispatch.tradeInout.asyncGetCasherList,
        asyncCommitDiff: dispatch.turninDailyTotal.asyncCommitDiff,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
