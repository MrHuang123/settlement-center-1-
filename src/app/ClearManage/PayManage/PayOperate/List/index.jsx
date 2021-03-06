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
import Proptypes from 'prop-types';
import { columnsOptions } from './columns';
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
        this.state = {
            selectValue: [],
            selectKey: [],
            // select1Value:'001',
            // select2Value:'',
        };
    }

    componentDidMount() {
        const {
            asyncGetList,
            getSysAllDictItems,
            getClassList,
        } = this.props;
        getClassList();
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
            startRecordTime: values.dateCreated && values.dateCreated[0] && values.dateCreated[0].format('YYYY-MM-DD'),
            endRecordTime: values.dateCreated && values.dateCreated[1] && values.dateCreated[1].format('YYYY-MM-DD'),
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

    handlePay=(type)=>{
        const {
            selectValue
        } =this.state;
        if(selectValue.length<1){
            message.error('?????????????????????')
        }else{
            let total=0;
            let bishu=0;
            selectValue.forEach(item=>{
                total+=item.amount;
                bishu+=item.num;
            });
            if((type==='1')||(type==='2')||(type==='3')){
                // ?????????
                Modal.confirm({
                    width:'50%',
                    title: type==='1'?'???????????????':(type==='2'?'??????????????????':'???????????????'),
                    content:<React.Fragment>
                        <Row gutter={[0, 20]}>
                            <Col span={6}>
                                <span>??????????????????:</span>
                            </Col>
                            <Col span={14}>
                                <span>{selectValue.length}</span>
                            </Col>
                            <Col span={6}>
                                <span>??????????????????:</span>
                            </Col>
                            <Col span={14}>
                                <span>{bishu}</span>
                            </Col>
                            <Col span={6}>
                                <span>??????????????????:</span>
                            </Col>
                            <Col span={14}>
                                <span>{total.toFixed(2)}</span>
                            </Col>
                            <Col span={24}>
                                <span>????????????????????????????????????????????????????????????</span>
                            </Col>
                        </Row>
                    </React.Fragment>,
                    onOk:()=>{
                        const{
                            gatherPay,
                            gatherEbank,
                            asyncGetList,
                            gatherCancel,
                        }=this.props;
                        if(type==='1'){
                            // ?????????
                            gatherPay({
                                orderIds:selectValue.map(item=>{
                                    return item.orderId
                                }).join(',')
                            }).then(data=>{
                                if(data.success){
                                    message.success('???????????????');
                                    asyncGetList({
                                        pageNo: 1,
                                        pageSize: 10,
                                    })
                                }else{
                                    message.error(data.message);
                                }
                            })
                        }else if(type==='2'){
                            // ???????????????
                            gatherEbank({
                                orderIds:selectValue.map(item=>{
                                    return item.orderId
                                }).join(',')
                            }).then(data=>{
                                if(data.success){
                                    message.success('????????????????????????');
                                    asyncGetList({
                                        pageNo: 1,
                                        pageSize: 10,
                                    })
                                }else{
                                    message.error(data.message);
                                }
                            })
                        }else if(type==='3'){
                            // ???????????????
                            gatherCancel({
                                orderIds:selectValue.map(item=>{
                                    return item.orderId
                                }).join(',')
                            }).then(data=>{
                                if(data.success){
                                    message.success('?????????????????????');
                                    asyncGetList({
                                        pageNo: 1,
                                        pageSize: 10,
                                    })
                                }else{
                                    message.error(data.message);
                                }
                            })
                        }
                        // public option
                        this.setState({
                            selectValue: [],
                            selectKey: [],
                        });
                    }
                });
            }
        }
    }

    batchDetail=()=>{
        const { selectValue } =this.state;
        if(selectValue.length>1){
            message.error('??????????????????????????????');
        }else if(selectValue.length===0){
            message.error('???????????????');
        }else{
            this.props.history.push(`/clearmanage/paymanage/payoperate/detail/${selectValue[0].orderId}`);
        }
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
                    selfid: 'tradeType',
                    selfHasAll: { value: '', text: '?????????' },
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfOptions: classAllList.filter((item) => {
                        return item.classLevel === '02';
                    }).map((item) => {
                        return {
                            id: item.classNo,
                            name: `${item.classNo}-${item.className}`,
                        };
                    }),
                    // selfOptions: classAllList.filter((item) => {
                    //     return item.classLevel === '02' && item.parentClassNo === this.state.select1Value;
                    // }).map((item) => {
                    //     return {
                    //         id: item.classNo,
                    //         name: `${item.classNo}-${item.className}`,
                    //     };
                    // }),
                    // onChange: (select2Value) => {
                    //     this.setState({
                    //         select2Value,
                    //     });
                    //     this.props.form.setFieldsValue({
                    //         busType: '',
                    //     });
                    // },
                }, {
                    selfname: '????????????',
                    selftype: 'searchSelect',
                    selfid: 'busType',
                    selfHasAll: { value: '', text: '?????????' },
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfOptions: classAllList.filter((item) => {
                        return item.classLevel === '03';
                    }).map((item) => {
                        return {
                            id: item.classNo,
                            name: `${item.classNo}-${item.className}`,
                        };
                    }),
                    // selfOptions: classAllList.filter((item) => {
                    //     return item.classLevel === '03' && item.parentClassNo === this.state.select2Value;
                    // }).map((item) => {
                    //     return {
                    //         id: item.classNo,
                    //         name: `${item.classNo}-${item.className}`,
                    //     };
                    // }),
                }, {
                    selfname: '??????????????????',
                    selftype: 'searchSelect',
                    selfid: 'operState',
                    selfHasAll: { value: '', text: '?????????' },
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfOptions: sysAllDictItems.payment_order_oper_status,
                    selfMaps: { id: ['value'], name: ['title'] },
                }, {
                    selfname: '????????????',
                    selfid: 'dateCreated',
                    selftype: 'datepicker',
                    selfDatePickerType: 'rangepicker',
                    format: 'YYYY/MM/DD',
                }, {
                    selfname: '?????????/????????????',
                    selfid: 'customerCode',
                    selftype: 'text',
                }, {
                    selfname: '??????/????????????',
                    selfid: 'customerName',
                    selftype: 'text',
                }
            ];
        };

        const columns = Tools.genTableOptions(columnsOptions(sysAllDictItems,classAllList));
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
                            // this.setState({
                            //     select2Value:'',
                            // });
                            this.props.form.setFieldsValue({
                                busType: '',
                                tradeType: '',
                            });
                        },
                        selfSearch: this.handleClick,
                    }}
                    selfControlBtns={[{
                        name: '?????????',
                        handleClick: ()=>{this.handlePay('1')},
                        type: 'primary',
                        style: { margin: '10px 12px 0 0' },
                    }, {
                        name: '????????????',
                        handleClick: ()=>{this.handlePay('2')},
                        type: 'primary',
                        style: { margin: '10px 12px 0 0' },
                    }, {
                        name: '?????????',
                        handleClick: ()=>{this.handlePay('3')},
                        type: 'primary',
                        style: { margin: '10px 12px 0 0' },
                    }, {
                        name: '????????????',
                        handleClick: this.batchDetail,
                        type: 'primary',
                        style: { margin: '10px 12px 0 0' },
                    },]}
                    columns={columns}
                    size="small"
                    rowKey={(record) => {
                        return `${record.orderId}`;
                    }}
                    scroll={{ x: width }}
                    dataSource={initData.map((item,index)=>{
                        return {
                            ...item,
                            index,
                        }
                    })}
                    pagination={pagination}
                    loading={loading}
                    rowSelection={{
                        type: 'checkbox',
                        onChange: this.handleChange,
                        selectedRowKeys:this.state.selectKey,
                    }}
                />
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        initData: state.payOperate.initData,
        sysAllDictItems: state.login.sysAllDictItems,
        searchData: state.payOperate.searchData,
        page: state.payOperate.page,
        loading: state.loading.effects.payOperate.asyncGetList,
        classAllList: state.accountManageRule.classList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        getClassList: dispatch.accountManageRule.asyncGetClassList,
        asyncGetList: dispatch.payOperate.asyncGetList,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
        gatherPay: dispatch.payOperate.gatherPay,
        gatherEbank: dispatch.payOperate.gatherEbank,
        gatherCancel: dispatch.payOperate.gatherCancel,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
