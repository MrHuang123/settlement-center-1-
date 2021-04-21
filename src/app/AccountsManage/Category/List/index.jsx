import React from 'react';
import { MakeCommonPage } from 'bnq-sys-react-component';
import Proptypes from 'prop-types';
import { Form, Modal, message } from 'antd';
import { connect } from 'react-redux';
import { searchOptions } from './options';
import { columnsOptions } from './columns';
import { searchOptionsCommon } from '../optionsCommon';
import { Tools } from '../../../../util';

class List extends React.Component {
    static propTypes = {
        initData: Proptypes.array,
        searchData: Proptypes.object,
        page: Proptypes.object,
        clearList: Proptypes.func,
        getList: Proptypes.func,
        setCategory: Proptypes.func,
        form: Proptypes.object,
        loading: Proptypes.bool,
    }

    static defaultProps = {
        initData: {},
        searchData: {},
        page: {},
        clearList: () => { },
        getList: () => { },
        setCategory: () => { },
        form: null,
        loading: true,
    }

    constructor(props) {
        super(props);
        this.state = {
            selectValue: '',
            selectKey: '',
        };
    }

    componentDidMount() {
        const { getList } = this.props;
        getList({
            pageNo: 1,
            pageSize: 10,
        });
    }

    componentWillUnmount() {
        const { clearList } = this.props;
        clearList();
    }

    handleClick = (values) => {
        const { getList } = this.props;
        getList({
            ...values,
            pageNo: 1,
            pageSize: 10,
        });
    }

    handleExport = () => {

    }

    handleChange = (key, value) => {
        this.setState({
            selectValue: value,
            selectKey: key,
        });
    }

    handleDel = () => {
        const { setCategory } = this.props;
        const selectV = this.state.selectValue[0];
        setCategory({
            ...selectV,
            classStatus: 0,
        }).then((cache) => {
            if (cache.success) {
                const { getList, searchData } = this.props;
                message.success('删除成功', 1, () => {
                    getList({
                        pageNo: searchData.pageNo,
                        pageSize: 10,
                    });
                });
            } else {
                message.error(cache.message);
            }
        });
    }

    render() {
        const {
            form,
            initData,
            searchData,
            page,
            getList,
            loading,
        } = this.props;
        const columns = Tools.genTableOptions(columnsOptions(searchOptionsCommon('categoryLevel')));
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
                        components: searchOptions(),
                        btns: [
                            {
                                selfTypeName: 'search',
                            }, {
                                selfTypeName: 'reset',
                            },
                            // {
                            //     selfTypeName: 'export',
                            // },
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
                        name: '新增',
                        handleClick: () => {
                            // eslint-disable-next-line react/prop-types
                            this.props.history.push('/accountsmanage/category/new');
                        },
                        style: { margin: '10px 12px 0 0' },
                    }, {
                        name: '删除',
                        handleClick: () => {
                            if (this.state.selectValue.length > 0) {
                                const selectV = this.state.selectValue[0];
                                const content = `您正在对业务名称：${selectV.className}进行删除操作，请确认。`;
                                Modal.confirm({
                                    content,
                                    title: '确认删除',
                                    okType: 'danger',
                                    onOk: this.handleDel,
                                });
                            } else {
                                message.error('请选择需要删除的业务');
                            }
                        },
                    }]}
                    loading={loading}
                    scroll={{ x: width }}
                    rowKey={(record) => {
                        return `${record.id}`;
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
        initData: state.categoryList.initData,
        searchData: state.categoryList.searchData,
        page: state.categoryList.page,
        loading: state.loading.effects.categoryList.asyncGetList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        getList: dispatch.categoryList.asyncGetList,
        setCategory: dispatch.categoryNew.asyncSetCategory,
        clearList: dispatch.categoryList.clearList,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
