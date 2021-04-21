/* eslint-disable  */
import React from 'react';
import {
    MakeCommonPage,
} from 'bnq-sys-react-component';
import { connect } from 'react-redux';
import {
    Form,
} from 'antd';
import Proptypes from 'prop-types';
import Axios from 'axios';
import { columnsOptions, tradeTypeList } from './columns';
import { Tools } from '@/util';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.axios = Axios.create();
        this.state = {
            selectValue: [],
            selectKey: [],
        };
    }

    componentDidMount() {
        const {
            asyncGetList,
        } = this.props;
        asyncGetList({
            pageNo: 1,
            pageSize: 10,
        });
    }

    handleClick = (values) => {
        const { asyncGetList } = this.props;
        const send = {
            ...values,
            creatTimeBegin: values.creatTime && values.creatTime[0] && values.creatTime[0].format('YYYY-MM-DD'),
            creatTimeEnd: values.creatTime && values.creatTime[1] && values.creatTime[1].format('YYYY-MM-DD'),
        };
        delete send.creatTime;
        asyncGetList({
            ...send,
            pageNo: 1,
            pageSize: 10,
        });
    }
    handleExport = (params)=>{
        const send = this.axios.request;
        send({
            method: 'get',
            url: `/accm-web/virtualcash/virtualCashDetail/exportExcel`,
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-Access-Token': localStorage.getItem('token'),
            },
            params,
        }).then(result => {
            Tools.download(result.data, '备用金账户收支明细.xls');
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
            sysAllDictItems,
        } = this.props;
        const searchOptions = () => {
            return [
                {
                    selfname: '交易类型',
                    selftype: 'searchSelect',
                    selfid: 'tradeType',
                    selfHasAll: { value: '', text: '请选择' },
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfOptions: tradeTypeList,
                }, {
                    selfname: '业务订单号',
                    selfid: 'tradeNo',
                    selftype: 'text',
                }, {
                    selfname: '支付流水号',
                    selfid: 'payNo',
                    selftype: 'text',
                }, {
                    selfname: '备用金账户号',
                    selfid: 'virtAccount',
                    selftype: 'text',
                }, {
                    selfname: '账户收支流水号',
                    selfid: 'cashFlowno',
                    selftype: 'text',
                }, {
                    selfname: '用户帐号',
                    selfid: 'userAccount',
                    selftype: 'text',
                }, {
                    selfname: '记账日期',
                    selfid: 'creatTime',
                    selftype: 'datepicker',
                    selfDatePickerType: 'rangepicker',
                    format: 'YYYY/MM/DD',
                }
            ];
        };
        const columns = Tools.genTableOptions(columnsOptions(sysAllDictItems));
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
                    divider={true}
                    form={form}
                    tableLayout="fixed"
                    selfSearchOptions={{
                        components: searchOptions(),
                        btns: [{
                            selfTypeName: 'search',
                        }, {
                            selfTypeName: 'reset',
                        }, {
                            selfTypeName: 'export',
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
                        return record.id;
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
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        initData: state.spareInout.initData,
        searchData: state.spareInout.searchData,
        page: state.spareInout.page,
        loading: state.loading.effects.spareInout.asyncGetList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetList: dispatch.spareInout.asyncGetList,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
