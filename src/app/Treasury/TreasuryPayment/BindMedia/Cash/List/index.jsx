/* eslint-disable  */
import React from 'react';
import {
    MakeCommonPage,
} from 'bnq-sys-react-component';
import { connect } from 'react-redux';
import {
    Form,
    message,
} from 'antd';
import Proptypes from 'prop-types';
import { columnsOptions, uploadStatus } from './columns';
import { Tools } from '@/util/index';
// eslint-disable-next-line import/extensions
import Modal from './modal.jsx';

class List extends React.Component {
    static propTypes = {
        initData: Proptypes.array,
        searchData: Proptypes.object,
        page: Proptypes.object,
        clearData: Proptypes.func,
        asyncGetList: Proptypes.func,
        form: Proptypes.object,
        loading: Proptypes.bool,
        asyncGetShopList: Proptypes.func,
        shopList: Proptypes.array,
    }

    static defaultProps = {
        initData: {},
        searchData: {},
        page: {},
        clearData: () => { },
        asyncGetList: () => { },
        form: null,
        loading: true,
        asyncGetShopList: () => { },
        shopList: [],
    }

    constructor(props) {
        super(props);
        this.state = {
            selectKey: [],
            selectValue: [],
        };
    }

    componentDidMount() {
        const {
            asyncGetList,
            asyncGetShopList,
        } = this.props;
        asyncGetShopList();
        asyncGetList({
            pageNo: 1,
            pageSize: 10,
        });
    }

    componentWillUnmount() {
        this.props.clearData();
    }

    handleChange = (key, value) => {
        this.setState({
            selectValue: value,
            selectKey: key,
        });
    }

    handleClick = (values) => {
        const { asyncGetList } = this.props;
        const send = {
            ...values,
            saleDateStart: values.saleDate && values.saleDate[0] && values.saleDate[0].format('YYYY-MM-DD'),
            saleDateEnd: values.saleDate && values.saleDate[1] && values.saleDate[1].format('YYYY-MM-DD'),
        };
        delete send.saleDate;
        asyncGetList({
            ...send,
            pageNo: 1,
            pageSize: 10,
        });
    }

    setVisible = (visible) => {
        this.setState({visible})
    }

    render() {
        const {
            searchData,
            page,
            asyncGetList,
            loading,
            form,
            initData,
            shopList,
        } = this.props;
        const { selectValue, visible } = this.state
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
                            id: item.shopCode,
                            name: item.shopName,
                        };
                    }),
                }, {
                    selfname: '上传状态',
                    selfid: 'status',
                    selftype: 'searchSelect',
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfHasAll: { value: '', text: '请选择' },
                    selfOptions: uploadStatus,
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
            <div>
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
                        name: '开始上传影印件',
                        handleClick: () => {
                            const {
                                selectValue,
                            } = this.state;
                            if (selectValue.length === 1) {
                                window.open(`/treasury/payment/bindmedia/cash/new/${selectValue[0].id}/${selectValue[0].shopCode}/${selectValue[0].createDate}/${selectValue[0].receivablesAmount}`);
                            } else {
                                message.warning('请选择1条记录');
                            }
                        },
                        style: { margin: '0 12px 0 0' },
                    },
                    {
                        name: '提款/投诉处理',
                        type: 'primary',
                        handleClick: () => { return this.setVisible(true); },
                    }]}
                    columns={columns}
                    size="small"
                    rowKey={(record) => {
                        return record.index;
                    }}
                    scroll={{ x: 'scroll' }}
                    // dataSource={initData.map((item, index) => {
                    //     return {
                    //         ...item,
                    //         index: index + 1,
                    //     };
                    // })}
                    dataSource={[]}
                    pagination={pagination}
                    loading={loading}
                    rowSelection={{
                        type: 'radio',
                        onChange: this.handleChange,
                        selectedRowKeys: this.state.selectKey,
                    }}
                />
                <Modal visible={visible} setVisible={this.setVisible} data={[].find((v) => { return v.id === selectValue; })} />
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        initData: state.bindMediaCashList.initData,
        searchData: state.bindMediaCashList.searchData,
        page: state.bindMediaCashList.page,
        loading: state.loading.effects.bindMediaCashList.asyncGetList || state.loading.effects.tradeInout.asyncGetShopList,
        shopList: state.tradeInout.shopList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetList: dispatch.bindMediaCashList.asyncGetList,
        clearData: dispatch.bindMediaCashList.clearData,
        asyncGetShopList: dispatch.tradeInout.asyncGetShopList,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
