import React from 'react';
import { MakeCommonPage } from 'bnq-sys-react-component';
import {
    Form,
} from 'antd';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { searchOptions } from './options';
import { Tools } from '../../../../util';
import { columnsOptions } from './columns';

class List extends React.Component {
    static propTypes = {
        getClassEnum: Proptypes.func,
        getList: Proptypes.func,
        searchData: Proptypes.object,
        page: Proptypes.object,
        initData: Proptypes.array,
        loading: Proptypes.bool,
        clearData: Proptypes.func,
        form: Proptypes.object,
        classEnum: Proptypes.object,
        history: Proptypes.object,
        sysAllDictItems: Proptypes.object,
        getSysAllDictItems: Proptypes.func,
    }

    static defaultProps = {
        classEnum: {},
        getClassEnum: () => { },
        getList: () => { },
        searchData: {}, // 搜索传参
        page: {}, // 后来回传的数据(已分配)
        initData: [],
        loading: true,
        clearData: () => { },
        form: null,
        history: {},
        sysAllDictItems: null,
        getSysAllDictItems: () => { },
    }

    componentDidMount() {
        const { getClassEnum, getList, getSysAllDictItems } = this.props;
        getSysAllDictItems();
        getClassEnum();
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

    render() {
        const {
            form,
            classEnum,
            page,
            searchData,
            initData,
            getList,
            loading,
            sysAllDictItems,
        } = this.props;
        const columns = Tools.genTableOptions(columnsOptions(classEnum, sysAllDictItems));
        let width = 0;
        columnsOptions(classEnum, sysAllDictItems).forEach((item) => {
            if (item.width) {
                width += item.width;
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
        return (
            <div>
                <MakeCommonPage
                    divider="true"
                    form={form}
                    selfSearchOptions={{
                        components: searchOptions(classEnum),
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
                        },
                        selfSearch: this.handleClick,
                        selfExport: this.handleExport,
                    }}
                    selfControlBtns={[{
                        name: '新增科目',
                        handleClick: () => {
                            this.props.history.push('/accountsmanage/class/new');
                        },
                        type: 'primary',
                    }]}
                    columns={columns}
                    loading={loading}
                    scroll={{ x: width }}
                    pagination={pagination}
                    dataSource={initData}
                    rowKey={(record) => {
                        return record.id;
                    }}
                />
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        classEnum: state.accountManageClass.classEnum,
        searchData: state.classList.searchData,
        page: state.classList.page,
        initData: state.classList.initData,
        loading: state.loading.effects.classList.asyncGetList,
        sysAllDictItems: state.login.sysAllDictItems,
    };
};
const mapDispatch = (dispatch) => {
    return {
        setPageSize: dispatch.classList.setPageSize,
        getList: dispatch.classList.asyncGetList,
        getClassEnum: dispatch.accountManageClass.asyncGetClassEnum,
        clearData: dispatch.classList.clearData,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
