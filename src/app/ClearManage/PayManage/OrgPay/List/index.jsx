/* eslint-disable */
import React from 'react';
import { MakeCommonPage } from 'bnq-sys-react-component';
import { connect } from 'react-redux';
import {
    Form,
    Modal,
    message,
    Row,
    Col,
} from 'antd';
import Axios from 'axios';
import Proptypes from 'prop-types';
import { columnsOptions, commonOption } from './columns';
import { Tools } from '../../../../../util';

class List extends React.Component {
    static propTypes = {
        initData: Proptypes.array,
        errorHandleVerifyList: Proptypes.func,
        sysAllDictItems: Proptypes.object,
        loading: Proptypes.bool,
        getSysAllDictItems: Proptypes.func,
        searchData: Proptypes.object,
        page: Proptypes.object,
        form: Proptypes.object,
    }

    static defaultProps = {
        initData: [],
        errorHandleVerifyList: () => { },
        sysAllDictItems: {},
        loading: true,
        getSysAllDictItems: () => { },
        searchData: {},
        page: {},
        form: null,
    }

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

    handleClick = (values) => {
        const { asyncGetList } = this.props;
        const send = {
            ...values,
            startPayDate: values.dateCreated && values.dateCreated[0] && values.dateCreated[0].format('YYYY-MM-DD'),
            endPayDate: values.dateCreated && values.dateCreated[1] && values.dateCreated[1].format('YYYY-MM-DD'),
        };
        delete send.dateCreated;
        asyncGetList({
            ...send,
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

    handle=(type)=>{
        const {
            selectValue
        } =this.state;
        if(selectValue.length<1){
            message.error('???????????????');
            return;
        }
        if(selectValue.every((item)=>{
            return item.display==1;
        })){
            let total=0;
            selectValue.forEach(item=>{
                total+=item.amount;
            })
            Modal.confirm({
                title:type==='1'?'????????????????????????':'????????????',
                width:'35%',
                content:<React.Fragment>
                    <hr />
                    <Row gutter={[0, 20]}>
                        <Col span={10}>
                            <span>??????????????????:</span>
                        </Col>
                        <Col span={14}>
                            <span>{selectValue.length}</span>
                        </Col>
                        <Col span={10}>
                            <span>??????????????????:</span>
                        </Col>
                        <Col span={14}>
                            <span>{total.toFixed(2)}</span>
                        </Col>
                        {
                            type==='1'?<p>????????????????????????????????????????????????????????????????????????</p>
                            :<p>??????????????????????????????????????????????????????</p>
                        }
                    </Row>
                </React.Fragment>,
                onOk:()=>{
                    const {
                        handleDown,
                        handleClears,
                        asyncGetList,
                    }=this.props;
                    
                    if(type==='1'){
                        const send = this.axios.request;
                        send({
                            method:'get',
                            url:`/accm-web/payment/paymentCooperation/exportXls?ids=${selectValue.map(item=>{
                                return item.id
                            }).join()}`,
                            responseType: 'blob',
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8',
                                'X-Access-Token': localStorage.getItem('token'),
                            },
                        }).then(res=>{
                            Tools.download(res.data,'?????????????????????.xls');
                        });
                    }else if(type==='2'){
                        handleClears({
                            ids:selectValue.map(item=>{
                                return item.id
                            }).join(',')
                        }).then(data=>{
                            if(data.success){
                                message.success('????????????');
                                asyncGetList({
                                    pageNo: 1,
                                    pageSize: 10,
                                });
                            }else{
                                message.error(data.message);
                            }
                        });
                    }
                    this.setState({
                        selectValue: [],
                        selectKey: [],
                    });
                }
            })
        }else{
            let arr=[];
            selectValue.forEach(item=>{
                if(item.display!=1){
                    // ???????????????????????????index
                    arr.push(item.index);
                }
            })
            message.error(`??????${arr.join()}???????????????????????????????????????????????????????????????????????????????????????`);
        }
        
    };

    handleDetail=()=>{
        const {
            selectValue
        } =this.state;
        if(selectValue.length<1){
            message.error('???????????????');
            return;
        }
        this.props.history.push('/clearmanage/paymanage/payverify/detail/0')
    }

    render() {
        const {
            classAllList,
            sysAllDictItems,
            searchData,
            page,
            asyncGetList,
            loading,
            form,
            initData,
        } = this.props;
        const searchOptions = () => {
            return [
                {
                    selfname: '????????????',
                    selfid: 'payOrg',
                    selftype: 'searchSelect',
                    selfOptions: sysAllDictItems.business_brchno,
                    selfMaps: {
                        id: ['value'],
                        name: 'title',
                    },
                    selfFieldOptions: {
                        initialValue: '',
                    },
                }, {
                    selfname: '????????????',
                    selftype: 'searchSelect',
                    selfid: 'dealStatus',
                    selfOptions: commonOption('dealStatus'),
                    selfHasAll: { value: '', text: '?????????' },
                    selfFieldOptions: {
                        initialValue: '',
                    },
                }, {
                    selfname: '????????????',
                    selftype: 'searchSelect',
                    selfid: 'payState',
                    selfOptions: commonOption('payState'),
                    selfHasAll: { value: '', text: '?????????' },
                    selfFieldOptions: {
                        initialValue: '',
                    },
                }, {
                    selfname: '????????????',
                    selfid: 'dateCreated',
                    selftype: 'datepicker',
                    selfDatePickerType: 'rangepicker',
                    format: 'YYYY/MM/DD',
                }
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
                    selectKey: [],
                });
            },
        };
        return (
            <div>
                <MakeCommonPage
                    divider='hr'
                    form={form}
                    selfSearchOptions={{
                        components: searchOptions(classAllList),
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
                        name: '????????????????????????',
                        handleClick: ()=>{this.handle('1')},
                        type: 'primary',
                        style: { margin: '10px 12px 0 0' },
                    }, {
                        name: '??????????????????',
                        handleClick: ()=>{
                            var tempwindow=window.open('_blank');
                            tempwindow.location='http://www.icbc.com.cn/icbc/';
                        },
                        type: 'primary',
                        style: { margin: '10px 12px 0 0' },
                    }, {
                        name: '????????????',
                        handleClick: ()=>{this.handle('2')},
                        type: 'primary',
                        style: { margin: '10px 12px 0 0' },
                    },]}
                    columns={columns}
                    size="small"
                    rowKey={(record) => {
                        return `${record.id}`;
                    }}
                    scroll={{ x: width }}
                    dataSource={initData.map((item,index)=>{
                        return {
                            ...item,
                            index:index+1,
                        }
                    })}
                    pagination={pagination}
                    loading={loading}
                    rowSelection={{
                        type: 'checkbox',
                        onChange: this.handleChange,
                        selectedRowKeys:this.state.selectKey,
                        getCheckboxProps: record =>{
                            return {
                                disabled:record.dealStatus==1?false:true,
                            }
                        },
                    }}
                />
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        initData: state.orgPay.initData,
        sysAllDictItems: state.login.sysAllDictItems,
        searchData: state.orgPay.searchData,
        page: state.orgPay.page,
        loading: state.loading.effects.orgPay.asyncGetList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetList: dispatch.orgPay.asyncGetList,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
        handleDown:dispatch.orgPay.handleDown,
        handleClears:dispatch.orgPay.handleClears,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
