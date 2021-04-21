import React from 'react';
import { MakeCommonPage } from 'bnq-sys-react-component';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Form,
} from 'antd';
import { searchOptions } from './options';
import { Tools } from '../../../util';
import { columnsOptions } from './columns';

class Bussiness extends React.Component {
    static propTypes = {
        asyncGetChannelList: PropTypes.func,
        initData: PropTypes.array,
        searchData: PropTypes.object,
        page: PropTypes.object,
        loading: PropTypes.bool,
        form: PropTypes.object,
    }

    static defaultProps = {
        asyncGetChannelList: () => { },
        initData: [],
        searchData: {},
        page: {},
        loading: true,
        form: null,
    }

    componentDidMount() {
        const { asyncGetChannelList } = this.props;
        asyncGetChannelList({
            pageNo: 1,
            pageSize: 10,
        });
    }

    handleClick = (values) => {
        const { asyncGetChannelList } = this.props;
        asyncGetChannelList({
            ...values,
            pageNo: 1,
            pageSize: 10,
        });
    }

    handleExport() {

    }

    render() {
        const {
            form,
            initData,
            searchData,
            page,
            asyncGetChannelList,
            loading,
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
                asyncGetChannelList({
                    ...searchData,
                    pageNo: 1,
                    pageSize,
                });
            },
            current: searchData.pageNo,
            total: page.total,
            pageSize: page.size,
            onChange: (nextPage) => {
                asyncGetChannelList({
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
                    pagination={pagination}
                    rowKey={(record) => {
                        return `${record.number}`;
                    }}
                    loading={loading}
                />
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        initData: state.bussinessList.initData,
        searchData: state.bussinessList.searchData,
        page: state.bussinessList.page,
        loading: state.loading.effects.bussinessList.asyncGetChannelList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetChannelList: dispatch.bussinessList.asyncGetChannelList,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(Bussiness));
