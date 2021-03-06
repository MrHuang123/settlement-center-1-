/* eslint-disable  */
import React from 'react';
import {
    MakeCommonPage,
} from 'bnq-sys-react-component';
import { connect } from 'react-redux';
import {
    Form,
    Button,
    Upload,
    message,
    Spin,
    Modal,
    Row,
    Col,
} from 'antd';
import Proptypes from 'prop-types';
import Axios from 'axios';
import { columnsOptions, companyType } from './columns';
import { Tools } from '../../../../util/index';

class List extends React.Component {
    static propTypes = {
        initData: Proptypes.array,
        sysAllDictItems: Proptypes.object,
        loading: Proptypes.bool,
        getSysAllDictItems: Proptypes.func,
        searchData: Proptypes.object,
        page: Proptypes.object,
        form: Proptypes.object,
        asyncGetList: Proptypes.func,
    }

    static defaultProps = {
        initData: [],
        sysAllDictItems: {},
        loading: true,
        getSysAllDictItems: () => { },
        searchData: {},
        page: {},
        form: null,
        asyncGetList: () => { },
    }

    constructor(props) {
        super(props);
        this.axios = Axios.create();
        this.state = {
            selectValue: [],
            selectKey: [],
            loading:false,
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
        const send = {
            ...values,
            startPayTime: values.PayTime && values.PayTime[0] && values.PayTime[0].format('YYYY-MM-DD'),
            endPayTime: values.PayTime && values.PayTime[1] && values.PayTime[1].format('YYYY-MM-DD'),
            startUpTime: values.UpTime && values.UpTime[0] && values.UpTime[0].format('YYYY-MM-DD'),
            endUpTime: values.UpTime && values.UpTime[1] && values.UpTime[1].format('YYYY-MM-DD'),
        };
        
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
            sysAllDictItems,
            asyncDown,
            asyncRePay,
            sumBatDetail,
        } = this.props;
        const searchOptions = () => {
            return [
                {
                    selfname: '????????????',
                    selfid: 'companyType',
                    selftype: 'searchSelect',
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfHasAll: { value: '', text: '?????????' },
                    selfOptions: companyType,
                }, {
                    selfname: '??????????????????',
                    selfid: 'receviName',
                    selftype: 'text',
                }, {
                    selfname: '???????????????',
                    selfid: 'receCardno',
                    selftype: 'text',
                }, {
                    selfname: '???????????????',
                    selfid: 'batpayNo',
                    selftype: 'text',
                }, {
                    selfname: '????????????',
                    selfid: 'batpayStatu',
                    selftype: 'searchSelect',
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfHasAll: { value: '', text: '?????????' },
                    selfOptions: sysAllDictItems.batpay_statu.map((item) => {
                        return {
                            id: item.value,
                            name: item.text,
                        };
                    }),
                }, {
                    selfname: '????????????',
                    selfid: 'payDesc',
                    selftype: 'text',
                }, {
                    selfname: '????????????',
                    selfid: 'PayTime',
                    selftype: 'datepicker',
                    selfDatePickerType: 'rangepicker',
                    format: 'YYYY/MM/DD',
                }, {
                    selfname: '??????????????????',
                    selfid: 'UpTime',
                    selftype: 'datepicker',
                    selfDatePickerType: 'rangepicker',
                    format: 'YYYY/MM/DD',
                }
            ];
        };

        const columns = Tools.genTableOptions(columnsOptions(sysAllDictItems));
        // let width = 0;
        // columns.forEach((item) => {
        //     if (item.width) {
        //         width += item.width;
        //     } else {
        //         width += 120;
        //     }
        // });
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
        const uploadProps={
            name:'file',
            showUploadList:false,
            accept:'.xlsx',
            action: '/accm-web/batpay/batpayDetail/importExcel',
            headers:{
                'X-Access-Token':localStorage.getItem('token'),
            },
            beforeUpload:(file)=>{
                const isJpgOrPng = /\.(xlsx)$/.test(file.name);
                if (!isJpgOrPng) {
                    Modal.error({
                        title:'????????????.xlsx????????????',
                        onOk:()=>{
                            this.setState({
                                loading:false,
                            });
                        }
                    });
                }
                return isJpgOrPng;
            },
            onChange: (e) => {
                if(e.file.response){
                    if(e.file.response.success){
                        // message.success(e.file.response.message);
                        this.setState({
                            loading:false,
                        });
                        Modal.success({
                            title:'????????????????????????',
                            onOk:()=>{
                                asyncGetList({
                                    pageNo: 1,
                                    pageSize: 10,
                                });
                            }
                        });
                    }else{
                        // message.error(e.file.response.message);
                        this.setState({
                            loading:false,
                        });
                        Modal.error({
                            title:e.file.response.message,
                        });
                    }
                }else{
                    this.setState({
                        loading:true,
                    })
                };
            },
        }
        return (
            <div>
                <Spin spinning={this.state.loading}>
                    <MakeCommonPage
                        divider={<React.Fragment>
                            <hr style={{margin:'16px 0'}} />
                            {/* <div> */}
                                <span style={{fontSize:'16px'}}>
                                    ???????????????  <span style={{fontSize:'24px',color:'red'}}>{sumBatDetail.sumNum}</span> ??? ??????????????????<span style={{fontSize:'24px',color:'red'}}>{sumBatDetail.sumAmout}</span>  ???
                                </span>
                            {/* </div> */}
                        </React.Fragment>}
                        form={form}
                        tableLayout="fixed"
                        selfSearchOptions={{
                            components: searchOptions(),
                            btns: [{
                                selfTypeName: 'search',
                            }, {
                                selfTypeName: 'reset',
                            }, {
                                selfBtnNode:<React.Fragment>
                                    <Upload {...uploadProps}>
                                        <Button>??????????????????</Button>
                                    </Upload>
                                </React.Fragment>
                            }, {
                                selfBtnName:'??????????????????',
                                selfBtnCallback:()=>{
                                    // ??????
                                    asyncDown().then(data=>{
                                        if(data.success){
                                            window.open(data.message,"_blank");
                                        }
                                    });
                                }
                            }, {
                                selfBtnName:'????????????',
                                selfBtnCallback:()=>{
                                    if(this.state.selectValue.length>0){
                                        // ????????????????????????
                                        let flag=this.state.selectValue.every(item=>{
                                            return item.batpayStatu == '03';
                                        });
                                        if(flag){
                                            let total=0;
                                            this.state.selectValue.forEach(item=>{
                                                total+=Number(item.amout);
                                            });
                                            
                                            Modal.confirm({
                                                title:'????????????',
                                                content:<React.Fragment>
                                                    <hr />
                                                    <Row gutter={[0, 20]}>
                                                        <Col span={10}>
                                                            <span>??????????????????:</span>
                                                        </Col>
                                                        <Col span={14}>
                                                            <span>{this.state.selectValue.length}</span>
                                                        </Col>
                                                        <Col span={10}>
                                                            <span>??????????????????:</span>
                                                        </Col>
                                                        <Col span={14}>
                                                            <span>{total.toFixed(2)}</span>
                                                        </Col>
                                                        <p>???????????????????????????????????????????????????????????????</p>
                                                    </Row>
                                                </React.Fragment>,
                                                onOk:()=>{
                                                    asyncRePay({
                                                        ids:this.state.selectValue.map(item=>{
                                                            return item.id
                                                        }).join()
                                                    }).then(data=>{
                                                        if(data.success){
                                                            message.success(data.message,1,()=>{
                                                                asyncGetList();
                                                                this.setState({
                                                                    selectValue: [],
                                                                    selectKey: [],
                                                                });
                                                            });
                                                        }
                                                    })
                                                }
                                            })
                                        }else{
                                            message.error('???????????????????????????????????????????????????');
                                        }
                                    }else{
                                        message.error('????????????1????????????');
                                    }
                                    
                                }
                            }, {
                                selfBtnName:'??????',
                                selfBtnCallback:()=>{
                                    if(this.state.selectKey.length==1){
                                        window.open(`/payment/onbehalf/reset/${this.state.selectKey[0]}`)
                                        // this.props.history.push(`/payment/onbehalf/reset/${this.state.selectKey[0]}`);
                                    }else if(this.state.selectKey.length>1){
                                        message.error('????????????1????????????');
                                    }else if(this.state.selectKey.length==0){
                                        message.error('????????????1????????????');
                                    }
                                }
                            }, {
                                selfBtnName:'??????',
                                selfBtnCallback:()=>{
                                    if(this.state.selectKey.length==1){
                                        window.open(`/payment/onbehalf/detail/${this.state.selectKey[0]}`);
                                        // this.props.history.push(`/payment/onbehalf/detail/${this.state.selectKey[0]}`);
                                    }else if(this.state.selectKey.length>1){
                                        message.error('????????????1????????????');
                                    }else if(this.state.selectKey.length==0){
                                        message.error('????????????1????????????');
                                    }
                                }
                            }, {
                                selfBtnNode:<React.Fragment>
                                    {/* 666 */}
                                </React.Fragment>
                            }, ],
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
                        rowSelection={{
                            type: 'checknox',
                            onChange: this.handleChange,
                            selectedRowKeys: this.state.selectKey,
                        }}
                    />
                </Spin>
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        initData: state.payment.initData,
        sysAllDictItems: state.login.sysAllDictItems,
        searchData: state.payment.searchData,
        page: state.payment.page,
        loading: state.loading.effects.payment.asyncGetList,
        sumBatDetail:state.payment.sumBatDetail,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetList: dispatch.payment.asyncGetList,
        asyncDown:dispatch.payment.asyncDown,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
        asyncRePay:dispatch.payment.asyncRePay,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
