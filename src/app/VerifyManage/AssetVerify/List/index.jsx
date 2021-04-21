/* eslint-disable */
import React from 'react';
import { MakeCommonPage } from 'bnq-sys-react-component';
import { connect } from 'react-redux';
import {
    Form,
    message,
} from 'antd';
import Proptypes from 'prop-types';
import { columnsOptions } from './columns';
import { Tools } from '../../../../util';

class Process extends React.Component {
    static propTypes = {
        initData: Proptypes.array,
        asyncGetList: Proptypes.func,
        classAllList: Proptypes.array,
        sysAllDictItems: Proptypes.object,
        loading: Proptypes.bool,
        getSysAllDictItems: Proptypes.func,
        searchData: Proptypes.object,
        page: Proptypes.object,
        form: Proptypes.object,
    }

    static defaultProps = {
        initData: [],
        asyncGetList: () => { },
        classAllList: [],
        sysAllDictItems: {},
        loading: true,
        getSysAllDictItems: () => { },
        searchData: {},
        page: {},
        form: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            selectValue: [],
            selectKey: [],
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
        const send = {
            ...values,
            startRecordTime: values.dateCreated && values.dateCreated[0] && values.dateCreated[0].format('YYYY-MM-DD'),
            endRecordTime: values.dateCreated && values.dateCreated[1] && values.dateCreated[1].format('YYYY-MM-DD'),
        };
        delete send.dateCreated;
        asyncGetList({
            ...send,
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

    render() {
        const {
            classAllList,
            sysAllDictItems,
            searchData,
            page,
            asyncGetList,
            loading,
        } = this.props;
        const searchOptions = (options) => {
            return [
                {
                    selfname: '资损创建日期',
                    selfid: 'dateCreated',
                    selftype: 'datepicker',
                    selfDatePickerType: 'rangepicker',
                    format: 'YYYY/MM/DD',
                }, {
                    selfname: '原支付订单号',
                    selfid: 'originalOrderNum',
                    selftype: 'text',
                }, {
                    selfname: '对账差错流水号',
                    selfid: 'errorSequenceNum',
                    selftype: 'text',
                }, {
                    selfname: '资损状态',
                    selftype: 'searchSelect',
                    selfid: 'capitalLossStatus',
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfHasAll: { value: '', text: '请选择' },
                    selfOptions: sysAllDictItems.capital_loss_status,
                    selfMaps: { id: ['value'], name: ['title'] },
                }
            ];
        };

        const { form, initData } = this.props;
        const columns = Tools.genTableOptions(columnsOptions(sysAllDictItems));
        let width = 0;
        columns.forEach((item) => {
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
                this.setState({
                    selectKey:[],
                    selectValue:[],
                })
            },
        };
        return (
            <div>
                <MakeCommonPage
                    divider="true"
                    form={form}
                    selfSearchOptions={{
                        components: searchOptions(classAllList),
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
                    selfControlBtns={[{
                        name: '审核',
                        handleClick: () => {
                            const { selectValue } = this.state;
                            if(selectValue.length==0){
                                message.error('请先选择');
                            }else if(selectValue[0].checkStatus!=='1'){
                                message.error('这条已经审核过了');
                            }else{
                                this.props.history.push(`/verifymanage/verifyasset/check/${selectValue[0].id}/${selectValue[0].capitalLossOperateType}`);
                            }
                        },
                        type: 'primary',
                    }]}
                    columns={columns}
                    size="small"
                    rowKey={(record) => {
                        return `${record.id}`;
                    }}
                    scroll={{ x: width }}
                    dataSource={initData}
                    pagination={pagination}
                    loading={loading}
                    rowSelection={{
                        type: 'radio',
                        onChange: this.handleChange,
                        selectedRowKeys:this.state.selectKey,
                    }}
                />
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        initData: state.warnAssetVerifyList.initData,
        classAllList: state.accountManageRule.classList,
        sysAllDictItems: state.login.sysAllDictItems,
        searchData: state.warnAssetVerifyList.searchData,
        page: state.warnAssetVerifyList.page,
        loading: state.loading.effects.warnAssetVerifyList.asyncGetList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetList: dispatch.warnAssetVerifyList.asyncGetList,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(Process));
