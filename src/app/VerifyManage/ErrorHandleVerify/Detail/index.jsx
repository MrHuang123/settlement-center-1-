/* eslint-disable  */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    Form,
    Descriptions,
    Typography,
    Button,
    Row,
    Col,
    Input,
    message,
    Skeleton,
} from 'antd';
import './index.less';
import { optionsCommon } from '../../ErrorHandle/optionsCommon';

@withRouter
class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.match.params.type,
            id: this.props.match.params.id,
        }
    }
    componentDidMount(){
        const { id }=this.state;
        const {
            asyncGetDetail,
            getSysAllDictItems,
        }=this.props;
        getSysAllDictItems();
        asyncGetDetail({
            id,
        })

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

    handleSubmit=(checkStatus)=>{
        const { validateFieldsAndScroll } = this.props.form;
        const {
            asyncEditDetail,
        }=this.props;
        const {
            id,
        }=this.state;
        validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }
            asyncEditDetail({
                operateId:id,
                checkDesc:values.checkDesc,
                checkStatus,
            }).then(data=>{
                if(data.success){
                    message.success('审核成功');
                    window.history.back();
                }else{
                    message.error(data.message);
                }
            });;
        });
    }

    render() {
        const { type } = this.state;
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
                    <Typography.Title level={4}>{isDetail?'差错处理审核详情':'差错处理审核'}</Typography.Title>
                    <Descriptions>
                        <Descriptions.Item label="差错流水号">{detail.errorSequenceNum}</Descriptions.Item>
                            <Descriptions.Item label="差错日期">{detail.errorTime}</Descriptions.Item>
                            <Descriptions.Item label="差错类型">{this.showEnum(optionsCommon('errorType'), detail.errorType)}</Descriptions.Item>

                            <Descriptions.Item label="合作机构">{this.showDict(sysAllDictItems.business_brchno,detail.businessBrchno)}</Descriptions.Item>
                            <Descriptions.Item label="合作业务">{this.showDict(sysAllDictItems.cooper_business_code,detail.cooperBusinessCode)}</Descriptions.Item>
                            <Descriptions.Item label="交易类型">{this.showDict(sysAllDictItems.trade_type,detail.tradeType)}</Descriptions.Item>

                            <Descriptions.Item label="我方金额">{detail.nostroMoney}</Descriptions.Item>
                            <Descriptions.Item label="对方金额">{detail.reciprMoney}</Descriptions.Item>

                            <Descriptions.Item label="原支付订单号">{detail.origiOrderNum}</Descriptions.Item>
                            <Descriptions.Item label="原交易日期">{detail.origiTrandt}</Descriptions.Item>

                            <Descriptions.Item label="差错金额">{detail.errorMoney}</Descriptions.Item>
                            <Descriptions.Item label="账务所属机构">{this.showDict(sysAllDictItems.org_no,detail.orgNo)}</Descriptions.Item>
                        </Descriptions>
                    <Descriptions>
                        <Descriptions.Item label="差额处理方式">{this.showDict(sysAllDictItems.error_operate_type,detail.errorOperateType)}</Descriptions.Item>
                        <Descriptions.Item label="差错状态">{this.showDict(sysAllDictItems.error_status,detail.errorStatus)}</Descriptions.Item>
                        <br />
                    </Descriptions>
                    <div className="explain">
                        <div>操作说明：</div>
                        <div className='explain-input'>
                            {
                                getFieldDecorator('operateDesc', {
                                    initialValue: detail.operateDesc || '',
                                })(
                                    <Input.TextArea disabled autoSize={{ minRows: 5 }} style={{ verticalAlign: 'top' }}></Input.TextArea>
                                )
                            }
                        </div>
                    </div>
                    <div className="explain">
                        <div>审核说明：</div>
                        <div className='explain-input'>
                            {
                                getFieldDecorator('checkDesc', {
                                    initialValue: detail.checkDesc || '',
                                })(
                                    <Input.TextArea disabled={isDetail} autoSize={{ minRows: 5 }} style={{ verticalAlign: 'top' }}></Input.TextArea>
                                )
                            }
                        </div>
                    </div>
                    <Row gutter={30}>
                        <Col span={12}>
                            <div className="bottom-btn-div">
                                {
                                    isDetail ?
                                        null :
                                        <React.Fragment>
                                            <Button
                                                style={{ margin: '0 20px 0 auto' }}
                                                type='primary'
                                                onClick={() => {
                                                    this.handleSubmit('3')
                                                }}
                                            >审核通过</Button>
                                            <Button
                                                style={{ margin: '0 20px 0 auto' }}
                                                type='primary'
                                                onClick={() => {
                                                    this.handleSubmit('2')
                                                }}
                                            >审核拒绝</Button>
                                        </React.Fragment>
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
    return{
        detail:state.errorHandleVerifyDetail.detail,
        sysAllDictItems: state.login.sysAllDictItems,
        loading:state.loading.effects.errorHandleVerifyDetail.asyncGetDetail,
    }
}
const mapDispatch=(dispatch)=>{
    return{
        asyncGetDetail:dispatch.errorHandleVerifyDetail.asyncGetDetail,
        asyncEditDetail:dispatch.errorHandleVerifyDetail.asyncEditDetail,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
    }
}
export default connect(mapState, mapDispatch)(Form.create()(Detail));