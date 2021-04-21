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
    Input,
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
            e:'',
            select1Value:'001',
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

    handleSubmit=(isPass)=>{
        const {
            selectValue
        } =this.state;
        const {
            asyncGetList,
            asyncPass,
            asyncRefuse,
        }=this.props;
        if(selectValue.length<1){
            message.error('请选择至少选择一条项目');
            return;
        }
        let total=0;
        let bishu=0;
        selectValue.forEach(item=>{
            total+=item.amount;
            bishu+=item.num;
        });
        Modal.confirm({
            title:isPass?'批审核通过':'批审核拒绝',
            width:'50%',
            content:<React.Fragment>
                <Row gutter={[0, 20]}>
                    <Col span={6}>
                        <span>共选择批次数:</span>
                    </Col>
                    <Col span={14}>
                        <span>{selectValue.length}</span>
                    </Col>
                    <Col span={6}>
                        <span>共选择总笔数:</span>
                    </Col>
                    <Col span={14}>
                        <span>{bishu}</span>
                    </Col>
                    <Col span={6}>
                        <span>共选择总金额:</span>
                    </Col>
                    <Col span={14}>
                        <span>{total.toFixed(2)}</span>
                    </Col>
                    <Col span={6}>
                        <span>审批备注:</span>
                    </Col>
                    <Col span={14}>
                        <Input.TextArea onChange={(e)=>{this.setState({
                            e:e.target.value
                        })}} />
                    </Col>
                </Row>
            </React.Fragment>,
            onOk:()=>{
                let ids=selectValue.map(item=>{
                    return item.id;
                });
                if(isPass){
                    return new Promise((resolve,reject)=>{
                        asyncPass({
                            auditRemark:this.state.e,
                            ids,
                        }).then(data=>{
                            if(data.success){
                                message.success('批审核完毕');
                                resolve();
                                asyncGetList({
                                    pageNo: 1,
                                    pageSize: 10,
                                });
                                this.setState({
                                    selectValue: [],
                                    selectKey: [],
                                });
                            }else{
                                message.error(data.message);
                                reject();
                            }
                        })
                    })
                }else{
                    return new Promise((resolve,reject)=>{
                        if(this.state.e.length<1){
                            message.error('请填写审批备注');
                            reject();
                        }
                        asyncRefuse({
                            auditRemark:this.state.e,
                            ids,
                        }).then(data=>{
                            if(data.success){
                                message.success('批审核完毕');
                                resolve();
                                asyncGetList({
                                    pageNo: 1,
                                    pageSize: 10,
                                })
                            }else{
                                message.error(data.message);
                                reject();
                            }
                        })
                    })
                }
            }
        })
    };

    handleDetail=()=>{
        const {
            selectValue
        } =this.state;
        if(selectValue.length!=1){
            message.error('请选择一条项目查看');
            return;
        }
        this.props.history.push(`/clearmanage/paymanage/payverify/detail/${selectValue[0].id}`)
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
                    selftype: 'searchSelect',
                    selfid: 'payOrg',
                    selfOptions: sysAllDictItems.business_brchno,
                    selfHasAll: { value: '', text: '请选择' },
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfMaps: { id: ['value'], name: ['title'] },
                }, {
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
                }, {
                    selfname: '商户号/客户编号',
                    selfid: 'customerCode',
                    selftype: 'text',
                }, {
                    selfname: '商户/客户名称',
                    selfid: 'customerName',
                    selftype: 'text',
                }, {
                    selfname: '审核状态',
                    selftype: 'searchSelect',
                    selfid: 'auditState',
                    selfOptions: sysAllDictItems.payment_order_audit_status,
                    selfHasAll: { value: '', text: '请选择' },
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfMaps: { id: ['value'], name: ['title'] },
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
                    }}
                    selfControlBtns={[{
                        name: '审核通过',
                        handleClick: ()=>{this.handleSubmit(true)},
                        type: 'primary',
                        style: { margin: '10px 12px 0 0' },
                    }, {
                        name: '审核拒绝',
                        handleClick: ()=>{this.handleSubmit(false)},
                        type: 'primary',
                        style: { margin: '10px 12px 0 0' },
                    }, {
                        name: '查看',
                        handleClick: this.handleDetail,
                        type: 'primary',
                        style: { margin: '10px 12px 0 0' },
                    },]}
                    columns={columns}
                    size="small"
                    rowKey={(record) => {
                        return `${record.id}`;
                    }}
                    scroll={{ x: width }}
                    dataSource={initData}
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
        initData: state.payVerify.initData,
        sysAllDictItems: state.login.sysAllDictItems,
        searchData: state.payVerify.searchData,
        page: state.payVerify.page,
        loading: state.loading.effects.payVerify.asyncGetList,
        classAllList: state.accountManageRule.classList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        getClassList: dispatch.accountManageRule.asyncGetClassList,
        asyncGetList: dispatch.payVerify.asyncGetList,
        asyncPass: dispatch.payVerify.asyncPass,
        asyncRefuse: dispatch.payVerify.asyncRefuse,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
