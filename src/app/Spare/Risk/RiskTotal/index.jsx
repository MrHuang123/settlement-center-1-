/* eslint-disable  */
import React from 'react';
import {
    MakeCommonPage,
} from 'bnq-sys-react-component';
import { connect } from 'react-redux';
import {
    Form,
} from 'antd';
import Axios from 'axios';
import { columnsOptions } from './columns';
import { Tools } from '../../../../util/index';
class List extends React.Component {
    constructor(props){
        super(props);
        this.axios = Axios.create();
    }
    componentDidMount() {
        const {
            asyncGetList,
        } = this.props;
        asyncGetList({
            pageNo: 1,
            pageSize: 10,
        });
    }

    handleClick = (values) => {
        const { asyncGetList } = this.props;
        const send = {
            ...values,
        };
        
        asyncGetList({
            ...send,
            pageNo: 1,
            pageSize: 10,
        });
    }

    handleExport = (params)=>{
        const send = this.axios.request;
        send({
            method: 'get',
            url: `/accm-web/virtualcash/virtualCashSum/exportExcel`,
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-Access-Token': localStorage.getItem('token'),
            },
            params,
        }).then(result => {
            Tools.download(result.data, '备用金风控累计数据.xls');
        });
    }

    render() {
        const {
            searchData,
            page,
            asyncGetList,
            loading,
            form,
            initData,
            sysAllDictItems,
        } = this.props;
        const searchOptions = () => {
            return [{
                    selfname: '备用金帐户号',
                    selfid: 'virtAccount',
                    selftype: 'text',
                }, {
                    selfname: '用户帐号',
                    selfid: 'userAccount',
                    selftype: 'text',
                }
            ];
        };

        const columns = Tools.genTableOptions(columnsOptions(sysAllDictItems));
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
        return (
            <div>
                <MakeCommonPage
                    divider={true}
                    form={form}
                    tableLayout="fixed"
                    selfSearchOptions={{
                        components: searchOptions(),
                        btns: [{
                            selfTypeName: 'search',
                        }, {
                            selfTypeName: 'reset',
                        }, {
                            selfTypeName: 'export',
                        }],
                        selfReset: () => {
                            form.resetFields();
                        },
                        selfSearch: this.handleClick,
                        selfExport: this.handleExport,
                    }}
                    columns={columns}
                    size="small"
                    rowKey={(record) => {
                        return record.id;
                    }}
                    scroll={{ x: 'scroll' }}
                    dataSource={initData.map((item, index) => {
                        return {
                            ...item,
                            index: index + 1,
                        };
                    })}
                    pagination={pagination}
                    loading={loading}
                />
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        initData: state.riskTotal.initData,
        searchData: state.riskTotal.searchData,
        page: state.riskTotal.page,
        loading: state.loading.effects.riskTotal.asyncGetList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetList: dispatch.riskTotal.asyncGetList,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
