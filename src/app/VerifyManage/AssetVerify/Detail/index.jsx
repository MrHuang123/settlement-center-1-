/* eslint-disable  */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    Form,
    Descriptions,
    Typography,
    Skeleton,
    Button,
    Row,
    Col,
    Input,
    message,
} from 'antd';

@withRouter
class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            capitalLossOperateType: this.props.match.params.capitalLossOperateType,
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

    handleClick=(isPass)=>{
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
                checkDesc:values.checkDesc,
                checkStatus:isPass?'3':'2',
                capitalLossNum:detail.capitalLossNum,
                capitalLossOperateType:this.state.capitalLossOperateType,
            }).then(data=>{
                if(data.success){
                    message.success('????????????');
                    window.history.back();
                }else{
                    message.error(data.message);
                }
            })
        });
    }

    render() {
        const {
            checkStatus,
        } = this.state;
        const {
            form,
            detail,
            sysAllDictItems,
            loading,
        } = this.props;
        const { getFieldDecorator } = form;
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
                <div className='divBorder'>
                    <Descriptions>
                        <Descriptions.Item label="??????????????????">{detail.capitalLossNum}</Descriptions.Item>
                        <Descriptions.Item label="??????????????????">{detail.capitalLossTime}</Descriptions.Item>
                        <Descriptions.Item label="????????????">{this.showDict(sysAllDictItems.capital_loss_status,detail.capitalLossStatus)}</Descriptions.Item>

                        <Descriptions.Item label="????????????">{detail.capitalLossMoney}</Descriptions.Item>
                        <Descriptions.Item label="?????????????????????">{detail.errorSequenceNum}</Descriptions.Item>
                        <Descriptions.Item label="??????????????????">{detail.originalOrderNum}</Descriptions.Item>

                        <Descriptions.Item label="??????????????????">{this.showDict(sysAllDictItems.org_no,detail.orgNo)}</Descriptions.Item>
                    </Descriptions>
                </div>
                <div className='divBorder'>
                    <Descriptions>
                        <Descriptions.Item label="????????????????????????">
                            {this.showDict(sysAllDictItems.capital_loss_operate_type,detail.capitalLossOperateType)}
                        </Descriptions.Item>
                        <Descriptions.Item label="????????????">
                            {this.showDict(sysAllDictItems.capital_loss_status,checkStatus)}
                        </Descriptions.Item>
                        <Descriptions.Item label="??????">
                            {detail.capitalLossOperateType}
                        </Descriptions.Item>
                    </Descriptions>
                </div>
                <div className='divBorder'>
                    <Form>
                        <Form.Item {...formProps} label="????????????">
                            {
                                getFieldDecorator('checkDesc', {
                                    initialValue: '',
                                })(
                                    <Input.TextArea></Input.TextArea>
                                )
                            }
                        </Form.Item>
                    </Form>
                </div>
                <Row gutter={30}>
                    <Col span={12}>
                        <div className="bottom-btn-div">
                            <Button
                                style={{ margin: '0 20px 0 auto' }}
                                type='primary'
                                onClick={()=>{this.handleClick(true)}}
                            >????????????</Button>
                            <Button
                                style={{ margin: '0 20px 0 auto' }}
                                type='danger'
                                onClick={()=>{this.handleClick(false)}}
                            >????????????</Button>
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
        detail:state.warnAssetVerifyList.detail,
        sysAllDictItems: state.login.sysAllDictItems,
        loading:state.loading.effects.warnAssetVerifyList.asyncGetDetail || state.loading.effects.warnAssetList.asyncGetVerifyStatus,
    }
}
const mapDispatch=(dispatch)=>{
    return {
        asyncGetDetail:dispatch.warnAssetVerifyList.asyncGetDetail,
        asyncSetDetail:dispatch.warnAssetVerifyList.asyncSetDetail,
        asyncGetVerifyStatus:dispatch.warnAssetList.asyncGetVerifyStatus,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
    }
}
export default connect(mapState, mapDispatch)(Form.create()(Detail));