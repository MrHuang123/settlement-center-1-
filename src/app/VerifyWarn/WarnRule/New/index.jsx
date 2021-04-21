/* eslint-disable  */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    Form,
    Typography,
    Button,
    Row,
    Col,
    Input,
    Skeleton,
    message,
} from 'antd';
import { OneSelect } from 'bnq-sys-react-component';

@withRouter
class New extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.match.params.type,
            id: this.props.match.params.id,
        }
    }
    componentDidMount(){
        const{
            getSysAllDictItems,
            asyncGetDetail,
        }=this.props;
        const {
            type,
            id,
        }=this.state;
        if((type==='detail')||(type==='reset')){
            asyncGetDetail({
                ruleId:id
            });
        }
        getSysAllDictItems();
    }

    handleClick=()=>{
        const{
            form,
            asyncNew,
            asyncReset,
        }=this.props;
        const {
            validateFieldsAndScroll,
        }=form;
        const {
            type,
            id,
        }=this.state;
        validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }
            if(type==='new'){
                asyncNew(values).then(data=>{
                    if(data.success){
                        message.success('新增成功');
                        window.history.back();
                    }else{
                        message.error(data.message);
                    }
                });
            }else if(type==='reset'){
                delete values.ruleId;
                asyncReset({
                    ...values,
                    id,
                }).then(data=>{
                    if(data.success){
                        message.success(data.message);
                        window.history.back();
                    }else{
                        message.error(data.message)
                    }
                });
            };
        });
    }

    showDict=(arr,code)=>{
        if (arr) {
            // eslint-disable-next-line no-restricted-syntax
            for (const v of arr) {
                // eslint-disable-next-line eqeqeq
                if (v.value == code) {
                    return v.title;
                }
            }
        } else {
            return '';
        }
        return '';
    }

    render() {
        const { type } = this.state;
        const {
            form,
            sysAllDictItems,
            detail,
            loading,
        } = this.props;
        const { getFieldDecorator } = form;
        const isDetail = type === 'detail';
        const isReset = type === 'reset';
        const formProps = {
            labelAlign: 'left',
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 12,
            },
        }
        return (
            <div>
                <Skeleton loading={loading}>
                    {type==='new'?<Typography.Title level={4}>{`新增告警规则`}</Typography.Title>:null}
                    
                    {type==='reset'?<Typography.Title level={4}>{`修改告警规则`}</Typography.Title>:null}
                    
                    {type==='detail'?<Typography.Title level={4}>{`告警规则详情`}</Typography.Title>:null}

                    <Form>
                        <Row>
                            <Col span={12}>
                                <Form.Item {...formProps} label="账务所属机构">
                                    {
                                        isDetail?<span>{this.showDict(sysAllDictItems.org_no,detail.accountBrchno)}</span>:getFieldDecorator('accountBrchno', {
                                            initialValue: detail.accountBrchno||'',
                                            rules: [
                                                { required: true, message: '账务所属机构不能为空' },
                                            ],
                                        })(
                                            <OneSelect
                                                selfOptions={sysAllDictItems.org_no}
                                                style={{ width: '100%' }}
                                                selfMaps={{id:'value',name:'title'}}
                                                disabled={isReset}
                                            />,
                                        )
                                    }
                                </Form.Item>
                            </Col>
                            {
                                (isReset||isDetail)?
                                <Col span={12}>
                                    <Form.Item {...formProps} label="告警规则ID">
                                        {
                                            isDetail?<span>{detail.alarmNum}</span>:getFieldDecorator('ruleId', {
                                                initialValue: detail.id||'',
                                                rules: [
                                                    { required: true, message: '告警规则ID不能为空' },
                                                ],
                                            })(
                                                <Input disabled />,
                                            )
                                        }
                                    </Form.Item>
                                </Col>
                                :null
                            }
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item {...formProps} label="合作机构">
                                    {
                                        isDetail?<span>{this.showDict(sysAllDictItems.business_brchno,detail.businessBrchno)}</span>:getFieldDecorator('businessBrchno', {
                                            initialValue: detail.businessBrchno||'',
                                            rules: [
                                                { required: true, message: '合作机构不能为空' },
                                            ],
                                        })(
                                            <OneSelect
                                                selfOptions={sysAllDictItems.business_brchno}
                                                style={{ width: '100%' }}
                                                selfMaps={{id:'value',name:'title'}}
                                                disabled={isReset}
                                            />,
                                        )
                                    }
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item {...formProps} label="合作业务">
                                    {
                                        isDetail?<span>{this.showDict(sysAllDictItems.cooper_business_code,detail.cooperBusinessCode)}</span>:getFieldDecorator('cooperBusinessCode', {
                                            initialValue: detail.cooperBusinessCode||'',
                                            rules: [
                                                { required: true, message: '合作业务不能为空' },
                                            ],
                                        })(
                                            <OneSelect
                                                selfOptions={sysAllDictItems.cooper_business_code}
                                                selfMaps={{id:'value',name:'title'}}
                                                style={{ width: '100%' }}
                                                disabled={isReset}
                                            />,
                                        )
                                    }
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item {...formProps} label="对账差错笔数阈值">
                                    {
                                        isDetail?<span>{detail.errorFileCount}</span>:getFieldDecorator('errorFileCount', {
                                            initialValue: detail.errorFileCount||'',
                                            rules: [
                                                { required: true, message: '对账差错笔数阈值不能为空' },
                                            ],
                                        })(
                                            <Input type={'number'} />,
                                        )
                                    }
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item {...formProps} label="差错处理超账龄(d)">
                                    {
                                        isDetail?<span>{detail.errorBatchDays}</span>:getFieldDecorator('errorBatchDays', {
                                            initialValue: detail.errorBatchDays||'',
                                            rules: [
                                                { required: true, message: '差错处理超账龄不能为空' },
                                            ],
                                        })(
                                            <Input type={'number'} />,
                                        )
                                    }
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    <Row gutter={30}>
                        <Col span={12}>
                            <div className="bottom-btn-div">
                                {
                                    isDetail?
                                    null :
                                    <Button
                                        style={{ margin: '0 20px 0 auto' }}
                                        type='primary'
                                        onClick={this.handleClick}
                                    >提交</Button>
                                }
                                <Button
                                    style={{ margin: '0 auto' }}
                                    onClick={() => {
                                        window.history.back();
                                    }}
                                >返回</Button>
                            </div>
                        </Col>
                    </Row>
                </Skeleton>
            </div>
        )
    }
}
const mapState=(state)=>{
    return {
        sysAllDictItems: state.login.sysAllDictItems,
        detail:state.warnRuleList.detail,
        loading:state.loading.effects.warnRuleList.asyncGetDetail,
    }
}
const mapDispatch=(dispatch)=>{
    return {
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
        asyncNew:dispatch.warnRuleList.asyncNew,
        asyncGetDetail:dispatch.warnRuleList.asyncGetDetail,
        asyncReset:dispatch.warnRuleList.asyncReset,
    }
}
export default connect(mapState, mapDispatch)(Form.create()(New));