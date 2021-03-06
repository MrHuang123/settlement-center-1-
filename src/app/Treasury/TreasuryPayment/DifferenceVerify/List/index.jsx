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
        } = this.props;
        asyncGetList({
            pageNo: 1,
            pageSize: 10,
        });
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
        delete send.RecordTime;
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
                    selfname: '??????????????????',
                    selfid: 'RecordTime',
                    selftype: 'datepicker',
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfDatePickerType: 'rangepicker',
                    format: 'YYYY/MM/DD',
                }, {
                    selfname: '?????????????????????',
                    selfid: 'serialNumber',
                    selftype: 'text',
                }, {
                    selfname: '????????????',
                    selfid: 'processType',
                    selftype: 'searchSelect',
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfHasAll: { value: '', text: '?????????' },
                    selfOptions: sysAllDictItems.diff_process_type.map((item) => {
                        return {
                            id: item.value,
                            name: item.text,
                        };
                    }),
                }, {
                    selfname: '????????????',
                    selfid: 'processStatus',
                    selftype: 'searchSelect',
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfHasAll: { value: '', text: '?????????' },
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
                        name: '??????',
                        handleClick: () => {
                            const {
                                selectKey,
                                selectValue,
                            } = this.state;
                            if (selectKey.length === 1) {
                                window.open(`/treasury/payment/differenceverify/verify/${selectValue[0].id}`);
                            } else {
                                message.warning('?????????1?????????');
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
        initData: state.differenceVerify.initData,
        searchData: state.differenceVerify.searchData,
        page: state.differenceVerify.page,
        loading: state.loading.effects.differenceVerify.asyncGetList,
        sysAllDictItems: state.login.sysAllDictItems,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetList: dispatch.differenceVerify.asyncGetList,
        clearData: dispatch.differenceVerify.clearData,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
