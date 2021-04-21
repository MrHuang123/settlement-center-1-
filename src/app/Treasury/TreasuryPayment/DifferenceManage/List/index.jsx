import React from 'react';
import {
    MakeCommonPage,
} from 'bnq-sys-react-component';
import { connect } from 'react-redux';
import {
    Form,
    message,
} from 'antd';
import Proptypes from 'prop-types';
import { columnsOptions } from './columns';
import { Tools } from '@/util/index';

class List extends React.Component {
    static propTypes = {
        initData: Proptypes.array,
        searchData: Proptypes.object,
        page: Proptypes.object,
        clearData: Proptypes.func,
        asyncGetList: Proptypes.func,
        form: Proptypes.object,
        loading: Proptypes.bool,
        sysAllDictItems: Proptypes.object,
        location: Proptypes.object,
    }

    static defaultProps = {
        initData: {},
        searchData: {},
        page: {},
        clearData: () => { },
        asyncGetList: () => { },
        form: null,
        loading: true,
        sysAllDictItems: {},
        location: {},
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
            asyncGetList,
            location,
        } = this.props;
        if (location.state) {
            asyncGetList({
                ...location.state,
                pageNo: 1,
                pageSize: 10,
            });
        } else {
            asyncGetList({
                pageNo: 1,
                pageSize: 10,
            });
        }
    }

    componentWillUnmount() {
        this.props.clearData();
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
            startRecordTime: values.RecordTime && values.RecordTime[0] && values.RecordTime[0].format('YYYY-MM-DD'),
            endRecordTime: values.RecordTime && values.RecordTime[1] && values.RecordTime[1].format('YYYY-MM-DD'),
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
        } = this.props;
        const searchOptions = () => {
            return [
                {
                    selfname: '差额创建日期',
                    selfid: 'RecordTime',
                    selftype: 'datepicker',
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfDatePickerType: 'rangepicker',
                    format: 'YYYY/MM/DD',
                }, {
                    selfname: '差额处理流水号',
                    selfid: 'serialNumber',
                    selftype: 'text',
                }, {
                    selfname: '处理方式',
                    selfid: 'processType',
                    selftype: 'searchSelect',
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfHasAll: { value: '', text: '请选择' },
                    selfOptions: sysAllDictItems.diff_process_type.map((item) => {
                        return {
                            id: item.value,
                            name: item.text,
                        };
                    }),
                }, {
                    selfname: '处理状态',
                    selfid: 'processStatus',
                    selftype: 'searchSelect',
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfHasAll: { value: '', text: '请选择' },
                    selfOptions: sysAllDictItems.diff_audit_status.map((item) => {
                        return {
                            id: item.value,
                            name: item.text,
                        };
                    }),
                },
            ];
        };

        const columns = Tools.genTableOptions(columnsOptions());
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
                        name: '开始差额处理',
                        handleClick: () => {
                            const {
                                selectValue,
                            } = this.state;
                            // eslint-disable-next-line eqeqeq
                            if (selectValue.length != 1) {
                                message.warning('请选择1条差额处理');
                            } else {
                                window.open(`/treasury/payment/differencemanage/set/${selectValue[0].id}`);
                            }
                        },
                        style: { margin: '0 12px 0 0' },
                    }]}
                    columns={columns}
                    size="small"
                    rowKey={(record) => {
                        return record.index;
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
                        type: 'radio',
                        onChange: this.handleChange,
                        selectedRowKeys: this.state.selectKey,
                    }}
                />
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        initData: state.differenceManage.initData,
        searchData: state.differenceManage.searchData,
        page: state.differenceManage.page,
        loading: state.loading.effects.differenceManage.asyncGetList,
        sysAllDictItems: state.login.sysAllDictItems,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetList: dispatch.differenceManage.asyncGetList,
        clearData: dispatch.differenceManage.clearData,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
