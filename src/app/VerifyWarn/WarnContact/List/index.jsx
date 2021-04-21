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
import { optionsCommon } from '../commonOptions';

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

    componentWillUnmount(){
        const {
            clearSelect,
        }=this.props;
        clearSelect();
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

    handleExport() {

    }

    handleChange = (key, value) => {
        const {
            setSelect,
        }=this.props;
        setSelect({
            v:value,
            k:key,
        });
    }

    render() {
        const {
            asyncGetDel,
            searchData,
            page,
            asyncGetList,
            loading,
            form,
            initData,
            selectValue,
            setSelect,
        } = this.props;
        const searchOptions = [
            {
                selfname: '告警项',
                selfid: 'rule',
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
        const columns = Tools.genTableOptions(columnsOptions);
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
                setSelect({
                    k:[],
                    v:[],
                })
            },
        };
        return (
            <div>
                <MakeCommonPage
                    divider="true"
                    form={form}
                    selfSearchOptions={{
                        components: searchOptions,
                        btns: [{
                            selfTypeName: 'search',
                        }, {
                            selfTypeName: 'reset',
                        }],
                        selfReset: () => {
                            form.resetFields();
                        },
                        selfSearch: this.handleClick,
                    }}
                    selfControlBtns={[{
                        name: '新增',
                        handleClick: () => {
                            this.props.history.push(`/verifywarn/warncontact/new`);
                        },
                        type: 'primary',
                        style: { margin: '0 12px 0 0' },
                    },{
                        name: '修改',
                        handleClick: () => {
                            if(selectValue.length==0){
                                message.error('请先选择联系人');
                            }else{
                                this.props.history.push(`/verifywarn/warncontact/reset`);
                            }
                        },
                        type: 'primary',
                        style: { margin: '0 12px 0 0' },
                    },{
                        name: '删除',
                        handleClick: () => {
                            if(selectValue.length==0){
                                message.error('请先选择联系人');
                            }else{
                                Modal.confirm({
                                    title:'确认删除',
                                    content:<span>
                                        <p>您正在对告警联系人：{selectValue[0].alarmName}</p>
                                        <p>进行删除操作，请确认。</p>
                                    </span>,
                                    onOk:()=>{
                                        asyncGetDel({
                                            alarmName:selectValue[0].alarmName,
                                            alarmTele:selectValue[0].alarmTele,
                                            alarmEmail:selectValue[0].alarmEmail,
                                        }).then((data)=>{
                                            if(data.success){
                                                message.success('删除成功');
                                                asyncGetList({
                                                    pageNo: 1,
                                                    pageSize: 10,
                                                });
                                            }else{
                                                message.error(data.message);
                                            }
                                        });
                                    }
                                });
                            }
                        },
                        type: 'primary',
                        style: { margin: '0 12px 0 0' },
                    }, {
                        name: '查看',
                        handleClick:()=>{
                            if(selectValue.length==0){
                                message.error('请先选择联系人');
                            }else{
                                this.props.history.push(`/verifywarn/warncontact/detail`);
                            }
                        },
                        type: 'primary',
                    }]}
                    columns={columns}
                    size="small"
                    rowKey={(record) => {
                        return `${record.index}`;
                    }}
                    scroll={{ x: width }}
                    dataSource={initData.map((item,index)=>{
                        return {
                            ...item,
                            index,
                        }
                    })}
                    pagination={pagination}
                    loading={loading}
                    rowSelection={{
                        type: 'radio',
                        onChange: this.handleChange,
                        selectedRowKeys:this.props.selectKey,
                    }}
                />
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        initData: state.warnContactList.initData,
        sysAllDictItems: state.login.sysAllDictItems,
        searchData: state.warnContactList.searchData,
        page: state.warnContactList.page,
        loading: state.loading.effects.warnContactList.asyncGetList,
        selectValue:state.warnContactList.selectValue,
        selectKey:state.warnContactList.selectKey,
    };
};
const mapDispatch = (dispatch) => {
    return {
        setSelect:dispatch.warnContactList.setSelect,
        asyncGetList: dispatch.warnContactList.asyncGetList,
        asyncGetDel: dispatch.warnContactList.asyncGetDel,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
        clearSelect:dispatch.warnContactList.clearSelect,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
