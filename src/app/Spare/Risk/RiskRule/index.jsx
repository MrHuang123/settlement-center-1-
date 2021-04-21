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
import Axios from 'axios';
import { columnsOptions } from './columns';
import { Tools } from '../../../../util/index';
import ModalReset from './Modal/ModalReset';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.axios = Axios.create();
        this.state = {
            selectValue: [],
            selectKey: [],
            resetModal:false,
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
        };
        
        asyncGetList({
            ...send,
            pageNo: 1,
            pageSize: 10,
        });
    }

    toggleModal=(type)=>{
        if(type=='1'){
            const {
                asyncGetAccountList,
            }=this.props;
            asyncGetAccountList({
                pettyCashAccount:this.state.selectValue[0].virtAccount,
            });
            this.setState({
                resetModal:!this.state.resetModal,
            })
        }
    }

    handleExport = (params)=>{
        const send = this.axios.request;
        send({
            method: 'get',
            url: `/accm-web/virtualcash/virtualCashRule/exportExcel`,
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-Access-Token': localStorage.getItem('token'),
            },
            params,
        }).then(result => {
            Tools.download(result.data, '备用金风控账户规则数据.xls');
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
                    selfname: '备用金账户号',
                    selfid: 'virtAccount',
                    selftype: 'text',
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
                <ModalReset
                    domProps={{
                        visible:this.state.resetModal,
                        onCancel:()=>{
                            this.toggleModal('1')
                        },
                        title:'修改账户风控',
                        width:'60%',
                        destroyOnClose:true,
                    }}
                    that={this}
                />
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
                    selfControlBtns={[
                        {
                            name:'修改账户风控',
                            handleClick:()=>{
                                const {
                                    selectValue,
                                }=this.state;
                                if(selectValue.length==0){
                                    message.warning('请先选择1条账户');
                                }else{
                                    this.toggleModal('1');
                                }
                            },
                            style:{marginRight:'14px'}
                        }
                    ]}
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
                        type: 'radio',
                        onChange: this.handleChange,
                        selectedRowKeys: this.state.selectKey,
                    }}
                />
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        initData: state.riskRule.initData,
        searchData: state.riskRule.searchData,
        page: state.riskRule.page,
        loading: state.loading.effects.riskRule.asyncGetList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetList: dispatch.riskRule.asyncGetList,
        asyncGetAccountList: dispatch.spareAccount.asyncGetList,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
