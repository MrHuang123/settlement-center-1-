import React from 'react';
import { MakeCommonPage } from 'bnq-sys-react-component';
import { connect } from 'react-redux';
import Proptypes, { bool } from 'prop-types';
import {
    Form,
} from 'antd';
import { Tools } from '../../../../util';
import { columnsOptions } from './columns';

class Flow extends React.Component {
    static propTypes = {
        asyncGetList: Proptypes.func,
        initData: Proptypes.array,
        loading: bool,
        // getSysAllDictItems: Proptypes.func,
        // sysAllDictItems: Proptypes.object,
        getClassList: Proptypes.func,
        form: Proptypes.object,
        searchData: Proptypes.object,
        page: Proptypes.object,
        classAllList: Proptypes.array,
    }

    static defaultProps = {
        asyncGetList: () => { },
        initData: [],
        loading: true,
        // getSysAllDictItems: () => { },
        // sysAllDictItems: {},
        getClassList: () => { },
        form: null,
        searchData: {},
        page: {},
        classAllList: [],
    }

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         select1Value: '',
    //         select2Value: '',
    //     };
    // }

    componentDidMount() {
        const { asyncGetList, getClassList } = this.props;
        getClassList();
        asyncGetList({
            pageNo: 1,
            pageSize: 10,
        });
    }

    handleExport = () => {

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

    render() {
        const {
            form,
            initData,
            searchData,
            page,
            asyncGetList,
            loading,
            classAllList,
        } = this.props;
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
        const searchOptions = (options) => {
            return [
                {
                    selfname: '账务类型',
                    selftype: 'searchSelect',
                    selfid: 'billType',
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfHasAll: { value: '', text: '请选择' },
                    selfOptions: options.filter((item) => {
                        return item.classLevel === '01';
                    }).map((item) => {
                        return {
                            id: item.classNo,
                            name: `${item.classNo}-${item.className}`,
                        };
                    }),
                    // onChange: (select1Value) => {
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
                    selfname: '交易类型',
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
                    selfHasAll: { value: '', text: '请选择' },
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    // onChange: (select2Value) => {
                    //     this.props.form.setFieldsValue({
                    //         businessCode: '',
                    //     });
                    //     this.setState({
                    //         select2Value,
                    //     });
                    // },
                }, {
                    selfname: '业务名称',
                    selftype: 'searchSelect',
                    selfid: 'businessType',
                    selfHasAll: { value: '', text: '请选择' },
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
                    selfname: '记账流水号',
                    selfid: 'sequenceNum',
                    selftype: 'text',
                }, {
                    selfname: '帐户号',
                    selfid: 'accountNum',
                    selftype: 'text',
                }, {
                    selfname: '帐户类型',
                    selfid: 'accountType',
                    selftype: 'searchSelect',
                    selfHasAll: { value: '', text: '请选择' },
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfOptions: [{
                        name: '内部账户',
                        id: '1',
                    }, {
                        name: '外部账户',
                        id: '2',
                    }],
                }, {
                    selfname: '记账日期',
                    selfid: 'dateCreated',
                    selftype: 'datepicker',
                    selfDatePickerType: 'rangepicker',
                },
            ];
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
                    scroll={{ x: width }}
                    dataSource={initData}
                    pagination={pagination}
                    rowKey={(record) => {
                        return `${record.inOutId}`;
                    }}
                    loading={loading}
                />
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        searchData: state.inoutList.searchData,
        page: state.inoutList.page,
        initData: state.inoutList.initData,
        loading: state.loading.effects.inoutList.asyncGetList,
        classAllList: state.accountManageRule.classList,
        sysAllDictItems: state.login.sysAllDictItems,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetList: dispatch.inoutList.asyncGetList,
        getClassList: dispatch.accountManageRule.asyncGetClassList,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(Flow));
