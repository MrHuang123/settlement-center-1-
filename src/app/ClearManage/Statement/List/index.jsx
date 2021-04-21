/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { MakeCommonPage } from 'bnq-sys-react-component';
import Proptypes from 'prop-types';
import {
    Form,
    message,
} from 'antd';
import { columnsOptions } from './columns';
import { Tools } from '../../../../util';

class List extends React.Component {
    static propTypes = {
        loading: Proptypes.bool,
        form: Proptypes.object,
        searchData: Proptypes.object,
        initData: Proptypes.array,
        page: Proptypes.object,
        asyncGetList: Proptypes.func,
        setInner: Proptypes.func,
        clearData: Proptypes.func,
    }

    static defaultProps = {
        initData: {},
        loading: false,
        form: null,
        searchData: {},
        page: {},
        asyncGetList: () => { },
        setInner: () => { },
        clearData: () => { },
    }

    constructor(props) {
        super(props);
        this.state = {
            select1Value: '',
            select2Value: '',
            selectValue: {},
        };
    }

    componentDidMount() {
        const {
            asyncGetList,
            getClassList,
            getSysAllDictItems,
        } = this.props;
        getClassList();
        getSysAllDictItems();
        asyncGetList({
            pageNo: 1,
            pageSize: 10,
        });
    }

    componentWillUnmount() {
        const { clearData } = this.props;
        clearData();
    }

    handleClick = (values) => {
        const { asyncGetList } = this.props;
        const send = {
            ...values,
            payStartDate: values.dateCreated && values.dateCreated[0] && values.dateCreated[0].format('YYYY-MM-DD'),
            payEndDate: values.dateCreated && values.dateCreated[1] && values.dateCreated[1].format('YYYY-MM-DD'),
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
        });
    }

    handleDel = () => {
        const { setInner } = this.props;
        const selectV = this.state.selectValue[0];
        setInner({
            ...selectV,
            internalAccountStatus: 0,
        }).then((cache) => {
            if (cache.success) {
                const { asyncGetList, searchData } = this.props;
                message.success('销户成功');
                asyncGetList({
                    pageNo: searchData.pageNo,
                    pageSize: 10,
                });
            } else {
                message.error(cache.message);
            }
        });
    }

    render() {
        const {
            form,
            searchData,
            page,
            initData,
            loading,
            asyncGetList,
            classAllList,
            sysAllDictItems,
        } = this.props;
        const searchOptions = () => {
            return [{
                selfname: '商户编号/客户编号',
                selftype: 'text',
                selfid: 'customerCode',
            }, {
                selfname: '付款机构',
                selftype: 'searchSelect',
                selfid: 'payOrg',
                selfOptions: sysAllDictItems.business_brchno,
                selfMaps: {
                    id: ['value'],
                    name: 'title',
                },
                selfFieldOptions: {
                    initialValue: '',
                },
            }, {
                selfname: '账务类型',
                selftype: 'searchSelect',
                selfid: 'billType',
                selfFieldOptions: {
                    initialValue: '',
                },
                selfHasAll: { value: '', text: '请选择' },
                selfOptions: classAllList.filter((item) => {
                    return item.classLevel === '01';
                }).map((item) => {
                    return {
                        id: item.classNo,
                        name: `${item.classNo}--${item.className}`,
                    };
                }),
                // onChange: (select1Value) => {
                //     this.props.form.setFieldsValue({
                //         tradeType: '',
                //         busType: '',
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
                selfname: '业务名称',
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
                selfid: 'dateCreated',
                selftype: 'datepicker',
                selfDatePickerType: 'rangepicker',
                format: 'YYYY/MM/DD',
            }];
        };
        const columns = Tools.genTableOptions(columnsOptions(classAllList));
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
        let width = 0;
        columns.forEach((item) => {
            if (item.width) {
                width += item.width;
            } else {
                width += 120;
            }
        });
        return (
            <div>
                <MakeCommonPage
                    divider='hr'
                    selfSearchOptions={{
                        components: searchOptions(),
                        btns: [{
                            selfTypeName: 'search',
                        }, {
                            selfTypeName: 'reset',
                        },
                        // {
                        //     selfTypeName: 'export',
                        // },
                        ],
                        selfSearch: this.handleClick,
                        selfReset: () => {
                            form.resetFields();
                            this.props.form.setFieldsValue({
                                tradeType: '',
                                busType: '',
                                billType: '',
                            });
                            // this.setState({
                            //     select1Value: '',
                            //     select2Value: '',
                            // });
                        },
                    }}
                    // eslint-disable-next-line react/jsx-boolean-value
                    loading={loading}
                    size="small"
                    scroll={{ x: width }}
                    rowKey={(record) => {
                        return record.id;
                    }}
                    form={form}
                    columns={columns}
                    dataSource={initData.map((item,index)=>{
                        return {
                            ...item,
                            index,
                        }
                    })}
                    pagination={pagination}
                />
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        searchData: state.statement.searchData,
        page: state.statement.page,
        initData: state.statement.initData,
        loading: state.loading.effects.statement.asyncGetList,
        classAllList: state.accountManageRule.classList,
        sysAllDictItems: state.login.sysAllDictItems,
    };
};
const mapDispatch = (dispatch) => {
    return {
        getClassList: dispatch.accountManageRule.asyncGetClassList,
        asyncGetList: dispatch.statement.asyncGetList,
        clearData: dispatch.statement.clearData,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
