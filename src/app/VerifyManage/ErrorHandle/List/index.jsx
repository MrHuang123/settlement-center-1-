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
                    selfname: '????????????',
                    selfid: 'dateCreated',
                    selftype: 'datepicker',
                    selfDatePickerType: 'rangepicker',
                    format: 'YYYY/MM/DD',
                }, {
                    selfname: '??????????????????',
                    selfid: 'origiOrderNum',
                    selftype: 'text',
                }, {
                    selfname: '???????????????',
                    selfid: 'errorSequenceNum',
                    selftype: 'text',
                }, {
                    selfname: '????????????',
                    selfid: 'errorType',
                    selftype: 'searchSelect',
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfHasAll: { value: '', text: '?????????' },
                    selfOptions: optionsCommon('errorType'),
                }, {
                    selfname: '??????????????????',
                    selftype: 'searchSelect',
                    selfid: 'orgNo',
                    selfOptions: sysAllDictItems.org_no,
                    selfHasAll: { value: '', text: '?????????' },
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfMaps: { id: ['value'], name: ['title'] },
                }, {
                    selfname: '??????????????????',
                    selftype: 'searchSelect',
                    selfid: 'businessBrchno',
                    selfOptions: sysAllDictItems.business_brchno,
                    selfHasAll: { value: '', text: '?????????' },
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfMaps: { id: ['value'], name: ['title'] },
                }, {
                    selfname: '????????????',
                    selftype: 'searchSelect',
                    selfid: 'cooperBusinessCode',
                    selfOptions: sysAllDictItems.cooper_business_code,
                    selfHasAll: { value: '', text: '?????????' },
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
                        name: '????????????',
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
                                        // ???????????????????????????
                                        Modal.error({
                                            title: '???????????????????????????????????????'
                                        });
                                    }
                                    if (item.errorOperateType === '01') {
                                        // ?????? ??????
                                        longTimes += 1;
                                        longMoney += item.errorMoney;
                                    } else if (item.errorOperateType === '02') {
                                        // ?????? ??????
                                        shortTimes += 1;
                                        shortMoney += item.errorMoney;
                                    } else if (item.errorOperateType === '03') {
                                        // ?????? ??????
                                        secondPayTimes += 1;
                                        secondPayMoney += item.errorMoney;
                                    } else if (item.errorOperateType === '04') {
                                        // ?????? ??????
                                        secondBackTimes += 1;
                                        secondBackMoney += item.errorMoney;
                                    }
                                })
                                // ????????????
                                Modal.confirm({
                                    title: '?????????????????????',
                                    content: <Descriptions column={1}>
                                        <Descriptions.Item label="?????????????????????">{selectValue.length}</Descriptions.Item>
                                        <Descriptions.Item label="??????????????????">{longTimes}</Descriptions.Item>
                                        <Descriptions.Item label="???????????????">{longMoney.toFixed(2)}</Descriptions.Item>

                                        <Descriptions.Item label="??????????????????">{shortTimes}</Descriptions.Item>
                                        <Descriptions.Item label="???????????????">{shortMoney.toFixed(2)}</Descriptions.Item>

                                        <Descriptions.Item label="??????????????????">{secondPayTimes}</Descriptions.Item>
                                        <Descriptions.Item label="???????????????">{secondPayMoney.toFixed(2)}</Descriptions.Item>

                                        <Descriptions.Item label="??????????????????">{secondBackTimes}</Descriptions.Item>
                                        <Descriptions.Item label="???????????????">{secondBackMoney.toFixed(2)}</Descriptions.Item>
                                        <p>?????????????????????????????????????????????????????????</p>
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
                                                // ?????????????????????
                                                getList({
                                                    pageNo: 1,
                                                    pageSize: 10,
                                                }).then(data => {
                                                    if (data.success) {
                                                        message.success('???????????????')
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
                                message.error('?????????????????????????????????');
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
