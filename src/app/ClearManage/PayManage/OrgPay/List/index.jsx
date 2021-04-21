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
            message.error('请选择项目');
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
                title:type==='1'?'下载工行打款文件':'确认清账',
                width:'35%',
                content:<React.Fragment>
                    <hr />
                    <Row gutter={[0, 20]}>
                        <Col span={10}>
                            <span>共选择总笔数:</span>
                        </Col>
                        <Col span={14}>
                            <span>{selectValue.length}</span>
                        </Col>
                        <Col span={10}>
                            <span>共选择总金额:</span>
                        </Col>
                        <Col span={14}>
                            <span>{total.toFixed(2)}</span>
                        </Col>
                        {
                            type==='1'?<p>您正在对以上交易做下载工行打款文件操作，请确认。</p>
                            :<p>您正在对以上交易做清账操作，请确认。</p>
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
                            Tools.download(res.data,'备付金打款文件.xls');
                        });
                    }else if(type==='2'){
                        handleClears({
                            ids:selectValue.map(item=>{
                                return item.id
                            }).join(',')
                        }).then(data=>{
                            if(data.success){
                                message.success('清账成功');
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
                    // 特殊情况，需要展示index
                    arr.push(item.index);
                }
            })
            message.error(`序号${arr.join()}对应条目所属付款日期和合作付款机构下存在未处理完成的付款单`);
        }
        
    };

    handleDetail=()=>{
        const {
            selectValue
        } =this.state;
        if(selectValue.length<1){
            message.error('请选择项目');
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
                    selfname: '付款机构',
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
                    selfname: '操作状态',
                    selftype: 'searchSelect',
                    selfid: 'dealStatus',
                    selfOptions: commonOption('dealStatus'),
                    selfHasAll: { value: '', text: '请选择' },
                    selfFieldOptions: {
                        initialValue: '',
                    },
                }, {
                    selfname: '付款状态',
                    selftype: 'searchSelect',
                    selfid: 'payState',
                    selfOptions: commonOption('payState'),
                    selfHasAll: { value: '', text: '请选择' },
                    selfFieldOptions: {
                        initialValue: '',
                    },
                }, {
                    selfname: '付款日期',
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
                        name: '下载工行打款文件',
                        handleClick: ()=>{this.handle('1')},
                        type: 'primary',
                        style: { margin: '10px 12px 0 0' },
                    }, {
                        name: '登录工行网银',
                        handleClick: ()=>{
                            var tempwindow=window.open('_blank');
                            tempwindow.location='http://www.icbc.com.cn/icbc/';
                        },
                        type: 'primary',
                        style: { margin: '10px 12px 0 0' },
                    }, {
                        name: '确认清账',
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
