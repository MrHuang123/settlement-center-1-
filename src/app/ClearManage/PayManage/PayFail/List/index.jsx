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
        sysAllDictItems: Proptypes.object,
        loading: Proptypes.bool,
        getSysAllDictItems: Proptypes.func,
        searchData: Proptypes.object,
        page: Proptypes.object,
        form: Proptypes.object,
    }

    static defaultProps = {
        initData: [],
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
            payDateStart: values.dateCreated && values.dateCreated[0] && values.dateCreated[0].format('YYYY-MM-DD'),
            payDateEnd: values.dateCreated && values.dateCreated[1] && values.dateCreated[1].format('YYYY-MM-DD'),
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
    
    handleRestart=()=>{
        const {
            selectValue
        }=this.state;
        if(selectValue.length===0){
            message.error('请选择项目');
        }else{
            let total=0;
            selectValue.map(item=>{
                total+=item.amount;
            })
            Modal.confirm({
                title:'重新发起付款',
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
                        <p>您正在对以上交易重新发起付款，请确认。</p>
                    </Row>
                </React.Fragment>,
                onOk:()=>{
                    const{
                        asyncRepay,
                    }=this.props;
                    asyncRepay({
                        ids:selectValue.map(item=>{
                            return item.id
                        }).join()
                    }).then(data=>{
                        if(data.success){
                            message.success('重新发起付款成功');
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
                        }
                    })
                }
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
                    selfname: '付款机构',
                    selfid: 'payOrg',
                    selftype: 'searchSelect',
                    selfOptions: sysAllDictItems.business_brchno,
                    selfMaps:{id:'value',name:'title'},
                    selfHasAll: { value: '', text: '请选择' },
                }, {
                    selfname: '付款类型',
                    selftype: 'searchSelect',
                    selfid: 'tradeType',
                    selfOptions: classAllList.filter((item) => {
                        return item.classLevel === '02';
                    }).map((item) => {
                        return {
                            id: item.classNo,
                            name: `${item.classNo}--${item.className}`,
                        };
                    }),
                    // selfOptions: classAllList.filter((item) => {
                    //     return item.classLevel === '02' && item.parentClassNo === this.state.select1Value;
                    // }).map((item) => {
                    //     return {
                    //         id: item.classNo,
                    //         name: `${item.classNo}--${item.className}`,
                    //     };
                    // }),
                    selfHasAll: { value: '', text: '请选择' },
                    selfFieldOptions: {
                        initialValue: '',
                    },
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
                            name: `${item.classNo}--${item.className}`,
                        };
                    }),
                    // selfOptions: classAllList.filter((item) => {
                    //     return item.classLevel === '03' && item.parentClassNo === this.state.select2Value;
                    // }).map((item) => {
                    //     return {
                    //         id: item.classNo,
                    //         name: `${item.classNo}--${item.className}`,
                    //     };
                    // }),
                }, {
                    selfname: '付款日期',
                    selftype: 'datepicker',
                    selfid: 'dateCreated',
                    selfDatePickerType: 'rangepicker',
                    format: 'YYYY/MM/DD',
                }, {
                    selfname: '商户号/客户编号',
                    selfid: 'customerCode',
                    selftype: 'text',
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
                                tradeType:'',
                            });
                        },
                        selfSearch: this.handleClick,
                        selfExport: this.handleExport,
                    }}
                    selfControlBtns={[{
                        name: '重新发起付款',
                        handleClick: this.handleRestart,
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
        initData: state.payFail.initData,
        sysAllDictItems: state.login.sysAllDictItems,
        searchData: state.payFail.searchData,
        page: state.payFail.page,
        loading: state.loading.effects.payFail.asyncGetList,
        classAllList: state.accountManageRule.classList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        getClassList: dispatch.accountManageRule.asyncGetClassList,
        asyncGetList: dispatch.payFail.asyncGetList,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
        asyncRepay: dispatch.payFail.asyncRepay,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
