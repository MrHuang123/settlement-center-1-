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
        })
    }

    handleChange = (key, value) => {
        this.setState({
            selectValue: value,
            selectKey: key,
        });
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
        const searchOptions = (options) => {
            return [
                {
                    selfname: '差错日期',
                    selfid: 'dateCreated',
                    selftype: 'datepicker',
                    selfDatePickerType: 'rangepicker',
                    format: 'YYYY/MM/DD',
                },{
                    selfname: '差错处理流水号',
                    selfid: 'errorSequenceNum',
                    selftype: 'text',
                },{
                    selfname: '处理方式',
                    selftype: 'searchSelect',
                    selfid: 'errorOperateType',
                    selfOptions: sysAllDictItems.error_operate_type,
                    selfHasAll: { value: '', text: '请选择' },
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfMaps: { id: ['value'], name: ['title'] },
                }, {
                    selfname: '审核状态',
                    selftype: 'searchSelect',
                    selfid: 'checkStatus',
                    selfHasAll: { value: '', text: '请选择' },
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfOptions: sysAllDictItems.check_status,
                    selfMaps: { id: ['value'], name: ['title'] },
                }, {
                    selfname: '账务所属机构',
                    selftype: 'searchSelect',
                    selfid: 'orgNo',
                    selfHasAll: { value: '', text: '请选择' },
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfOptions: sysAllDictItems.org_no,
                    selfMaps: { id: ['value'], name: ['title'] },
                }, {
                    selfname: '合作机构名称',
                    selftype: 'searchSelect',
                    selfid: 'businessBrchno',
                    selfHasAll: { value: '', text: '请选择' },
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfOptions: sysAllDictItems.business_brchno,
                    selfMaps: { id: ['value'], name: ['title'] },
                }, {
                    selfname: '合作业务',
                    selftype: 'searchSelect',
                    selfid: 'cooperBusinessCode',
                    selfHasAll: { value: '', text: '请选择' },
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfOptions: sysAllDictItems.cooper_business_code,
                    selfMaps: { id: ['value'], name: ['title'] },
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
                })
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
                        }],
                        selfReset: () => {
                            form.resetFields();
                        },
                        selfSearch: this.handleClick,
                        selfExport: this.handleExport,
                    }}
                    selfControlBtns={[{
                        name: '审核',
                        handleClick: () => {
                            const { selectValue } = this.state;
                            if(selectValue.length>0){
                                if(selectValue[0].checkStatus==='1'){
                                    this.props.history.push(`/verifymanage/handleverify/check/${selectValue[0].operateId}`)
                                }else{
                                    message.error('这条差错已经处理过了');
                                }
                            }else{
                                message.error('请选择一条差错');
                            }
                        },
                        type: 'primary',
                        style: { margin: '10px 12px 0 0' },
                    }]}
                    columns={columns}
                    size="small"
                    rowKey={(record) => {
                        return `${record.operateId}`;
                    }}
                    scroll={{ x: width }}
                    dataSource={initData}
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
        initData: state.errorHandleVerifyList.initData,
        sysAllDictItems: state.login.sysAllDictItems,
        searchData: state.errorHandleVerifyList.searchData,
        page: state.errorHandleVerifyList.page,
        loading: state.loading.effects.errorHandleVerifyList.asyncGetList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetList: dispatch.errorHandleVerifyList.asyncGetList,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
