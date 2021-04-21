import React from 'react';
import { MakeCommonPage } from 'bnq-sys-react-component';
import { connect } from 'react-redux';
import {
    Form,
    Modal,
} from 'antd';
import Proptypes from 'prop-types';
import { columnsOptions } from './columns';
import { Tools } from '@/util';
import { optionsCommon } from '../optionsCommon';

class Process extends React.Component {
    static propTypes = {
        initData: Proptypes.array,
        getList: Proptypes.func,
        sysAllDictItems: Proptypes.object,
        loading: Proptypes.bool,
        getSysAllDictItems: Proptypes.func,
        searchData: Proptypes.object,
        page: Proptypes.object,
        form: Proptypes.object,
        asyncGetShopList: Proptypes.func,
        shopList: Proptypes.array,
    }

    static defaultProps = {
        initData: [],
        getList: () => { },
        sysAllDictItems: {},
        loading: true,
        getSysAllDictItems: () => { },
        searchData: {},
        page: {},
        form: null,
        asyncGetShopList: () => { },
        shopList: [],
    }

    constructor(props) {
        super(props);
        this.state = {
            // selectValue: [],
            selectKey: [],
        };
    }

    componentDidMount() {
        const {
            getList,
            getSysAllDictItems,
            asyncGetShopList,
        } = this.props;
        getSysAllDictItems();
        asyncGetShopList();
        getList({
            pageNo: 1,
            pageSize: 10,
        });
    }

    handleClick = (values) => {
        const { getList } = this.props;
        const send = {
            ...values,
            startRecordTime: values.dateCreated && values.dateCreated[0] && values.dateCreated[0].format('YYYY-MM-DD'),
            endRecordTime: values.dateCreated && values.dateCreated[1] && values.dateCreated[1].format('YYYY-MM-DD'),
        };
        delete send.dateCreated;
        getList({
            ...send,
            pageNo: 1,
            pageSize: 10,
        });
    }

    // eslint-disable-next-line no-unused-vars
    handleChange = (key, value) => {
        this.setState({
            // selectValue: value,
            selectKey: key,
        });
    }

    render() {
        const {
            searchData,
            page,
            getList,
            loading,
            form,
            initData,
            sysAllDictItems,
            shopList,
        } = this.props;
        const searchOptions = () => {
            return [
                {
                    selfname: '差错日期',
                    selfid: 'dateCreated',
                    selftype: 'datepicker',
                    selfDatePickerType: 'rangepicker',
                    format: 'YYYY/MM/DD',
                }, {
                    selfname: '原中台订单号',
                    selfid: 'origiOrderNum',
                    selftype: 'text',
                }, {
                    selfname: '差错流水号',
                    selfid: 'errorSequenceNum',
                    selftype: 'text',
                }, {
                    selfname: '差错类型',
                    selfid: 'errorType',
                    selftype: 'searchSelect',
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfHasAll: { value: '', text: '请选择' },
                    selfOptions: optionsCommon('errorType'),
                }, {
                    selfname: '门店号',
                    selfid: 'shopId',
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
                }, {
                    selfname: '合作业务',
                    selfid: 'cooperBusinessCode',
                    selftype: 'searchSelect',
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfHasAll: { value: '', text: '请选择' },
                    selfOptions: sysAllDictItems.cooper_business_code.map((item) => {
                        return {
                            name: item.title,
                            id: item.value,
                        };
                    }),
                }, {
                    selfname: '合作机构',
                    selfid: 'businessBrchno',
                    selftype: 'searchSelect',
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfHasAll: { value: '', text: '请选择' },
                    selfOptions: sysAllDictItems.business_brchno.map((item) => {
                        return {
                            name: item.title,
                            id: item.value,
                        };
                    }),
                },
            ];
        };
        const columns = Tools.genTableOptions(columnsOptions(sysAllDictItems));
        let width = 0;
        columns.forEach((item) => {
            if (item.width) {
                width += item.width;
            } else {
                width += 120;
            }
        });
        const pagination = {
            showSizeChanger: true,
            onShowSizeChange: (current, pageSize) => {
                getList({
                    ...searchData,
                    pageNo: 1,
                    pageSize,
                });
            },
            current: searchData.pageNo,
            total: page.total,
            pageSize: page.size,
            onChange: (nextPage) => {
                getList({
                    ...searchData,
                    pageNo: nextPage,
                });
                this.setState({
                    // selectValue: [],
                    selectKey: [],
                });
            },
        };
        return (
            <div>
                <MakeCommonPage
                    divider="true"
                    form={form}
                    selfSearchOptions={{
                        components: searchOptions(sysAllDictItems),
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
                        name: '差错处理',
                        handleClick: () => {
                            Modal.info({
                                title: '提示',
                                content: '请联系开发确认差错的原因。',
                            });
                        },
                        type: 'primary',
                        style: { margin: '10px 12px 0 0' },
                    }]}
                    columns={columns}
                    size="small"
                    rowKey={(record) => {
                        return `${record.errorId}`;
                    }}
                    scroll={{ x: width }}
                    dataSource={initData}
                    pagination={pagination}
                    loading={loading}
                    rowSelection={{
                        type: 'radio',
                        onChange: this.handleChange,
                        getCheckboxProps: (record) => {
                            return {
                                disabled: (record.errorStatus !== '06') && (record.errorStatus !== '09'),
                            };
                        },
                        selectedRowKeys: this.state.selectKey,
                    }}
                />
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        initData: state.errorHandleList.initData,
        sysAllDictItems: state.login.sysAllDictItems,
        searchData: state.errorHandleList.searchData,
        page: state.errorHandleList.page,
        shopList: state.tradeInout.shopList,
        loading: state.loading.effects.errorHandleList.asyncGetList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        getList: dispatch.errorHandleList.asyncGetList,
        editTogether: dispatch.errorHandleDetail.editTogether,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
        asyncGetShopList: dispatch.tradeInout.asyncGetShopList,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(Process));
