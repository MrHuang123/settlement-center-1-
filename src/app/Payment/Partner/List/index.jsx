/* eslint-disable */
import React from 'react';
import {
    MakeCommonPage,
} from 'bnq-sys-react-component';
import { connect } from 'react-redux';
import {
    Form,
    message,
    Modal,
    Row,
    Col,
} from 'antd';
import Proptypes from 'prop-types';
import Axios from 'axios';
import { columnsOptions, payState } from './columns';
import { Tools } from '../../../../util/index';

class List extends React.Component {
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
            startPayDate: values.PayTime && values.PayTime[0] && values.PayTime[0].format('YYYY-MM-DD'),
            endPayDate: values.PayTime && values.PayTime[1] && values.PayTime[1].format('YYYY-MM-DD'),
            startUploadDate: values.UpTime && values.UpTime[0] && values.UpTime[0].format('YYYY-MM-DD'),
            endUploadDate: values.UpTime && values.UpTime[1] && values.UpTime[1].format('YYYY-MM-DD'),
        };

        asyncGetList({
            ...send,
            pageNo: 1,
            pageSize: 10,
        });
    }

    handle = (type) => {
        const {
            selectValue
        } = this.state;
        const {
            asyncSettleUp,
            asyncGetList,
        } = this.props;
        if (selectValue.length < 1) {
            message.error('请选择项目');
            return;
        } else {
            let total = 0;
            selectValue.forEach(item => {
                total += Number(item.amount);
            })
            Modal.confirm({
                title: type === '1' ? '下载工行打款文件' : '确认打款完成',
                width: '35%',
                content: <React.Fragment>
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
                            type === '1' ? <p>您正在对以上交易做下载工行打款文件操作，请确认。</p>
                                : <p>您正在对以上交易做确认打款操作，请确认。</p>
                        }
                    </Row>
                </React.Fragment>,
                onOk: () => {
                    if (type === '1') {
                        return new Promise((res,rej)=>{
                            if(selectValue.every((e)=>{
                                return e.payState=='1'
                            })){
                                const send = this.axios.request;
                                send({
                                    method: 'get',
                                    url: `/accm-web/batpay/batpayCooperation/exportXls?ids=${selectValue.map(item => {
                                        return item.id
                                    }).join()}`,
                                    responseType: 'blob',
                                    headers: {
                                        'Content-Type': 'application/json;charset=utf-8',
                                        'X-Access-Token': localStorage.getItem('token'),
                                    },
                                }).then(result => {
                                    Tools.download(result.data, '打款文件.xls');
                                    res();
                                });
                            }else{
                                message.error('只能选择打款状态为“待付款”的条目');
                                rej();
                            }
                        })
                    } else if (type === '2') {
                        asyncSettleUp({
                            ids: selectValue.map(item => {
                                return item.id
                            }).join(',')
                        }).then(data => {
                            if (data.success) {
                                message.success('确认打款成功');
                                asyncGetList({
                                    pageNo: 1,
                                    pageSize: 10,
                                });
                            } else {
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
        }
    };

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
                    selfname: '代付批次号',
                    selfid: 'batchId',
                    selftype: 'text',
                }, {
                    selfname: '批次上传时间',
                    selfid: 'UpTime',
                    selftype: 'datepicker',
                    selfDatePickerType: 'rangepicker',
                    format: 'YYYY/MM/DD',
                }, {
                    selfname: '打款状态',
                    selfid: 'payState',
                    selftype: 'searchSelect',
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfHasAll: { value: '', text: '请选择' },
                    selfOptions: payState,
                }, {
                    selfname: '打款日期',
                    selfid: 'PayTime',
                    selftype: 'datepicker',
                    selfDatePickerType: 'rangepicker',
                    format: 'YYYY/MM/DD',
                },
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
        return (
            <div>
                <MakeCommonPage
                    divider="hr"
                    form={form}
                    tableLayout="fixed"
                    selfSearchOptions={{
                        components: searchOptions(),
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
                        handleClick: () => {
                            this.handle('1');
                        },
                        type: 'primary',
                        style: { margin: '0 12px 0 0' },
                    }, {
                        name: '登陆工行网银',
                        handleClick: () => {
                            var tempwindow = window.open('_blank');
                            tempwindow.location = 'http://www.icbc.com.cn/icbc/';
                        },
                        type: 'primary',
                        style: { margin: '0 12px 0 0' },
                    }, {
                        name: '确认打款完成',
                        handleClick: () => {
                            this.handle('2');
                        },
                        type: 'primary',
                        style: { margin: '0 12px 0 0' },
                    }]}
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
                        type: 'checkbox',
                        onChange: this.handleChange,
                        selectedRowKeys: this.state.selectKey,
                        getCheckboxProps: record =>{
                            return {
                                disabled:record.payState==1?false:true,
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
        initData: state.partner.initData,
        sysAllDictItems: state.login.sysAllDictItems,
        searchData: state.partner.searchData,
        page: state.partner.page,
        loading: state.loading.effects.partner.asyncGetList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetList: dispatch.partner.asyncGetList,
        asyncDown: dispatch.partner.asyncDown,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
        asyncSettleUp: dispatch.partner.asyncSettleUp,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
