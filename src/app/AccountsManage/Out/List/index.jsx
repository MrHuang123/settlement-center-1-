import React from 'react';
import { connect } from 'react-redux';
import { MakeCommonPage } from 'bnq-sys-react-component';
import Proptypes from 'prop-types';
import {
    Form,
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
        asyncGetList: Proptypes.func,
        classAll: Proptypes.array,
        // list: Proptypes.array,
        clearData: Proptypes.func,
        sysAllDictItems: Proptypes.object,
    }

    static defaultProps = {
        initData: {},
        loading: false,
        form: null,
        searchData: {},
        page: {},
        // list: [],
        getClassAll: () => { },
        asyncGetList: () => { },
        classAll: [],
        clearData: () => { },
        sysAllDictItems: null,
    }

    componentDidMount() {
        const { asyncGetList, getClassAll } = this.props;
        getClassAll();
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
        asyncGetList({
            ...values,
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
            classAll,
            loading,
            asyncGetList,
            sysAllDictItems,
        } = this.props;
        const columns = Tools.genTableOptions(columnsOptions(sysAllDictItems, classAll));
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
                    divider="true"
                    selfSearchOptions={{
                        components: searchOptions(classAll),
                        btns: [{
                            selfTypeName: 'search',
                        }, {
                            selfTypeName: 'reset',
                        }],
                        selfSearch: this.handleClick,
                        selfExport: this.handleExport,
                        selfReset: () => {
                            form.resetFields();
                        },
                    }}
                    loading={loading}
                    size="small"
                    scroll={{ x: width }}
                    rowKey={(record) => {
                        return record.index;
                    }}
                    form={form}
                    columns={columns}
                    dataSource={initData.map((item, index) => {
                        return {
                            ...item,
                            index,
                        };
                    })}
                    pagination={pagination}
                />
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        searchData: state.accountManageOut.searchData,
        page: state.accountManageOut.page,
        initData: state.accountManageOut.initData,
        classAll: state.accountManageInner.classAll,
        loading: state.loading.effects.accountManageOut.asyncGetList,
        sysAllDictItems: state.login.sysAllDictItems,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetList: dispatch.accountManageOut.asyncGetList,
        getClassAll: dispatch.accountManageInner.asyncGetClassAll,
        clearData: dispatch.accountManageOut.clearData,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
