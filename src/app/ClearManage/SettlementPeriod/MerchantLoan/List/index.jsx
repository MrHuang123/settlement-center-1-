/* eslint-disable */
import React from 'react';
import {
    MakeCommonPage,
} from 'bnq-sys-react-component';
import { connect } from 'react-redux';
import {
    Form,
    message,
    Modal,
} from 'antd';
import Proptypes from 'prop-types';
import Axios from 'axios';
import { columnsOptions, payState } from './columns';
import { Tools } from '@/util/index';

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
            getSysAllDictItems,
        } = this.props;
        getSysAllDictItems();
        asyncGetList({
            pageNo: 1,
            pageSize: 10,
        });
    }

    handleChange = (key, value) => {
        this.setState({
            selectValue: value,
            selectKey: key,
        });
    }

    handleClick = (values) => {
        const { asyncGetList } = this.props;
        asyncGetList({
            ...values,
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
            sysAllDictItems,
        } = this.props;
        const searchOptions = () => {
            return [
                {
                    selfname: '商户号',
                    selfid: 'merchantCode',
                    selftype: 'text',
                },
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
                    selfControlBtns={[{
                        name: '配置结算信息',
                        handleClick: () => {
                            window.open('/settlementperido/merchant/new/0');
                        },
                        type: 'primary',
                        style: { margin: '0 12px 0 0' },
                    }, {
                        name: '修改',
                        handleClick: () => {
                            const {
                                selectKey,
                            }=this.state;
                            if(selectKey.length==1){
                                window.open(`/settlementperido/merchant/reset/${selectKey[0]}`);
                            }else if(selectKey.length>1){
                                message.error('只能选择一条修改');
                            }else if(selectKey.length==0){
                                message.error('请选择一条修改');
                            }
                        },
                        type: 'primary',
                        style: { margin: '0 12px 0 0' },
                    }, {
                        name: '查看',
                        handleClick: () => {
                            const {
                                selectKey,
                            }=this.state;
                            if(selectKey.length==1){
                                window.open(`/settlementperido/merchant/detail/${selectKey[0]}`);
                            }else if(selectKey.length>1){
                                message.error('只能选择一条查看');
                            }else if(selectKey.length==0){
                                message.error('请选择一条查看');
                            }
                        },
                        type: 'primary',
                        style: { margin: '0 12px 0 0' },
                    }]}
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
                    rowSelection={{
                        type: 'checkbox',
                        onChange: this.handleChange,
                        selectedRowKeys: this.state.selectKey,
                        // getCheckboxProps(value){
                        //     return {
                        //         disabled:value.payState=='2'
                        //     }
                        // }
                    }}
                />
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        initData: state.merchantloan.initData,
        sysAllDictItems: state.login.sysAllDictItems,
        searchData: state.merchantloan.searchData,
        page: state.merchantloan.page,
        loading: state.loading.effects.merchantloan.asyncGetList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetList: dispatch.merchantloan.asyncGetList,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
