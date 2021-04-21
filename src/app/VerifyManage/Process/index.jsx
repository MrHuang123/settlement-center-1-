/* eslint-disable */
import React from 'react';
import { MakeCommonPage } from 'bnq-sys-react-component';
import { connect } from 'react-redux';
import {
    Form, message,
} from 'antd';
import Proptypes from 'prop-types';
import { columnsOptions } from './columns';
import { Tools } from '../../../util';

class Process extends React.Component {
    static propTypes = {
        initData: Proptypes.array,
        asyncGetList: Proptypes.func,
        asyncSetDetail: Proptypes.func,
        sysAllDictItems: Proptypes.object,
        loading: Proptypes.bool,
        getSysAllDictItems: Proptypes.func,
        searchData: Proptypes.object,
        page: Proptypes.object,
        form: Proptypes.object,
    }

    static defaultProps = {
        initData: [],
        asyncGetList: () => { },
        asyncSetDetail: () => { },
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
        });
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
            asyncGetList,
            loading,
        } = this.props;
        const searchOptions = () => {
            return [
                {
                    selfname: '对账日期',
                    selfid: 'dateCreated',
                    selftype: 'datepicker',
                    selfDatePickerType: 'rangepicker',
                    format: 'YYYY/MM/DD',
                }, {
                    selfname: '合作机构名称',
                    selftype: 'searchSelect',
                    selfid: 'cooperOrgCode',
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfHasAll: { value: '', text: '请选择' },
                    selfOptions: sysAllDictItems.business_brchno,
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
                }, {
                    selfname: '对账批次号',
                    selfid: 'batchNum',
                    selftype: 'text',
                }, {
                    selfname: '账务所属机构',
                    selftype: 'searchSelect',
                    selfid: 'orgNum',
                    selfOptions: sysAllDictItems.org_no,
                    selfHasAll: { value: '', text: '请选择' },
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfMaps: { id: ['value'], name: ['title'] },
                },
            ];
        };

        const { form, initData } = this.props;
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
                    divider="true"
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
                        },
                        selfSearch: this.handleClick,
                        selfExport: this.handleExport,
                    }}
                    columns={columns}
                    size="small"
                    rowKey={(record) => {
                        return `${record.processId}`;
                    }}
                    scroll={{ x: width }}
                    dataSource={initData}
                    pagination={pagination}
                    loading={loading}
                    rowSelection={{
                        type: 'radio',
                        onChange: this.handleChange,
                        selectedRowKeys: this.state.selectKey,
                        getCheckboxProps: record => ({
                            disabled: record.resultSummaryStatus === '03',
                        }),
                    }}
                    selfControlBtns={[{
                        name: '对账流程续作',
                        handleClick: () => {
                            const { asyncSetDetail }=this.props;
                            const { selectValue }=this.state;
                            if(selectValue[0].resultSummaryStatus==='03'){
                                message.error('已完成的对账无法进行续作操作')
                            }else{
                                asyncSetDetail({
                                    batchNum:selectValue[0].batchNum,
                                }).then(data=>{
                                    if(data.success){
                                        message.error('对帐流程续作成功');
                                        this.setState({
                                            selectValue: [],
                                            selectKey: [],
                                        });
                                    }else{
                                        message.error(data.message);
                                    }
                                })
                            }
                        },
                        type: 'primary',
                    }]}
                />
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        initData: state.process.initData,
        sysAllDictItems: state.login.sysAllDictItems,
        searchData: state.process.searchData,
        page: state.process.page,
        loading: state.loading.effects.process.asyncGetList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetList: dispatch.process.asyncGetList,
        asyncSetDetail: dispatch.process.asyncSetDetail,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(Process));
