/* eslint-disable */
import React from 'react';
import { MakeCommonPage } from 'bnq-sys-react-component';
import { connect } from 'react-redux';
import {
    Form,
    Modal,
    Descriptions,
    message,
} from 'antd';
import Proptypes from 'prop-types';
import { columnsOptions } from './columns';
import { Tools } from '../../../../util';
import { optionsCommon } from '../optionsCommon';

class Process extends React.Component {
    static propTypes = {
        initData: Proptypes.array,
        getList: Proptypes.func,
        sysAllDictItems: Proptypes.object,
        loading: Proptypes.bool,
        getSysAllDictItems: Proptypes.func,
        searchData: Proptypes.object,
        page: Proptypes.object,
        form: Proptypes.object,
    }

    static defaultProps = {
        initData: [],
        getList: () => { },
        getClassList: () => { },
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
        };
    }

    componentDidMount() {
        const {
            getList,
            getSysAllDictItems,
        } = this.props;
        getSysAllDictItems();
        getList({
            pageNo: 1,
            pageSize: 10,
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

    handleChange = (key, value) => {
        this.setState({
            selectValue: value,
            selectKey: key,
        });
    }

    render() {
        const {
            sysAllDictItems,
            searchData,
            page,
            getList,
            loading,
            form,
            initData,
        } = this.props;
        const searchOptions = (sysAllDictItems) => {
            return [
                {
                    selfname: '差错日期',
                    selfid: 'dateCreated',
                    selftype: 'datepicker',
                    selfDatePickerType: 'rangepicker',
                    format: 'YYYY/MM/DD',
                }, {
                    selfname: '原支付订单号',
                    selfid: 'origiOrderNum',
                    selftype: 'text',
                }, {
                    selfname: '差错流水号',
                    selfid: 'errorSequenceNum',
                    selftype: 'text',
                }, {
                    selfname: '差错类型',
                    selfid: 'errorType',
                    selftype: 'searchSelect',
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfHasAll: { value: '', text: '请选择' },
                    selfOptions: optionsCommon('errorType'),
                }, {
                    selfname: '账务所属机构',
                    selftype: 'searchSelect',
                    selfid: 'orgNo',
                    selfOptions: sysAllDictItems.org_no,
                    selfHasAll: { value: '', text: '请选择' },
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfMaps: { id: ['value'], name: ['title'] },
                }, {
                    selfname: '合作机构名称',
                    selftype: 'searchSelect',
                    selfid: 'businessBrchno',
                    selfOptions: sysAllDictItems.business_brchno,
                    selfHasAll: { value: '', text: '请选择' },
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfMaps: { id: ['value'], name: ['title'] },
                }, {
                    selfname: '合作业务',
                    selftype: 'searchSelect',
                    selfid: 'cooperBusinessCode',
                    selfOptions: sysAllDictItems.cooper_business_code,
                    selfHasAll: { value: '', text: '请选择' },
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfMaps: { id: ['value'], name: ['title'] },
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
                this.setState({
                    selectValue: [],
                    selectKey: [],
                });
            },
        };
        return (
            <div>
                <MakeCommonPage
                    divider="true"
                    form={form}
                    selfSearchOptions={{
                        components: searchOptions(sysAllDictItems),
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
                        name: '差错处理',
                        handleClick: () => {
                            const { selectValue } = this.state;
                            let longTimes = 0;
                            let longMoney = 0;

                            let shortTimes = 0;
                            let shortMoney = 0;

                            let secondPayTimes = 0;
                            let secondPayMoney = 0;

                            let secondBackTimes = 0;
                            let secondBackMoney = 0;

                            if (selectValue.length > 1) {
                                let orgNo = selectValue[0].orgNo;
                                selectValue.forEach((item) => {
                                    if (item.orgNo !== orgNo) {
                                        // 选择了两种账务机构
                                        Modal.error({
                                            title: '只能选择一种账务所属机构！'
                                        });
                                    }
                                    if (item.errorOperateType === '01') {
                                        // 长款 退款
                                        longTimes += 1;
                                        longMoney += item.errorMoney;
                                    } else if (item.errorOperateType === '02') {
                                        // 短款 资损
                                        shortTimes += 1;
                                        shortMoney += item.errorMoney;
                                    } else if (item.errorOperateType === '03') {
                                        // 短款 资损
                                        secondPayTimes += 1;
                                        secondPayMoney += item.errorMoney;
                                    } else if (item.errorOperateType === '04') {
                                        // 短款 资损
                                        secondBackTimes += 1;
                                        secondBackMoney += item.errorMoney;
                                    }
                                })
                                // 批量处理
                                Modal.confirm({
                                    title: '差错批处理完成',
                                    content: <Descriptions column={1}>
                                        <Descriptions.Item label="共选择差错笔数">{selectValue.length}</Descriptions.Item>
                                        <Descriptions.Item label="退款处理笔数">{longTimes}</Descriptions.Item>
                                        <Descriptions.Item label="退款总金额">{longMoney.toFixed(2)}</Descriptions.Item>

                                        <Descriptions.Item label="资损处理笔数">{shortTimes}</Descriptions.Item>
                                        <Descriptions.Item label="资损总金额">{shortMoney.toFixed(2)}</Descriptions.Item>

                                        <Descriptions.Item label="再次付款笔数">{secondPayTimes}</Descriptions.Item>
                                        <Descriptions.Item label="付款总金额">{secondPayMoney.toFixed(2)}</Descriptions.Item>

                                        <Descriptions.Item label="再次退款笔数">{secondBackTimes}</Descriptions.Item>
                                        <Descriptions.Item label="付款总金额">{secondBackMoney.toFixed(2)}</Descriptions.Item>
                                        <p>您正在对以上差错发起批量操作，请确认。</p>
                                    </Descriptions>,
                                    onOk: () => {
                                        const {
                                            editTogether,
                                        } = this.props;
                                        editTogether({
                                            ids: selectValue.map((item) => {
                                                return item.errorId;
                                            }).join()
                                        }).then((data) => {
                                            if (data.success) {
                                                // 处理成功，刷新
                                                getList({
                                                    pageNo: 1,
                                                    pageSize: 10,
                                                }).then(data => {
                                                    if (data.success) {
                                                        message.success('批处理完成')
                                                    } else {
                                                        message.error(data.message);
                                                    }
                                                });
                                                this.setState({
                                                    selectValue: [],
                                                    selectKey: [],
                                                });
                                            } else {
                                                message.error(data.message);
                                            }
                                        });
                                    }
                                });
                            } else if (selectValue.length === 1) {
                                this.props.history.push(`/verifymanage/errorhandle/check/${selectValue[0].errorId}`);
                            } else {
                                message.error('请选择至少一条对账差错');
                                return;
                            }
                        },
                        type: 'primary',
                        style: { margin: '10px 12px 0 0' },
                    }]}
                    columns={columns}
                    size="small"
                    rowKey={(record) => {
                        return `${record.errorId}`;
                    }}
                    scroll={{ x: width }}
                    dataSource={initData}
                    pagination={pagination}
                    loading={loading}
                    rowSelection={{
                        type: 'checkbox',
                        onChange: this.handleChange,
                        getCheckboxProps: record => ({
                            disabled: (record.errorStatus !== '06') && (record.errorStatus !== '09')
                        }),
                        selectedRowKeys: this.state.selectKey,
                    }}
                />
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        initData: state.errorHandleList.initData,
        sysAllDictItems: state.login.sysAllDictItems,
        searchData: state.errorHandleList.searchData,
        page: state.errorHandleList.page,
        loading: state.loading.effects.errorHandleList.asyncGetList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        getList: dispatch.errorHandleList.asyncGetList,
        editTogether: dispatch.errorHandleDetail.editTogether,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(Process));
