/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import {
    Typography,
    Row,
    Col,
    Button,
    Table,
    Form,
    Checkbox,
    Input,
    message,
    Skeleton,
} from 'antd';
import { OneSelect } from 'bnq-sys-react-component';
import _padStart from 'lodash.padstart';
import { Tools } from '../../../../util/index';
import { optionsCommon } from '../commonOptions';
import './new.css';

class New extends React.Component{
    constructor(props){
        super(props);
        this.state={
            checkedKey: -1,
            count: 0,
            type:this.props.match.params.type,
            noticeIds:'',
        }
    }
    componentDidMount(){
        const {
            getSysAllDictItems,
            asyncGetDetail,
            selectValue,
        } = this.props;
        let alarmEmail;
        let alarmName;
        let alarmTele;
        if(selectValue.length>0){
            // 有数据
            alarmEmail=selectValue[0].alarmEmail;
            alarmName=selectValue[0].alarmName;
            alarmTele=selectValue[0].alarmTele;
            localStorage.setItem('contact',JSON.stringify(selectValue[0]))
        }else{
            // 没数据，刷新状况
            let contact=JSON.parse(localStorage.getItem('contact'));
            alarmEmail=contact.alarmEmail;
            alarmName=contact.alarmName;
            alarmTele=contact.alarmTele;
        }
        getSysAllDictItems();
        if(this.state.type==='detail'){
            asyncGetDetail({
                alarmEmail,
                alarmName,
                alarmTele,
            }).then((data) => {
                if(data.success){
                    this.setState({
                        count: data.result.businessBoList.length - 1,
                        noticeIds:data.result.noticeIds,
                    });
                }else{
                    message.error(data.message);
                }
            });
        }else if(this.state.type==='reset'){
            asyncGetDetail({
                alarmEmail,
                alarmName,
                alarmTele,
            }).then((data) => {
                if(data.success){
                    this.setState({
                        count: data.result.businessBoList.length - 1,
                        noticeIds:data.result.noticeIds,
                    });
                }else{
                    message.error(data.message);
                }
            });
        }
    }

    componentWillUnmount(){
        const { clearData }=this.props;
        clearData();
    }

    handleAdd = () => {
        const {
            setDataSourceList,
            dataSourceList,
        } = this.props;
        this.setState({
            count: this.state.count + 1
        }, () => {
            let result = dataSourceList.concat({
                key: this.state.count,
            });
            setDataSourceList(result);
        });
    }

    handleDel = () => {
        const {
            setDataSourceList,
            dataSourceList,
        } = this.props;
        const { checkedKey } = this.state;
        setDataSourceList(dataSourceList.filter((value) => {
            return value.key !== checkedKey;
        }));
    }

    onChange=(checkedValues)=>{
        
    }

