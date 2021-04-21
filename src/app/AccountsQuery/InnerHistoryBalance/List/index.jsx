import React from 'react';
import { MakeCommonPage } from 'bnq-sys-react-component';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Form,
} from 'antd';
import { searchOptions } from './options';
import { Tools } from '../../../../util';
import { columnsOptions } from './columns';

class List extends React.Component {
    static propTypes = {
        initData: Proptypes.array,
        asyncGetList: Proptypes.func,
        getClassEnum: Proptypes.func,
        classEnum: Proptypes.object,
        form: Proptypes.object,
        searchData: Proptypes.object,
        page: Proptypes.object,
        loading: Proptypes.bool,
    }

    static defaultProps = {
        initData: [],
        asyncGetList: () => { },
        getClassEnum: () => { },
        classEnum: {},
        form: null,
        searchData: {},
        page: {},
        loading: true,
    }

    componentDidMount() {
        const {
            getClassEnum,
            asyncGetList,
        } = this.props;
        getClassEnum();
        asyncGetList({
            pageNo: 1,
            pageSize: 10,
        });
    }

    handleExport = () => {

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
            classEnum,
            initData,
            searchData,
            page,
            asyncGetList,
            loading,
        } = this.props;
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
        const columns = Tools.genTableOptions(columnsOptions);
        let width = 0;
        columnsOptions.forEach((item) => {
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
                    form={form}
                    loading={loading}
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
                    columns={columns}
                    size="small"
                    scroll={{ x: width }}
                    dataSource={initData}
                    pagination={pagination}
                    rowKey={(record) => {
                        return `${record.number}`;
                    }}
                />
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        initData: state.innerHistoryBalance.initData,
        searchData: state.innerHistoryBalance.searchData,
        page: state.innerHistoryBalance.page,
        classEnum: state.accountManageClass.classEnum,
        loading: state.loading.effects.innerHistoryBalance.asyncGetList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetList: dispatch.innerHistoryBalance.asyncGetList,
        getClassEnum: dispatch.accountManageClass.asyncGetClassEnum,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
