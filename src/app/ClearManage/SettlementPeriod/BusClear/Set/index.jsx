/* eslint-disable */
import React from 'react';
import {
    Typography,
    Form,
    Input,
    Button,
    Row,
    Col,
    message,
    Table,
    Spin,
    Modal,
} from 'antd';
import { OneSelect } from 'bnq-sys-react-component';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { Tools } from '@/util/index';

const { Title } = Typography;
const FormItem = Form.Item;
const isDisable=(e)=>{
    if(e=='new'){
        return false;
    }else if(e=='reset'){
        return false;
    }else if(e=='detail'){
        return true;
    }
}
const periodOption={
    day:Array.apply(null,{length:31}).map((item,index)=>{
        return index+1;
    }),
    week:Array.apply(null,{length:7}).map((item,index)=>{
        return index+1;
    }),
    t:Array.apply(null,{length:31}).map((item,index)=>{
        return index;
    }),
}
const getPeriodOption=(e)=>{
    if(e=='1'){
        return periodOption.t;
    }else if(e=='2'){
        return periodOption.week;
    }else if(e=='3'){
        return periodOption.day;
    }else{
        return [];
    }
}

class Set extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            checkedKey: -1,
            dataSourceList:[],
            payDateType:'',
            showDetail:true,
            merchantName:'无',
        };
    }

    componentDidMount() {
        const {
            getSysAllDictItems,
            asyncGetDetail,
            getClassList,
        }=this.props;
        const {
            id,
            type,
        }=this.props.match.params;
        getClassList();
        if(type=='detail' || type=='reset'){
            // 需要获取id，进一步的数据
            asyncGetDetail({
                id,
            }).then(data=>{
                this.setState({
                    merchantName:data.merchantName,
                    showDetail:true,
                    count:data.cycleList.length,
                    dataSourceList:data.cycleList.map((item,index)=>{
                        return {
                            ...item,
                            key:index+1,
                        }
                    }),
                })
            });
        }else{
            this.setState({
                showDetail:false,
            })
        };
        getSysAllDictItems();
    }
    
    handleAdd=()=>{
        const {
            dataSourceList,
        }=this.state;
        this.setState({
            count: this.state.count + 1
        }, () => {
            let result = dataSourceList.concat({
                key: this.state.count,
                cycleType:'',
                cycleValue:'',
            });
            this.setState({
                dataSourceList:result
            });
        });
    }

    handleDel=(key)=>{
        const {
            dataSourceList,
        }=this.state;
        const { checkedKey } = this.state;
        let result=dataSourceList.filter((value)=>{
            return value.key !== checkedKey;
        });
        this.setState({
            dataSourceList:result
        });
    }

    handleReset=()=>{
        const {
            asyncReset,
        }=this.props;
        const {type}=this.props.match.params;
        const { validateFieldsAndScroll } = this.props.form;
        validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }
            let resultObj={};
            let middleTable=[];
            for (let key in values) {
                if (key.includes('_')) {
                    let [i, k] = key.split('_');
                    middleTable[i] = {
                        ...middleTable[i],
                        [k]: values[key],
                    }
                } else {
                    resultObj[key] = values[key];
                }
            };
            if(type=='reset'){
                asyncReset({
                    ...resultObj,
                    cycleList:middleTable.filter(item=>{
                        return item
                    }),
                    id:this.props.match.params.id,
                }).then(data=>{
                    if(data.success){
                        Modal.success({
                            title:'修改成功',
                            onOk:()=>{
                                window.close();
                            }
                        })
                    }else{
                        message.error(data.message);
                    }
                })
            }
        });
    }

    render() {
        const { type }=this.props.match.params;
        const {
            form,
            loading,
            sysAllDictItems,
            detail,
            classAllList,
        } = this.props;
        const {
            dataSourceList,
        }=this.state;
        const { getFieldDecorator } = form;
        const rowSelectionOption = {
            type: 'radio',
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    checkedKey: selectedRows[0].key,//radio一定是单选
                })
            }
        };
        const columnsOptions = [{
            name: '序号',
            dataindex: 'key',
            width:120,
        }, {
            name: '结算周期',
            dataindex: 'table2',
            width: 180,
            render: (text, record) => {
                return (
                    <Form.Item style={{ margin: 0}}>
                        {form.getFieldDecorator(`${record.key}_cycleType`, {
                            rules: [
                                {
                                    required: true,
                                    message: `不能为空`,
                                },
                            ],
                            initialValue: String(record['cycleType']),
                        })(
                            <OneSelect
                                disabled={isDisable(type)}
                                selfOptions={sysAllDictItems.settle_cycle_type}
                                selfHasAll={{ value: '', text: '请选择' }}
                                onChange={(e)=>{
                                    let dataSourceList=this.state.dataSourceList;
                                    dataSourceList.forEach((i,d)=>{
                                        if(i.key==record.key){
                                            dataSourceList[d].cycleType=e;
                                            this.props.form.setFieldsValue({
                                                [`${record.key}_cycleValue`]:''
                                            })
                                        };
                                    });
                                    this.setState({
                                        dataSourceList
                                    });
                                }}
                                selfMaps={{
                                    name:'title',
                                    id:'value',
                                }}
                            />
                        )}
                    </Form.Item>
                )
            }
        }, {
            name: '结算周期值',
            dataindex: 'table3',
            width:120,
            render: (text, record) => {
                return (
                    <Form.Item style={{ margin: 0 }}>
                        {form.getFieldDecorator(`${record.key}_cycleValue`, {
                            rules: [
                                {
                                    required: true,
                                    message: `不能为空`,
                                },
                            ],
                            initialValue: String(record['cycleValue']),
                        })(
                            <OneSelect
                                disabled={isDisable(type)}
                                selfOptions={getPeriodOption(record.cycleType).map((item=>{
                                    return {
                                        id:item,
                                        name:item,
                                    }
                                }))}
                            />
                        )}
                    </Form.Item>
                )
            }
        }];
        return (
            <div>
                <Title level={4}>{'业务结算信息'}</Title>
                <Spin spinning={loading}>
                    <hr />
                    <Form
                        labelCol={
                            { span: 8 }
                        }
                        wrapperCol={
                            { span: 14 }
                        }
                    >
                        <div style={{border:'1px solid #999',paddingTop:'24px',marginBottom:'12px'}}>
                        <Row type='flex' align='middle'>
                            <Col span={8}>
                                <FormItem label="账务类型">
                                    {
                                        getFieldDecorator('billType', {
                                            initialValue: detail.billType || '',
                                            rules: [
                                                { required: true, message: '账务类型不能为空' },
                                            ],
                                        })(<OneSelect
                                                style={{width:'100%'}}
                                                selfOptions={classAllList.filter((item) => {
                                                    return item.classLevel === '01'
                                                }).map((item) => {
                                                    return {
                                                        id: item.classNo,
                                                        name: `${item.classNo}--${item.className}`,
                                                    };
                                                })}
                                                // selfMaps={{ id: ['classNo'], name: ['className'] }}
                                                selfHasAll={{ value: '', text: '请选择' }}
                                                disabled={true}
                                            />
                                        )
                                    }
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label="交易类型">
                                    {
                                        getFieldDecorator('tradeType', {
                                            initialValue: detail.tradeType || '',
                                            rules: [
                                                { required: true, message: '账务类型不能为空' },
                                            ],
                                        })(<OneSelect
                                                style={{width:'100%'}}
                                                selfOptions={classAllList.filter((item) => {
                                                    return item.classLevel === '02'
                                                }).map((item) => {
                                                    return {
                                                        id: item.classNo,
                                                        name: `${item.classNo}--${item.className}`,
                                                    };
                                                })}
                                                // selfMaps={{ id: ['classNo'], name: ['className'] }}
                                                selfHasAll={{ value: '', text: '请选择' }}
                                                disabled={true}
                                            />
                                        )
                                    }
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label="业务类型">
                                    {
                                        getFieldDecorator('businessType', {
                                            initialValue: detail.businessType || '',
                                            rules: [
                                                { required: true, message: '账务类型不能为空' },
                                            ],
                                        })(<OneSelect
                                                style={{width:'100%'}}
                                                selfOptions={classAllList.filter((item) => {
                                                    return item.classLevel === '03'
                                                }).map((item) => {
                                                    return {
                                                        id: item.classNo,
                                                        name: `${item.classNo}--${item.className}`,
                                                    };
                                                })}
                                                // selfMaps={{ id: ['classNo'], name: ['className'] }}
                                                selfHasAll={{ value: '', text: '请选择' }}
                                                disabled={true}
                                            />
                                        )
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem label="商户结算实时标志">
                                    {
                                        getFieldDecorator('actualCode', {
                                            initialValue: detail.actualCode || '',
                                            rules: [
                                                { required: true, message: '商户编号不能为空' },
                                            ],
                                        })(
                                            <OneSelect
                                                style={{width:'100%'}}
                                                // selfHasAll={{ value: '', text: '请选择' }}
                                                selfOptions={sysAllDictItems.actual_time_type}
                                                disabled={isDisable(type)}
                                                selfMaps={{name:'title',id:'value'}}
                                            />,
                                        )
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem label="商户结算类型">
                                    {
                                        getFieldDecorator('saToCode', {
                                            initialValue: detail.saToCode || '',
                                            rules: [
                                                { required: true, message: '商户编号类型为空' },
                                            ],
                                        })(
                                            <OneSelect
                                                style={{width:'100%'}}
                                                // selfHasAll={{ value: '', text: '请选择' }}
                                                selfOptions={sysAllDictItems.settle_merchant_settle_type}
                                                selfMaps={{name:'title',id:'value'}}
                                                disabled={isDisable(type)}
                                            />,
                                        )
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem label="暂停结算标志">
                                    {
                                        getFieldDecorator('enable', {
                                            initialValue: ((detail.enable==0) || (detail.enable==1))?String(detail.enable):'',
                                            rules: [
                                                { required: true, message: '商户编号类型为空' },
                                            ],
                                        })(
                                            <OneSelect
                                                style={{width:'100%'}}
                                                // selfHasAll={{ value: '', text: '请选择' }}
                                                selfOptions={sysAllDictItems.settle_stop_settle_flag}
                                                selfMaps={{name:'title',id:'value'}}
                                                disabled={isDisable(type)}
                                            />,
                                        )
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem label="起始结算金额">
                                    {
                                        getFieldDecorator('startAmount', {
                                            initialValue: detail.startAmount,
                                            rules: [
                                                { required: true, message: '商户编号类型为空' },
                                            ],
                                        })(
                                            <Input disabled={isDisable(type)}/>,
                                        )
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        </div>
                        <div style={{border:'1px solid #999',paddingTop:'24px',marginBottom:'12px'}}>
                        {
                            isDisable(type)?null:<Row type='flex' gutter={[20,0]}>
                                <Col offset={1}>
                                    <Button onClick={()=>{
                                        this.handleAdd();
                                    }}>增加项目</Button>
                                </Col>
                                <Col>
                                    <Button onClick={()=>{
                                        this.handleDel();
                                    }}>删除项目</Button>
                                </Col>
                            </Row>
                        }
                        
                        <Row style={{marginTop:'20px'}}>
                            <Col span={14}>
                                <Table
                                    columns={Tools.genTableOptions(columnsOptions)}
                                    dataSource={dataSourceList}
                                    rowSelection={rowSelectionOption}
                                    scroll={{ x: 'max-content' }}
                                    pagination={false}
                                ></Table>
                            </Col>
                        </Row>
                        </div>

                        <Row style={{marginTop:'20px',border:'1px solid #999',paddingTop:'24px',marginBottom:'12px'}} >
                            <Col span={8}>
                                <FormItem label="付款日期">
                                    {
                                        getFieldDecorator('payType', {
                                            initialValue: detail.payType?String(detail.payType):'',
                                            rules: [
                                                { required: true, message: '付款日期为空' },
                                            ],
                                        })(
                                            <OneSelect
                                                style={{width:'100%'}}
                                                disabled={isDisable(type)}
                                                selfOptions={sysAllDictItems.settle_cycle_type}
                                                selfHasAll={{ value: '', text: '请选择' }}
                                                onChange={(e)=>{
                                                    this.setState({
                                                        payDateType:e,
                                                    },()=>{
                                                        this.props.form.setFieldsValue({
                                                            assignPayDay:''
                                                        })
                                                    });
                                                }}
                                                selfMaps={{
                                                    name:'title',
                                                    id:'value',
                                                }}
                                            />
                                        )
                                    }
                                </FormItem>
                            </Col>
                            <Col span={4}>
                                <FormItem>
                                    {
                                        getFieldDecorator('assignPayDay', {
                                            // 可能会有0转换为false
                                            initialValue: detail.assignPayDay || '',
                                            rules: [
                                                { required: true, message: '付款日期为空' },
                                            ],
                                        })(
                                            <OneSelect
                                                style={{width:'100%'}}
                                                disabled={isDisable(type)}
                                                selfOptions={getPeriodOption(this.props.form.getFieldValue('payType')).map((item=>{
                                                    return {
                                                        id:item,
                                                        name:item,
                                                    }
                                                }))}
                                            />
                                        )
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        
                        <Row gutter={30}>
                            <Col span={12}>
                                <div className="bottom-btn-div">
                                    {
                                        type=='reset'?<Button
                                            className="btn save"
                                            type="primary"
                                            onClick={this.handleReset}
                                        >修改</Button>
                                        :null
                                    }
                                    {
                                        type=='new'?<Button
                                            className="btn save"
                                            type="primary"
                                            onClick={this.handleReset}
                                        >提交</Button>
                                        :null
                                    }
                                    <Button
                                        className="btn back"
                                        onClick={() => {
                                            window.close();
                                        }}
                                    >关闭</Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Spin>
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        loading: state.loading.effects.busClearSet.asyncGetDetail || state.loading.effects.busClearSet.asyncReset,
        sysAllDictItems: state.login.sysAllDictItems,
        detail:state.busClearSet.detail,
        classAllList: state.accountManageRule.classList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
        asyncGetDetail:dispatch.busClearSet.asyncGetDetail,
        asyncReset:dispatch.busClearSet.asyncReset,
        getClassList: dispatch.accountManageRule.asyncGetClassList,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(Set));
