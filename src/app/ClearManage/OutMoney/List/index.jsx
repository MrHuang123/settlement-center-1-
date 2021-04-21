/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { MakeCommonPage } from 'bnq-sys-react-component';
import Proptypes from 'prop-types';
import {
    Form,
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
        clearData: Proptypes.func,
        sysAllDictItems: Proptypes.object,
        getSysAllDictItems: Proptypes.func,
    }

    static defaultProps = {
        initData: {},
        loading: false,
        form: null,
        searchData: {},
        page: {},
        asyncGetList: () => { },
        clearData: () => { },
        sysAllDictItems: {},
        getSysAllDictItems: () => { },
    }

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         select1Value: '',
    //         select2Value: '',
    //     };
    // }

    componentDidMount() {
        const {
            asyncGetList,
            getSysAllDictItems,
            getClassList,
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
            tradeStartTime: values.dateCreated && values.dateCreated[0] && values.dateCreated[0].format('YYYY-MM-DD 00:00:00'),
            tradeEndTime: values.dateCreated && values.dateCreated[1] && values.dateCreated[1].format('YYYY-MM-DD 23:59:59'),
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
            searchData,
            page,
            initData,
            loading,
            asyncGetList,
            sysAllDictItems,
            classAllList,
        } = this.props;
        const searchOptions = () => {
            return [{
                selfname: '商户编号/客户编号',
                selftype: 'text',
                selfid: 'customerCode',
            }, {
                selfname: '业务订单号',
                selftype: 'text',
                selfid: 'primaryOrder',
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
                //         businessCode: '',
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
                selfname: '账务所属机构',
                selftype: 'searchSelect',
                selfid: 'orgCode',
                selfFieldOptions: {
                    initialValue: '',
                },
                selfHasAll: true,
                selfOptions: sysAllDictItems.org_no,
                selfMaps: { id: ['value'], name: ['title'] },
            }, {
                selfname: '交易日期',
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
                        }],
                        selfSearch: this.handleClick,
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
                    }}
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
        searchData: state.outMoney.searchData,
        page: state.outMoney.page,
        initData: state.outMoney.initData,
        loading: state.loading.effects.outMoney.asyncGetList,
        sysAllDictItems: state.login.sysAllDictItems,
        classAllList: state.accountManageRule.classList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        getClassList: dispatch.accountManageRule.asyncGetClassList,
        asyncGetList: dispatch.outMoney.asyncGetList,
        clearData: dispatch.outMoney.clearData,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
