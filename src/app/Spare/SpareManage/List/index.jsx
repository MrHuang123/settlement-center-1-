/* eslint-disable  */
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
import Axios from 'axios';
import { columnsOptions, stateList } from './columns';
import { Tools } from '../../../../util/index';
import ModalNew from '../Modal/ModalNew';
import ModalQuota from '../Modal/ModalQuota';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.axios = Axios.create();
        this.state = {
            selectValue: [],
            selectKey: [],
            openModal:false,
            effectModal:false,
            quotaModal:false,
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

    componentWillUnmount() {
        this.props.clearData();
    }

    handleChange = (key, value) => {
        this.setState({
            selectValue: value,
            selectKey: key,
        });
    }

    handleExport = (params)=>{
        const send = this.axios.request;
        send({
            method: 'get',
            url: `/accm-web/pettycash/pettyCashManagement/exportExcel`,
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-Access-Token': localStorage.getItem('token'),
            },
            params,
        }).then(result => {
            Tools.download(result.data, '备用金账户.xls');
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
            //开户
            this.setState({
                openModal:!this.state.openModal,
            })
        }else if(type=='2'){
            //生效
            this.setState({
                effectModal:!this.state.effectModal,
            })
        }else if(type=='3'){
            //生效
            this.setState({
                quotaModal:!this.state.quotaModal,
            })
        }
    }

    render() {
        const {
            searchData,
            page,
            asyncGetList,
            asyncReset,
            loading,
            form,
            initData,
            sysAllDictItems,
        } = this.props;
        const searchOptions = () => {
            return [
                {
                    selfname: '备用金账户号',
                    selfid: 'pettyCashAccount',
                    selftype: 'text',
                }, {
                    selfname: '账户状态',
                    selfid: 'state',
                    selftype: 'searchSelect',
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfHasAll: { value: '', text: '请选择' },
                    selfOptions: stateList,
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
                <ModalNew
                    domProps={{
                        visible:this.state.openModal,
                        onCancel:()=>{
                            this.toggleModal('1')
                        },
                        title:'备用金账户开户',
                        width:'60%',
                        destroyOnClose:true,
                    }}
                    that={this}
                />
                <ModalQuota
                    domProps={{
                        visible:this.state.quotaModal,
                        onCancel:()=>{
                            this.toggleModal('3')
                        },
                        title:'账户提额/降额',
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
                            name:'开户',
                            handleClick:()=>{
                                this.toggleModal('1');
                            },
                            style:{marginRight:'14px'}
                        }, {
                            name:'账户生效/失效',
                            handleClick:()=>{
                                const {
                                    selectValue
                                }=this.state;
                                if(selectValue.length==1){
                                    const target=selectValue[0].state=='01'?'失效':'生效';
                                    Modal.confirm({
                                        title:`账户${target}`,
                                        content:`重置 ${selectValue[0].pettyCashAccountname} 的状态为${target}，请确认。`,
                                        onOk:()=>{
                                            return new Promise((res,rej)=>{
                                                asyncReset({
                                                    id:selectValue[0].id,
                                                    state:selectValue[0].state=='01'?'02':'01'
                                                }).then(result=>{
                                                    this.setState({
                                                        selectValue:[],
                                                        selectKey:[],
                                                    })
                                                    if(result.success){
                                                        message.success(result.message);
                                                        res();
                                                        asyncGetList({
                                                            ...searchData,
                                                        });
                                                    }else{
                                                        message.error(result.message);
                                                        rej();
                                                    }
                                                })
                                            })
                                            
                                        }
                                    })
                                }else{
                                    message.warning('请先选择备用金账户');
                                }
                            },
                            style:{marginRight:'14px'},
                        }, {
                            name:'账户提额/降额',
                            handleClick:()=>{
                                const {
                                    selectValue
                                }=this.state;
                                if(selectValue.length==1){
                                    this.toggleModal('3');
                                }else{
                                    message.warning('请先选择账户');
                                }
                            },
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
        initData: state.spareAccount.initData,
        searchData: state.spareAccount.searchData,
        page: state.spareAccount.page,
        loading: state.loading.effects.spareAccount.asyncGetList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetList: dispatch.spareAccount.asyncGetList,
        asyncReset: dispatch.spareAccount.asyncReset,
        clearData: dispatch.spareAccount.clearData,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