    handleClick=()=>{
        const {
            dataSourceList,
            asyncNew,
            asyncReset,
        }=this.props;
        const {
            type,
        }=this.state;
        const { validateFieldsAndScroll } = this.props.form;
        validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }
            let middleTable = [];
            let otherObj = {};
            for (let key in values) {
                if (key.includes('_')) {
                    let [i, k] = key.split('_');
                    middleTable[i] = {
                        ...middleTable[i],
                        ...{
                            [k]: values[key]
                        }
                    }
                } else {
                    otherObj[key] = values[key];
                }
            };
            if(type==='reset'){
                asyncReset({
                    ...otherObj,
                    noticeIds:this.state.noticeIds,
                    alarmRule:otherObj.alarmRule.join(','),
                    businessBoList:middleTable.filter(item=>{
                        return item;
                    }),
                }).then(data=>{
                    if(data.success){
                        message.success(data.message);
                        window.history.back();
                    }else{
                        message.error(data.message);
                    }
                });
            }else if(type==='new'){
                asyncNew({
                    ...otherObj,
                    alarmRule:otherObj.alarmRule.join(','),
                    businessBoList:middleTable.filter(item=>{
                        return item;
                    }),
                }).then(data=>{
                    if(data.success){
                        message.success(data.message);
                        window.history.back();
                    }else{
                        message.error(data.message);
                    }
                });
            }
        });
    }

    rule=()=>{
        const {
            detail,
        }=this.props;
        let result=[];
        let arr=detail.alarmRule?detail.alarmRule.split(''):[];
        optionsCommon('rule').forEach((element,index) => {
            if(arr[index]==='1'){
                // 该项被选择
                result.push(element.id);
            }
        });
        return result;
    }

    render(){
        const {
            sysAllDictItems,
            dataSourceList,
            form,
            detail,
            loading,
        }=this.props;
        const {
            type,
        }=this.state;
        const { getFieldDecorator }=form;
        const formProps = {
            labelAlign: 'left',
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 18,
            },
        }
        const rowSelectionOption = {
            type: 'radio',
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    checkedKey: selectedRows[0].key,//radio一定是单选
                })
            },
        }
        const columnsOptions=[{
            name: '序号',
            dataindex: 'key',
            render:(text)=>{
                return(
                    <span>{text}</span>
                )
            }
        }, {
            name: '账务所属机构',
            dataindex: 'accountBrchno',
            width: 120,
            render: (text, record) => {
                return (
                    <Form.Item style={{ margin: 0}}>
                        {form.getFieldDecorator(`${record.key}_accountBrchno`, {
                            rules: [
                                {
                                    required: true,
                                    message: '不能为空',
                                },
                            ],
                            initialValue: record['accountBrchno']||'',
                        })(
                            <OneSelect
                                selfOptions={sysAllDictItems.org_no}
                                selfHasAll={false}
                                selfMaps={{ id: 'value', name: 'title' }}
                                disabled={type==='detail'}
                                style={{width:'300px'}}
                            />
                        )}
                    </Form.Item>
                )
            }
        }, {
            name: '合作机构名称',
            dataindex: 'dcFlag',
            width:120,
            render: (text, record) => {
                return (
                    <Form.Item style={{ margin: 0 }}>
                        {form.getFieldDecorator(`${record.key}_businessBrchno`, {
                            rules: [
                                {
                                    required: true,
                                    message: `不能为空`,
                                },
                            ],
                            initialValue: record['businessBrchno']||'',
                        })(
                            <OneSelect
                                selfOptions={sysAllDictItems.business_brchno}
                                selfHasAll={false}
                                style={{ width: '120px' }}
                                selfMaps={{ id: 'value', name: 'title' }}
                                disabled={type==='detail'}
                            />
                        )}
                    </Form.Item>
                )
            }
        }, {
            name: '合作业务',
            dataindex: 'inOutType',
            width: 240,
            render: (text, record) => {
                return (
                    <Form.Item style={{ margin: 0 }}>
                        {form.getFieldDecorator(`${record.key}_cooperBusinessCode`, {
                            rules: [
                                {
                                    required: true,
                                    message: `不能为空`,
                                },
                            ],
                            initialValue: record['cooperBusinessCode']||'',
                        })(
                            <OneSelect
                                selfOptions={sysAllDictItems.cooper_business_code}
                                selfHasAll={false}
                                selfMaps={{ id: ['value'], name: ['text'] }}
                                disabled={type==='detail'}
                            />
                        )}
                    </Form.Item>
                )
            }
        }];
        return (
            <div>
                <Skeleton loading={loading}>
                    <Typography.Title level={4}>{type==='detail'?'告警联系人详情':type==='new'?'新增告警联系人':'修改告警联系人'}</Typography.Title>
                    {type==='detail'?null:<Row gutter={30} style={{ marginBottom: '10px' }}>
                        <Col span={2}>
                            <Button onClick={this.handleAdd}>增加行</Button>
                        </Col>
                        <Col span={2}>
                            <Button onClick={this.handleDel}>删除行</Button>
                        </Col>
                    </Row>}
                    <Table
                        columns={Tools.genTableOptions(columnsOptions)}
                        dataSource={dataSourceList.map((i,n)=>{
                            return{
                                ...i,
                                index:n+1,
                            }
                        })}
                        rowSelection={type==='detail'?null:rowSelectionOption}
                        pagination={false}
                        // rowKey={(r)=>{
                        //     return `${r.index}`
                        // }}
                    ></Table>
                    <Form.Item {...formProps} style={{marginTop:'20px'}} label="选择告警项">
                        {
                            getFieldDecorator('alarmRule', {
                                initialValue: this.rule()||[],
                                rules: [
                                    { required: true, message: '告警项不能为空' },
                                ],
                            })(
                                <Checkbox.Group disabled={type==='detail'} onChange={this.onChange} style={{width:'100%'}}>
                                    <Row gutter={[0,20]}>
                                        <Col span={6}>
                                            <Checkbox value="01">对账差错笔数过多告警</Checkbox>
                                        </Col>
                                        <Col span={6}>
                                            <Checkbox value="02">差错处理超账龄告警</Checkbox>
                                        </Col>
                                    </Row>
                                </Checkbox.Group>,
                            )
                        }
                    </Form.Item>
                    <Row>
                        <Col span={12}>
                            <Form.Item label="告警联系人姓名" labelCol={{span:6}} wrapperCol={{span:12}} labelAlign={'left'}>
                                {
                                    getFieldDecorator('alarmName', {
                                        initialValue: detail.alarmName||'',
                                        rules: [
                                            { required: true, message: '告警项不能为空' },
                                        ],
                                    })(
                                        <Input disabled={type==='detail'} />
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="手机号" labelCol={{span:6}} wrapperCol={{span:12}} labelAlign={'right'}>
                                {
                                    getFieldDecorator('alarmTele', {
                                        initialValue: detail.alarmTele||'',
                                        rules: [
                                            { required: true, message: '手机号不能为空' },
                                        ],
                                    })(
                                        <Input disabled={type==='detail'} />
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="邮箱" labelCol={{span:6}} wrapperCol={{span:12}} labelAlign={'left'}>
                                {
                                    getFieldDecorator('alarmEmail', {
                                        initialValue: detail.alarmEmail||'',
                                        rules: [
                                            { required: true, message: '邮箱不能为空' },
                                        ],
                                    })(
                                        <Input disabled={type==='detail'} />
                                    )
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={30}>
                        <Col span={12}>
                            <div className="bottom-btn-div">
                                {
                                    <Button
                                        className="btn save"
                                        type="primary"
                                        onClick={this.handleClick}
                                    >提交</Button>
                                }
                                <Button
                                    className="btn back"
                                    onClick={() => { history.back() }}
                                >取消</Button>
                            </div>
                        </Col>
                    </Row>
                </Skeleton>
            </div>
        )
    }
}
const mapState=(state)=>{
    return{
        sysAllDictItems:state.login.sysAllDictItems,
        dataSourceList: state.warnContactNew.dataSourceList,
        selectValue:state.warnContactList.selectValue,
        detail:state.warnContactNew.detail,
        loading:state.loading.effects.warnContactNew.asyncGetDetail,
    }
}
const mapDispatch=(dispatch)=>{
    return{
        getSysAllDictItems:dispatch.login.getSysAllDictItems,
        setDataSourceList: dispatch.warnContactNew.setDataSourceList,
        clearData:dispatch.warnContactNew.clearData,
        asyncNew:dispatch.warnContactNew.asyncNew,
        asyncReset:dispatch.warnContactNew.asyncReset,
        asyncGetDetail:dispatch.warnContactNew.asyncGetDetail,
    }
}
export default connect(mapState,mapDispatch)(Form.create()(New));