/* eslint-disable */
import React from 'react';
import { MakeCommonPage } from 'bnq-sys-react-component';
import { connect } from 'react-redux';
import {
    Form,
    Button,
    Modal,
    message,
    Divider,
    Row,
    Col,
} from 'antd';
import { Link } from 'react-router-dom';
import Proptypes from 'prop-types';
import { Tools } from '../../../../util';

class Flow extends React.Component {
    static propTypes = {
        initData: Proptypes.array,
        getList: Proptypes.func,
        getClassList: Proptypes.func,
        classAllList: Proptypes.array,
        sysAllDictItems: Proptypes.object,
        loading: Proptypes.bool,
        getSysAllDictItems: Proptypes.func,
        searchData: Proptypes.object,
        page: Proptypes.object,
        form: Proptypes.object,
        asyncGetReason: Proptypes.func,
    }

    static defaultProps = {
        initData: [],
        getList: () => { },
        getClassList: () => { },
        classAllList: [],
        sysAllDictItems: {},
        loading: true,
        getSysAllDictItems: () => { },
        searchData: {},
        page: {},
        form: null,
        asyncGetReason: () => { },
    }

    constructor(props) {
        super(props);
        this.state = {
            // select1Value: '',
            // select2Value: '',
            sapCertStatus: [],
        };
    }

    componentDidMount() {
        const {
            getList,
            getClassList,
            getSysAllDictItems,
        } = this.props;
        getClassList();
        getSysAllDictItems();
        getList({
            pageNo: 1,
            pageSize: 10,
        })
        .then(data => {
            let sapCertStatus=[];
            for(let k in data){
                sapCertStatus.push({
                    id:k,
                    name:data[k],
                })
            };
            this.setState({
                sapCertStatus
            })
        });
    }

    handleClick = (values) => {
        const { getList } = this.props;
        const send = {
            ...values,
            startRecordTime: values.dateCreated && values.dateCreated[0] && values.dateCreated[0].format('YYYY-MM-DD'),
            endRecordTime: values.dateCreated && values.dateCreated[1] && values.dateCreated[1].format('YYYY-MM-DD'),
        };
        delete send.dateCreated;
        getList({
            ...send,
            pageNo: 1,
            pageSize: 10,
        });
    }

    handleExport() {

    }

