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
            sysAllDictItems,
            searchData,
            page,
            asyncGetList,
            loading,
        } = this.props;
        const searchOptions = () => {
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
                    selfid: 'capitalLossStatus',
                    selftype: 'searchSelect',
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
                    selfControlBtns={[{
                        name: '资损处理',
                        handleClick: () => {
                            const { selectValue } = this.state;
                            if(selectValue.length==0){
                                message.error('请先选择');
                            }else if((selectValue[0].capitalLossOperateType=='2')||(selectValue[0].capitalLossOperateType=='3')){
                                message.error('这条已经资损处理过了');
                            }else{
                                this.props.history.push(`/verifymanage/asset/check/${selectValue[0].id}`);
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
                        getCheckboxProps:record=>{
                            return {
                                disabled:(record.capitalLossStatus=='2') || (record.capitalLossStatus=='3') || (record.capitalLossStatus=='5')
                            }
                        }
                    }}
                />
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        initData: state.warnAssetList.initData,
        sysAllDictItems: state.login.sysAllDictItems,
        searchData: state.warnAssetList.searchData,
        page: state.warnAssetList.page,
        loading: state.loading.effects.warnAssetList.asyncGetList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetList: dispatch.warnAssetList.asyncGetList,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(Process));
