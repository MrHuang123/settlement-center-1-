/* eslint-disable */
import React from 'react';
import { MakeCommonPage } from 'bnq-sys-react-component';
import { connect } from 'react-redux';
import {
    Form,
} from 'antd';
import Proptypes from 'prop-types';
import { columnsOptions } from './columns';
import { Tools } from '../../../../util';
import { optionsCommon } from '../../WarnContact/commonOptions';

class List extends React.Component {
    static propTypes = {
        initData: Proptypes.array,
        asyncGetList: Proptypes.func,
        sysAllDictItems: Proptypes.object,
        loading: Proptypes.bool,
        getSysAllDictItems: Proptypes.func,
        searchData: Proptypes.object,
        page: Proptypes.object,
    }

    static defaultProps = {
        initData: [],
        asyncGetList: () => { },
        sysAllDictItems: {},
        loading: true,
        getSysAllDictItems: () => { },
        searchData: {},
        page: {},
    }

    constructor(props) {
        super(props);
        this.state = {
            selectValue: [],
        };
    }

    componentDidMount() {
        const {
            asyncGetList,
            getSysAllDictItems,
        } = this.props;
        getSysAllDictItems();
        asyncGetList({
            pageNo: 1,
            pageSize: 10,
        });
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
            searchData,
            page,
            asyncGetList,
            loading,
        } = this.props;
        const searchOptions = () => {
            return [
                {
                    selfname: '告警项',
                    selfid: 'alarmNotice',
                    selftype: 'searchSelect',
                    selfOptions: optionsCommon('rule'),
                    selfHasAll: { value: '', text: '请选择' },
                    selfFieldOptions: {
                        initialValue: '',
                    },
                }, {
                    selfname: '联系人手机号',
                    selfid: 'alarmTele',
                    selftype: 'text',
                }, {
                    selfname: '联系人姓名',
                    selfid: 'alarmName',
                    selftype: 'text',
                }, {
                    selfname: '邮箱',
                    selfid: 'alarmEmail',
                    selftype: 'text',
                },
            ];
        };

        const { form, initData } = this.props;
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
                    divider="true"
                    form={form}
                    selfSearchOptions={{
                        components: searchOptions(),
                        btns: [{
                            selfTypeName: 'search',
                        }, {
                            selfTypeName: 'reset',
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
                        return `${record.recordId}`;
                    }}
                    scroll={{ x: width }}
                    dataSource={initData.map((i,n)=>{
                        return {
                            ...i,
                            index:n+1,
                        }
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
        initData: state.warnRecordList.initData,
        sysAllDictItems: state.login.sysAllDictItems,
        searchData: state.warnRecordList.searchData,
        page: state.warnRecordList.page,
        loading: state.loading.effects.warnRecordList.asyncGetList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetList: dispatch.warnRecordList.asyncGetList,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
