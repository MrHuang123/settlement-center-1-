import React from 'react';
import { MakeCommonPage } from 'bnq-sys-react-component';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { Form } from 'antd';
import { Tools } from '../../../../util';
import { searchOptionsCommon } from '../optionsCommon';
import { columnsOptions } from './columns';


class List extends React.Component {
    static propTypes = {
        loading: Proptypes.bool,
        form: Proptypes.object,
        searchData: Proptypes.object,
        classAllList: Proptypes.array,
        initData: Proptypes.array,
        getClassList: Proptypes.func,
        // classMap: Proptypes.object,
        page: Proptypes.object,
        // sysAllDictItems: Proptypes.object,
        getSysAllDictItems: Proptypes.func,
        getList: Proptypes.func,
        clearData: Proptypes.func,
    }

    static defaultProps = {
        loading: true,
        form: null,
        searchData: {},
        page: {},
        classAllList: [],
        initData: [],
        getClassList: () => { },
        // classMap: {},
        // sysAllDictItems: {},
        getSysAllDictItems: () => { },
        getList: () => { },
        clearData: () => { },
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
            getClassList,
            getList,
            getSysAllDictItems,
        } = this.props;
        getClassList();
        getSysAllDictItems();
        getList({
            pageSize: 10,
            pageNo: 1,
        });
    }

    componentWillUnmount() {
        const { clearData } = this.props;
        clearData();
    }

    handleClick = (values) => {
        const { getList } = this.props;
        getList({
            ...values,
            pageSize: 10,
            pageNo: 1,
        });
    }

    handleExport = () => {

    }

    render() {
        const {
            form,
            classAllList,
            initData,
            // classMap,
            searchData,
            page,
            getList,
            loading,
        } = this.props;
        const columns = Tools.genTableOptions(columnsOptions(classAllList, searchOptionsCommon('ruleStatus')));
        let width = 0;
        columns.forEach((element) => {
            if (element.width) {
                width += element.width;
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
            },
        };
        const searchOptions = (options) => {
            return [{
                selfname: '账务类型',
                selftype: 'searchSelect',
                selfid: 'classNoOne',
                selfFieldOptions: {
                    initialValue: '',
                },
                selfHasAll: { value: '', text: '请选择' },
                selfOptions: options.filter((item) => {
                    return item.classLevel === '01';
                }).map((item) => {
                    return {
                        id: item.classNo,
                        name: `${item.classNo}--${item.className}`,
                    };
                }),
                // selfMaps: { id: ['classNo'], name: ['className'] },
                onChange: () => {
                    this.props.form.setFieldsValue({
                        classNoTwo: '',
                        classNoThree: '',
                    });
                    // this.setState({
                    //     select1Value,
                    //     select2Value: '',
                    // });
                },
            }, {
                selfname: '交易类型',
                selftype: 'searchSelect',
                selfid: 'classNoTwo',
                selfOptions: options.filter((item) => {
                    return item.classLevel === '02';
                }).map((item) => {
                    return {
                        id: item.classNo,
                        name: `${item.classNo}--${item.className}`,
                    };
                }),
                selfHasAll: { value: '', text: '请选择' },
                selfFieldOptions: {
                    initialValue: '',
                },
                // selfMaps: { id: ['classNo'], name: ['className'] },
                onChange: () => {
                    // this.setState({
                    //     select2Value,
                    // });
                    this.props.form.setFieldsValue({
                        classNoThree: '',
                    });
                },
            }, {
                selfname: '业务名称',
                selftype: 'searchSelect',
                selfid: 'classNoThree',
                selfHasAll: { value: '', text: '请选择' },
                selfFieldOptions: {
                    initialValue: '',
                },
                // selfMaps: { id: ['classNo'], name: ['className'] },
                selfOptions: options.filter((item) => {
                    return item.classLevel === '03';
                }).map((item) => {
                    return {
                        id: item.classNo,
                        name: `${item.classNo}--${item.className}`,
                    };
                }),
            }];
        };
        return (
            <div>
                <MakeCommonPage
                    divider="true"
                    selfSearchOptions={{
                        components: searchOptions(classAllList),
                        btns: [{
                            selfTypeName: 'search',
                        }, {
                            selfTypeName: 'reset',
                        },
                        // {
                        //     selfTypeName: 'export',
                        // }
                        ],
                        selfSearch: this.handleClick,
                        selfExport: this.handleExport,
                        selfReset: () => {
                            form.resetFields();
                            this.props.form.setFieldsValue({
                                classNoTwo: '',
                                classNoThree: '',
                                classNoOne: '',
                            });
                            // this.setState({
                            //     select1Value: '',
                            //     select2Value: '',
                            // });
                        },
                    }}
                    selfControlBtns={[{
                        name: '新增会计分录',
                        handleClick: () => {
                            // eslint-disable-next-line react/prop-types
                            this.props.history.push('/accountsmanage/rule/new/0');
                        },
                    }]}
                    loading={loading}
                    size="small"
                    scroll={{ x: width }}
                    rowKey={(record) => {
                        return `${record.id}`;
                    }}
                    form={form}
                    columns={columns}
                    dataSource={initData}
                    pagination={pagination}
                />
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        classAllList: state.accountManageRule.classList,
        initData: state.ruleList.initData,
        // classMap: state.accountManageRule.classMap,
        page: state.ruleList.page,
        searchData: state.ruleList.searchData,
        // sysAllDictItems: state.login.sysAllDictItems,
        loading: state.loading.effects.accountManageRule.asyncGetClassList || state.loading.effects.ruleList.asyncGetList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        getClassList: dispatch.accountManageRule.asyncGetClassList,
        getList: dispatch.ruleList.asyncGetList,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
        clearData: dispatch.ruleList.clearData,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
