/* eslint-disable  */
import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
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
import { optionsCommon } from '../optionsCommon';

@withRouter
class Detail extends React.Component {
    static propTypes = {
        editOne: Proptypes.func,
        asyncGetDetail: Proptypes.func,
        clearData: Proptypes.func,
        loading:Proptypes.bool,
    }

    static defaultProps = {
        editOne: () => { },
        asyncGetDetail: () => { },
        clearData: () => { },
        loading:true,
    }

    constructor(props) {
        super(props);
        this.state = {
            type: this.props.match.params.type,
            id: this.props.match.params.id,
        }
    }

    componentDidMount() {
        const {
            id,
        } = this.state;
        const {
            asyncGetDetail,
            getSysAllDictItems,
        } = this.props;
        getSysAllDictItems();
        asyncGetDetail({
            id,
        })
    }

    componentWillMount(){
        this.props.clearData();
    }

    handleSubmit = () => {
        const {
            editOne,
            form,
        } = this.props;
        const { validateFieldsAndScroll } = form;
        validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }
            delete values.errorOperateType;
            editOne({
                ...values,
                errorId:this.state.id,
            }).then((data) => {
                if (data.success) {
                    message.success('处理成功', 1, () => {
                        window.history.back();
                    })
                }else{
                    message.error(data.message);
                }
            });
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

    render() {
        const { type } = this.state;
        const {
            form,
            detail,
            loading,
            sysAllDictItems,
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
                    <Typography.Title level={4}>对账差错处理详情</Typography.Title>
                    <Descriptions>
                        <Descriptions.Item label="差错流水号">{detail.errorSequenceNum}</Descriptions.Item>
                        <Descriptions.Item label="差错日期">{detail.errorTime}</Descriptions.Item>
                        <Descriptions.Item label="差错类型">{this.showEnum(optionsCommon('errorType'), detail.errorType)}</Descriptions.Item>

                        <Descriptions.Item label="合作机构">{detail.businessBrchno}</Descriptions.Item>
                        <Descriptions.Item label="合作业务">{this.showDict(sysAllDictItems.cooper_business_code,detail.cooperBusinessCode)}</Descriptions.Item>
                        <Descriptions.Item label="交易类型">{this.showDict(sysAllDictItems.trade_type,detail.tradeType)}</Descriptions.Item>
                        
                        <Descriptions.Item label="我方金额">{detail.nostroMoney}</Descriptions.Item>
                        <Descriptions.Item label="对方金额">{detail.reciprMoney}</Descriptions.Item>

                        <Descriptions.Item label="原支付订单号">{detail.origiOrderNum}</Descriptions.Item>
                        <Descriptions.Item label="原交易日期">{detail.origiTrandt}</Descriptions.Item>
                    </Descriptions>
                    {
                        isDetail ?
                            <React.Fragment>
                                <Descriptions style={{ marginTop: '40px' }}>
                                    <Descriptions.Item label="差错处理方式">{this.showDict(sysAllDictItems.error_operate_type,detail.errorOperateType)}</Descriptions.Item>
                                    <Descriptions.Item label="处理状态">{this.showDict(sysAllDictItems.error_status,detail.errorStatus)}</Descriptions.Item>
                                    <br />
                                    <Descriptions.Item label="处理说明">{detail.operateDesc||'无'}</Descriptions.Item>
                                </Descriptions>
                            </React.Fragment>
                            : <Form>
                                <Form.Item {...formProps} label="选择差错处理方式">
                                    {
                                        getFieldDecorator('errorOperateType', {
                                            initialValue: '',
                                            rules: [
                                                { required: true, message: '差错处理方式不能为空' },
                                            ],
                                        })(
                                            <Radio.Group>
                                                <Radio value={detail.errorOperateType}>{this.showDict(sysAllDictItems.error_operate_type,detail.errorOperateType)}</Radio>
                                            </Radio.Group>
                                        )
                                    }
                                </Form.Item>
                                <Form.Item {...formProps} label="处理说明">
                                    {
                                        getFieldDecorator('operateDesc', {
                                            initialValue: '',
                                        })(
                                            <Input.TextArea rows={6} maxLength={200}></Input.TextArea>
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
                                            onClick={this.handleSubmit}
                                        >提交审核</Button>
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
const mapState = (state) => {
    return {
        detail: state.errorHandleDetail.detail,
        loading:state.loading.effects.errorHandleDetail.asyncGetDetail,
        sysAllDictItems: state.login.sysAllDictItems,
    }
}
const mapDispatch = (dispatch) => {
    return {
        editOne: dispatch.errorHandleDetail.editOne,
        asyncGetDetail: dispatch.errorHandleDetail.asyncGetDetail,
        clearData: dispatch.errorHandleDetail.clearData,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
    }
}
export default connect(mapState, mapDispatch)(Form.create()(Detail));