/* eslint-disable */
import React from 'react';
import { MakeCommonPage } from 'bnq-sys-react-component';
import { connect } from 'react-redux';
import {
    Form,
    Modal,
    message,
} from 'antd';
import Proptypes from 'prop-types';
import { columnsOptions } from './columns';
import { Tools } from '../../../../util';

class List extends React.Component {
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
        asyncGetList({
            ...values,
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
            asyncDel,
            form,
            initData,
        } = this.props;
        const searchOptions = () => {
            return [
                {
                    selfname: '账务所属机构',
                    selfid: 'accountBrchno',
                    selftype: 'searchSelect',
                    selfOptions: sysAllDictItems.org_no,
                    selfHasAll: { value: '', text: '请选择' },
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfMaps: { id: ['value'], name: ['title'] },
                }, {
                    selfname: '合作机构名称',
                    selfid: 'businessBrchno',
                    selftype: 'searchSelect',
                    selfOptions: sysAllDictItems.business_brchno,
                    selfHasAll: { value: '', text: '请选择' },
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfMaps: { id: ['value'], name: ['title'] },
                }, {
                    selfname: '合作业务',
                    selfid: 'cooperBusinessCode',
                    selftype: 'searchSelect',
                    selfOptions: sysAllDictItems.cooper_business_code,
                    selfHasAll: { value: '', text: '请选择' },
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfMaps: { id: ['value'], name: ['title'] },
                },
            ];
        };
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
                        name: '新增',
                        handleClick: () => {
                            this.props.history.push(`/verifywarn/warnrule/new/0`);
                        },
                        type: 'primary',
                        style: { margin: '0 12px 0 0' },
                    },{
                        name: '修改',
                        handleClick: () => {
                            const { selectValue } = this.state;
                            if(selectValue.length==0){
                                message.error('请先选择');
                            }else{
                                this.props.history.push(`/verifywarn/warnrule/reset/${selectValue[0].ruleId}`);
                            }
                        },
                        type: 'primary',
                        style: { margin: '0 12px 0 0' },
                    },{
                        name: '删除',
                        handleClick: () => {
                            const { selectValue } = this.state;
                            if(selectValue.length==0){
                                message.error('请先选择');
                            }else{
                                Modal.confirm({
                                    title:'确认删除',
                                    content:<span>
                                        <p>您正在对告警规则ID：{selectValue[0].ruleId}</p>
                                        <p>进行删除操作，请确认。</p>
                                    </span>,
                                    onOk:()=>{
                                        asyncDel({
                                            ruleId:selectValue[0].ruleId,
                                            alarmNum:selectValue[0].alarmNum,
                                        }).then((data)=>{
                                            if(data.success){
                                                asyncGetList({
                                                    pageNo: 1,
                                                    pageSize: 10,
                                                });
                                            }else{
                                                message.error(data.message);
                                            }
                                        })
                                    }
                                })
                            }
                        },
                        type: 'primary',
                        style: { margin: '0 12px 0 0' },
                    }]}
                    columns={columns}
                    size="small"
                    rowKey={(record) => {
                        return `${record.ruleId}`;
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
        initData: state.warnRuleList.initData,
        sysAllDictItems: state.login.sysAllDictItems,
        searchData: state.warnRuleList.searchData,
        page: state.warnRuleList.page,
        loading: state.loading.effects.warnRuleList.asyncGetList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetList: dispatch.warnRuleList.asyncGetList,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
        asyncDel:dispatch.warnRuleList.asyncDel,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
