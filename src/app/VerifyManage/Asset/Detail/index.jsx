/* eslint-disable  */
import React from 'react';
import { connect } from 'react-redux';
import { OneSelect } from 'bnq-sys-react-component';
import { withRouter } from 'react-router-dom';
import {
    Form,
    Descriptions,
    Typography,
    Radio,
    Button,
    Row,
    Col,
    Input,
    message,
    Skeleton,
} from 'antd';

@withRouter
class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.match.params.type,
            id: this.props.match.params.id,
            checkStatus:'',
        }
    }

    componentDidMount(){
        const {
            asyncGetDetail,
            getSysAllDictItems,
            asyncGetVerifyStatus,
        }=this.props;
        const {
            id,
        }=this.state;
        getSysAllDictItems();
        asyncGetDetail({
            id,
        }).then(data=>{
            if(data.success){
                asyncGetVerifyStatus({
                    capitalLossNum:data.result.capitalLossNum,
                }).then(data=>{
                    this.setState({
                        checkStatus:data.result.checkStatus
                    })
                });
            }
        });
    }

    showEnum = (arr, code) => {
        if (arr) {
            // eslint-disable-next-line no-restricted-syntax
            for (const v of arr) {
                // eslint-disable-next-line eqeqeq
                if (v.id == code) {
                    return v.name;
                }
            }
        } else {
            return '';
        }
        return '';
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

    handleClick=()=>{
        const {
            asyncSetDetail,
            detail,
        }=this.props;
        const { validateFieldsAndScroll } = this.props.form;
        validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }
            asyncSetDetail({
                ...values,
                id:this.state.id,
                capitalLossNum:detail.capitalLossNum,
            }).then(data=>{
                if(data.success){
                    message.success('??????????????????');
                    window.history.back();
                }else{
                    message.error(data.message);
                }
            })
        });
    }

    render() {
        const {
            type,
            checkStatus,
        } = this.state;
        const {
            form,
            detail,
            sysAllDictItems,
            loading,
        } = this.props;
        const { getFieldDecorator } = form;
        const isDetail = type === 'detail';
        const formProps = {
            labelAlign: 'left',
            labelCol: {
                span: 5,
            },
            wrapperCol: {
                span: 12,
            },
        }
        return (
            <div>
                <Skeleton loading={loading}>
                <Typography.Title level={4}>????????????</Typography.Title>
                <Descriptions>
                    <Descriptions.Item label="??????????????????">{detail.capitalLossNum}</Descriptions.Item>
                    <Descriptions.Item label="??????????????????">{detail.capitalLossTime}</Descriptions.Item>
                    <Descriptions.Item label="????????????">{this.showDict(sysAllDictItems.capital_loss_status,detail.capitalLossStatus)}</Descriptions.Item>

                    <Descriptions.Item label="????????????">{detail.capitalLossMoney}</Descriptions.Item>
                    <Descriptions.Item label="?????????????????????">{detail.errorSequenceNum}</Descriptions.Item>
                    <Descriptions.Item label="??????????????????">{detail.originalOrderNum}</Descriptions.Item>

                    <Descriptions.Item label="??????????????????">{this.showDict(sysAllDictItems.org_no,detail.orgNo)}</Descriptions.Item>
                </Descriptions>
                {
                    isDetail ?
                    <Form>
                        <Form.Item {...formProps} label="????????????????????????">
                            {
                                getFieldDecorator('capitalLossOperateType', {
                                    initialValue: detail.capitalLossOperateType||'',
                                })(
                                    <OneSelect
                                        selfOptions={sysAllDictItems.capital_loss_operate_type}
                                        selfMaps={{id:'value',name:'title'}}
                                        disabled={isDetail}
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item {...formProps} label="????????????">
                            {
                                getFieldDecorator('capitalLossStatus', {
                                    initialValue: checkStatus||'',
                                })(
                                    <span>{this.showDict(sysAllDictItems.capital_loss_status,checkStatus)}</span>
                                )
                            }
                        </Form.Item>
                        <Form.Item {...formProps} label="??????">
                            {
                                getFieldDecorator('checkDesc', {
                                    initialValue: detail.operateDesc||'',
                                })(
                                    <Input.TextArea disabled></Input.TextArea>
                                )
                            }
                        </Form.Item>
                    </Form>
                        : <Form>
                            <Form.Item {...formProps} label="????????????????????????">
                                {
                                    getFieldDecorator('capitalLossOperateType', {
                                        initialValue:'',
                                        rules: [
                                            { required: true, message: '??????????????????????????????' },
                                        ],
                                    })(
                                        <Radio.Group>
                                            <Radio value={'2'}>????????????</Radio>
                                            <Radio value={'3'}>??????</Radio>
                                        </Radio.Group>
                                    )
                                }
                            </Form.Item>
                            <Form.Item {...formProps} label="??????">
                                {
                                    getFieldDecorator('operateDesc', {
                                        initialValue: '',
                                    })(
                                        <Input.TextArea></Input.TextArea>
                                    )
                                }
                            </Form.Item>
                        </Form>
                }
                <Row gutter={30}>
                    <Col span={12}>
                        <div className="bottom-btn-div">
                            {
                                isDetail ?
                                    null :
                                    <Button
                                        style={{ margin: '0 20px 0 auto' }}
                                        type='primary'
                                        onClick={this.handleClick}
                                    >????????????</Button>
                            }
                            <Button
                                style={{ margin: '0 auto' }}
                                onClick={() => {
                                    window.history.back();
                                }}
                            >??????</Button>
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
        detail:state.warnAssetList.detail,
        sysAllDictItems: state.login.sysAllDictItems,
        loading:state.loading.effects.warnAssetList.asyncGetDetail || state.loading.effects.warnAssetList.asyncGetVerifyStatus,
    }
}
const mapDispatch=(dispatch)=>{
    return {
        asyncGetDetail:dispatch.warnAssetList.asyncGetDetail,
        asyncSetDetail:dispatch.warnAssetList.asyncSetDetail,
        asyncGetVerifyStatus:dispatch.warnAssetList.asyncGetVerifyStatus,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
    }
}
export default connect(mapState, mapDispatch)(Form.create()(Detail));