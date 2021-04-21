import React from 'react';
import { MakeCommonPage } from 'bnq-sys-react-component';
import {
    Form,
} from 'antd';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { Tools } from '../../../../util';
import { searchOptions } from './options';
import { columnsOptions } from './columns';

class List extends React.Component {
    static propTypes = {
        initData: Proptypes.array,
        asyncGetList: Proptypes.func,
        loading: Proptypes.bool,
        form: Proptypes.object,
        searchData: Proptypes.object,
        page: Proptypes.object,
    }

    static defaultProps = {
        initData: [],
        asyncGetList: () => { },
        loading: true,
        form: null,
        searchData: {},
        page: {},
    }

    componentDidMount() {
        const { asyncGetList } = this.props;
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
                    rowKey={(record) => {
                        return `${record.number}`;
                    }}
                    pagination={pagination}
                    loading={loading}
                />
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        initData: state.innerBalance.initData,
        searchData: state.innerBalance.searchData,
        page: state.innerBalance.page,
        loading: state.loading.effects.innerBalance.asyncGetList,
    };
};

const mapDispatch = (dispatch) => {
    return {
        asyncGetList: dispatch.innerBalance.asyncGetList,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
