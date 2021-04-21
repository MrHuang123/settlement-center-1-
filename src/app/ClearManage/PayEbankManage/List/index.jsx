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
import { Tools } from '../../../../util';
import Axios from 'axios';

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
    
    handleDetail=(isClear)=>{
        const {
            selectValue,
        }=this.state;
        if(selectValue.length===0){
            message.error('请选择项目');
        }else{
            let total=0;
            selectValue.forEach(item=>{
                total+=item.amount;
            })
            Modal.confirm({
                title:isClear?'确认清账':'下载工行打款文件',
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
                        <p>{isClear?'您正在对以上交易做清账操作，请确认。':'您正在对以上交易做下载工行打款文件操作，请确认。'}</p>
                    </Row>
                </React.Fragment>,
                onOk:()=>{
                    const {
                        handleDown,
                        handleClears,
                        asyncGetList,
                    }=this.props;
                    if(!isClear){
                        const send = this.axios.request;
                        send({
                            method:'get',
                            url:`/accm-web/payment/paymentOnlineBank/exportXls?ids=${selectValue.map(item=>{
                                return item.id
                            }).join()}`,
                            responseType: 'blob',
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8',
                                'X-Access-Token': localStorage.getItem('token'),
                            },
                        }).then(res=>{
                            Tools.download(res.data,'转网银打款文件.xlsx');
                        });
                    }else if(isClear){
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
                        })
                    }
                    // 都需要执行的操作
                    this.setState({
                        selectValue: [],
                        selectKey: [],
                    });
                },
            });
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
                    selfname: '付款类型',
                    selftype: 'searchSelect',
                    selfid: 'tradeType',
                    selfHasAll: { value: '', text: '请选择' },
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
                    selfname: '付款业务',
                    selftype: 'searchSelect',
                    selfid: 'busType',
                    selfHasAll: { value: '', text: '请选择' },
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
                    selfname: '付款日期',
                    selfid: 'dateCreated',
                    selftype: 'datepicker',
                    selfDatePickerType: 'rangepicker',
                    format: 'YYYY/MM/DD',
                }, {
                    selfname: '商户号/客户编号',
                    selfid: 'customerCode',
                    selftype: 'text',
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
                        components: searchOptions(),
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
                        selfExport: this.handleExport,
                    }}
                    selfControlBtns={[{
                        name: '下载工行打款文件',
                        handleClick: ()=>{this.handleDetail(false)},
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
                        handleClick: ()=>{this.handleDetail(true)},
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
                    }}
                />
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        initData: state.payEbank.initData,
        sysAllDictItems: state.login.sysAllDictItems,
        searchData: state.payEbank.searchData,
        page: state.payEbank.page,
        loading: state.loading.effects.payEbank.asyncGetList,
        classAllList: state.accountManageRule.classList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetList: dispatch.payEbank.asyncGetList,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
        getClassList: dispatch.accountManageRule.asyncGetClassList,
        handleDown:dispatch.payEbank.handleDown,
        handleClears:dispatch.payEbank.handleClears,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
