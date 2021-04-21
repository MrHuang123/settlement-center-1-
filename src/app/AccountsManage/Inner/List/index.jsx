import React from 'react';
import { connect } from 'react-redux';
import { MakeCommonPage } from 'bnq-sys-react-component';
import Proptypes from 'prop-types';
import {
    Form,
    Modal,
    message,
} from 'antd';
import { searchOptions } from './options';
import { columnsOptions } from './columns';
import { Tools } from '../../../../util';

class List extends React.Component {
    static propTypes = {
        loading: Proptypes.bool,
        form: Proptypes.object,
        searchData: Proptypes.object,
        initData: Proptypes.array,
        page: Proptypes.object,
        getClassAll: Proptypes.func,
        getList: Proptypes.func,
        classAll: Proptypes.array,
        setInner: Proptypes.func,
        // list: Proptypes.array,
        clearData: Proptypes.func,
    }

    static defaultProps = {
        initData: {},
        loading: false,
        form: null,
        searchData: {},
        page: {},
        // list: [],
        getClassAll: () => { },
        getList: () => { },
        classAll: [],
        setInner: () => { },
        clearData: () => { },
    }

    constructor(props) {
        super(props);
        this.state = {
            selectValue: {},
            selectKey: [],
        };
    }

    componentDidMount() {
        const { getList, getClassAll } = this.props;
        getClassAll();
        getList({
            pageNo: 1,
            pageSize: 10,
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
            pageNo: 1,
            pageSize: 10,
        });
    }

    handleExport = (values) => {
        const { getList } = this.props;
        getList({
            ...values,
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

    handleDel = () => {
        const { setInner } = this.props;
        const selectV = this.state.selectValue[0];
        setInner({
            ...selectV,
            internalAccountStatus: 0,
        }).then((cache) => {
            if (cache.success) {
                const { getList, searchData } = this.props;
                message.success('销户成功');
                getList({
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
            classAll,
            loading,
            getList,
        } = this.props;
        const columns = Tools.genTableOptions(columnsOptions(classAll));
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
                    selectKey: [],
                    selectValue: [],
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
                    divider="true"
                    selfSearchOptions={{
                        components: searchOptions(classAll),
                        btns: [{
                            selfTypeName: 'search',
                        }, {
                            selfTypeName: 'reset',
                        },
                        ],
                        selfSearch: this.handleClick,
                        selfExport: this.handleExport,
                        selfReset: () => {
                            form.resetFields();
                        },
                    }}
                    // eslint-disable-next-line react/jsx-boolean-value
                    selfShowRowSelection={true}
                    selfControlBtns={[{
                        name: '开户',
                        handleClick: () => {
                            // eslint-disable-next-line react/prop-types
                            this.props.history.push('/accountsmanage/inner/new');
                        },
                        style: { margin: '10px 12px 0 0' },
                    }, {
                        name: '销户',
                        handleClick: () => {
                            if (this.state.selectValue.length > 0) {
                                const selectV = this.state.selectValue[0];
                                const content = `您正在对内部账户：${selectV.internalAccountNo}-${selectV.internalAccountName}进行销户操作，请确认。`;
                                Modal.confirm({
                                    content,
                                    title: '确认销户',
                                    okType: 'danger',
                                    onOk: this.handleDel,
                                });
                            } else {
                                message.error('请选择需要销户的账户');
                            }
                        },
                    }]}
                    loading={loading}
                    size="small"
                    scroll={{ x: width }}
                    rowKey={(record) => {
                        return record.id;
                    }}
                    rowSelection={{
                        type: 'radio',
                        onChange: this.handleChange,
                        selectedRowKeys: this.state.selectKey,
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
        searchData: state.innerList.searchData,
        page: state.innerList.page,
        initData: state.innerList.initData,
        classAll: state.accountManageInner.classAll,
        loading: state.loading.effects.innerList.asyncGetList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        getList: dispatch.innerList.asyncGetList,
        getClassAll: dispatch.accountManageInner.asyncGetClassAll,
        setInner: dispatch.accountManageInner.asyncSetInner,
        clearData: dispatch.innerList.clearData,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