    render() {
        const {
            classAllList,
            sysAllDictItems,
            searchData,
            page,
            getList,
            loading,
            asyncRePut,//??????
            asyncPut,//??????
        } = this.props;

        const sapCertStatus=(record)=>{
            if(record.sapCertStatus==4){
                return (<React.Fragment>
                    <Divider type="vertical"/>
                    <a onClick={()=>{
                        asyncRePut({
                            sequenceNum:record.sequenceNum,
                        }).then(data=>{
                            //????????????
                            if(data.code==200){
                                message.success(data.message);
                                getList({
                                    ...searchData,
                                    pageNo: page.current,
                                });
                            }
                        })
                }}>??????</a></React.Fragment>)
            }
        }
        const reversalBtnStatus=(record)=>{
            if(record.reversalBtnStatus==1){
                return (<React.Fragment>
                    <Divider type="vertical"/>
                    <a onClick={()=>{
                        Modal.confirm({
                            title:'??????????????????????????????',
                            content:<React.Fragment>
                                <p>{`???????????????:${record.sequenceNum}`}</p>
                                <p>{`???????????????:${record.orderNum}`}</p>
                            </React.Fragment>,
                            okText:'??????',
                            cancelText:'??????',
                            onOk:()=>{
                                asyncPut({
                                    sequenceNum:record.sequenceNum,
                                }).then(data=>{
                                    //????????????
                                    if(data.code==200){
                                        message.success(data.message);
                                        getList({
                                            ...searchData,
                                            pageNo: page.current,
                                        });
                                    }
                                })
                            },
                        });
                    }}>??????</a>
                </React.Fragment>)
            }else if(record.reversalBtnStatus==2){
                return (<React.Fragment>
                    <Divider type="vertical"/>
                    <span>?????????</span>
                </React.Fragment>)
            }else if(record.reversalBtnStatus==3){
                return (null)
            }
        }

        const columnsOptions = [
            {
                name: '??????',
                width:160,
                dataindex: 'edit',
                render: (text, record) => {
                    return (
                        <div
                            style={{paddingLeft:'18px'}}
                        >
                            <Row type={'flex'} justify="start" align="middle">
                                <Col>
                                    <Link to={`/accountquery/flow/detail/${record.detailId}`}>??????</Link>
                                </Col>
                                {
                                    record.entryNum==1?
                                    <Col>
                                        {
                                            reversalBtnStatus(record)
                                        }
                                    </Col>:
                                    null
                                }
                                {
                                    record.entryNum==1?
                                    <Col>
                                        {
                                            sapCertStatus(record)
                                        }
                                    </Col>:
                                    null
                                }
                            </Row>
                        </div>
                    );
                },
            }, {
                name: '??????',
                dataindex: 'number',
            }, {
                name: '????????????',
                dataindex: 'recordDay',
            }, {
                name: '????????????',
                dataindex: 'recordHMS',
            }, {
                name: '???????????????',
                width: 180,
                dataindex: 'sequenceNum',
                render: (text) => {
                    return (<span>{text.toString()}</span>);
                },
            }, {
                name: '???????????????',
                dataindex: 'orderNum',
                width: 300,
            }, {
                name: '???????????????',
                dataindex: 'businessSerialNumber',
                width: 300,
            }, {
                name: '??????????????????',
                dataindex: 'orderType',
                width: 240,
            }, {
                name: '????????????',
                dataindex: 'billType',
                width: 240,
            }, {
                name: '????????????',
                dataindex: 'tradeType',
                width: 240,
            }, {
                name: '????????????',
                dataindex: 'businessName',
                width: 300,
            }, {
                name: '????????????',
                dataindex: 'entryNum',
            }, {
                name: '????????????',
                dataindex: 'dcFlagName',
            }, {
                name: '??????',
                dataindex: 'entryMoney',
                render: (text) => {
                    return (<span>{text.toFixed(2)}</span>);
                },
            }, {
                name: '????????????',
                dataindex: 'accountName',
                width: 300,
            }, {
                name: '???????????????',
                dataindex: 'innerAccount',
                width: 180,
            }, {
                name: '???????????????',
                dataindex: 'externalAccount',
                width: 180,
            }, {
                name: 'SAP????????????',
                dataindex: 'sapCertStatus',
                width: 180,
                render: (text, record) => {
                    if (text === 4) {
                        // ??????????????????
                        return (
                            <Button
                                type="primary"
                                onClick={() => {
                                    const {
                                        asyncGetReason,
                                    } = this.props;
                                    asyncGetReason({
                                        sequenceNum: record.sequenceNum,
                                    }).then((data) => {
                                        if (data.success) {
                                            Modal.info({
                                                title: '????????????',
                                                width: '50%',
                                                content: <React.Fragment>
                                                    {
                                                        data.result.reasonList.map((item, index) => {
                                                            // eslint-disable-next-line react/no-array-index-key
                                                            return <p key={index}>{item}</p>;
                                                        })
                                                    }
                                                </React.Fragment>,
                                            });
                                        } else {
                                            message.error(data.message);
                                        }
                                    });
                                }}
                            >??????????????????</Button>
                        );
                        // eslint-disable-next-line no-else-return
                    } else {
                        return (<span>{record.sapCertStatusName}</span>);
                    }
                }
            }, {
                name:'???????????????',
                dataindex:'reversalOrderCertName'
            }
        ];

        const searchOptions = (options) => {
            return [
                {
                    selfname: '????????????',
                    selftype: 'searchSelect',
                    selfid: 'billType',
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfHasAll: { value: '', text: '?????????' },
                    selfOptions: options.filter((item) => {
                        return item.classLevel === '01';
                    }).map((item) => {
                        return {
                            id: item.classNo,
                            name: `${item.classNo}-${item.className}`,
                        };
                    }),
                    // onChange: (select1Value) => {
                    //     // eslint-disable-next-line react/prop-types
                    //     this.props.form.setFieldsValue({
                    //         tradeType: '',
                    //         businessCode: '',
                    //     });
                    //     this.setState({
                    //         select1Value,
                    //         select2Value: '',
                    //     });
                    // },
                }, {
                    selfname: '????????????',
                    selftype: 'searchSelect',
                    selfid: 'tradeType',
                    selfOptions: options.filter((item) => {
                        return item.classLevel === '02';
                    }).map((item) => {
                        return {
                            id: item.classNo,
                            name: `${item.classNo}-${item.className}`,
                        };
                    }),
                    // selfOptions: options.filter((item) => {
                    //     return item.classLevel === '02' && item.parentClassNo === this.state.select1Value;
                    // }).map((item) => {
                    //     return {
                    //         id: item.classNo,
                    //         name: `${item.classNo}-${item.className}`,
                    //     };
                    // }),
                    selfHasAll: { value: '', text: '?????????' },
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    // onChange: (select2Value) => {
                    //     // eslint-disable-next-line react/prop-types
                    //     this.props.form.setFieldsValue({
                    //         businessCode: '',
                    //     });
                    //     this.setState({
                    //         select2Value,
                    //     });
                    // },
                }, {
                    selfname: '????????????',
                    selftype: 'searchSelect',
                    selfid: 'businessCode',
                    selfHasAll: { value: '', text: '?????????' },
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfOptions: options.filter((item) => {
                        return item.classLevel === '03';
                    }).map((item) => {
                        return {
                            id: item.classNo,
                            name: `${item.classNo}-${item.className}`,
                        };
                    }),
                    // selfOptions: options.filter((item) => {
                    //     return item.classLevel === '03' && item.parentClassNo === this.state.select2Value;
                    // }).map((item) => {
                    //     return {
                    //         id: item.classNo,
                    //         name: `${item.classNo}-${item.className}`,
                    //     };
                    // }),
                }, {
                    selfname: '???????????????',
                    selfid: 'sequenceNum',
                    selftype: 'text',
                }, {
                    selfname: '???????????????',
                    selfid: 'orderNum',
                    selftype: 'text',
                }, {
                    selfname: '??????????????????',
                    selfid: 'orderType',
                    selftype: 'searchSelect',
                    selfOptions: sysAllDictItems.order_type || [],
                    selfMaps: { id: ['value'], name: ['text'] },
                }, {
                    selfname: '????????????',
                    selfid: 'dateCreated',
                    selftype: 'datepicker',
                    selfDatePickerType: 'rangepicker',
                    format: 'YYYY/MM/DD',
                }, {
                    selfname: 'SAP????????????',
                    selfid: 'sapCertNum',
                    selftype: 'text',
                }, 
                {
                    selfname: '??????????????????',
                    selfid: 'sapCertStatus',
                    selftype: 'searchSelect',
                    selfHasAll: { value: '', text: '?????????' },
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfOptions:this.state.sapCertStatus,
                },
            ];
        };

        const { form, initData } = this.props;
        const columns = Tools.genTableOptions(columnsOptions);
        let width = 0;
        columnsOptions.forEach((item) => {
            if (item.width) {
                width += item.width;
            } else {
                width += 120;
            }
        });
        const pagination = {
            showSizeChanger: true,
            onShowSizeChange: (current, pageSize) => {
                getList({
                    ...searchData,
                    pageNo: 1,
                    pageSize,
                });
            },
            current: searchData.pageNo,
            total: page.total,
            pageSize: page.size,
            onChange: (nextPage) => {
                getList({
                    ...searchData,
                    pageNo: nextPage,
                });
            },
        };
        return (
            <div>
                <MakeCommonPage
                    divider="true"
                    form={form}
                    selfSearchOptions={{
                        components: searchOptions(classAllList),
                        btns: [{
                            selfTypeName: 'search',
                        }, {
                            selfTypeName: 'reset',
                        },
                            // {
                            //     selfTypeName: 'export',
                            // },
                        ],
                        selfReset: () => {
                            form.resetFields();
                            this.props.form.setFieldsValue({
                                tradeType: '',
                                businessCode: '',
                                billType: '',
                            });
                            // this.setState({
                            //     select1Value: '',
                            //     select2Value: '',
                            // });
                        },
                        selfSearch: this.handleClick,
                        selfExport: this.handleExport,
                    }}
                    columns={columns}
                    size="small"
                    rowKey={(record) => {
                        return `${record.detailId}`;
                    }}
                    scroll={{ x: width }}
                    dataSource={initData}
                    pagination={pagination}
                    loading={loading}
                />
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        initData: state.flowList.initData,
        classAllList: state.accountManageRule.classList,
        sysAllDictItems: state.login.sysAllDictItems,
        searchData: state.flowList.searchData,
        page: state.flowList.page,
        loading: state.loading.effects.flowList.asyncGetList || state.loading.effects.flowList.asyncGetReason || state.loading.effects.flowList.asyncPut || state.loading.effects.flowList.asyncRePut,
    };
};
const mapDispatch = (dispatch) => {
    return {
        getList: dispatch.flowList.asyncGetList,
        asyncGetReason: dispatch.flowList.asyncGetReason,
        getClassList: dispatch.accountManageRule.asyncGetClassList,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
        asyncPut:dispatch.flowList.asyncPut,
        asyncRePut:dispatch.flowList.asyncRePut,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(Flow));
