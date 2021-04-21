import React, { Component } from 'react';
import {
    Form,
    Button,
    Modal,
    Typography,
    Descriptions,
    Input,
    Checkbox,
    Row,
    Col,
    Spin,
    Radio,
    message,
} from 'antd';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';

const { Title } = Typography;

class Set extends Component {
    static propTypes = {
        detail: Proptypes.array,
        clearDetail: Proptypes.func,
        asyncGetDetail: Proptypes.func,
        asyncSet: Proptypes.func,
        form: Proptypes.object,
        match: Proptypes.object,
        loading: Proptypes.bool,
    }

    static defaultProps = {
        detail: {},
        match: {},
        clearDetail: () => { },
        asyncGetDetail: () => { },
        asyncSet: () => { },
        form: null,
        loading: true,
    }

    componentDidMount() {
        const {
            asyncGetDetail,
        } = this.props;
        asyncGetDetail({
            id: this.props.match.params.id,
        });
    }

    componentWillUnmount() {
        const {
            clearDetail,
        } = this.props;
        clearDetail();
    }

    render() {
        const {
            detail,
            loading,
            form,
        } = this.props;
        const {
            getFieldDecorator,
        } = form;
        return (
            <React.Fragment>
                <Spin spinning={loading}>
                    <Title level={4}>差额处理</Title>
                    <hr />
                    <Descriptions>
                        <Descriptions.Item label="差额处理流水号">{detail.serialNumber}</Descriptions.Item>
                        <Descriptions.Item label="原支付方式">{detail.payType}</Descriptions.Item>
                        <Descriptions.Item label="差额原因">{detail.differenceType}</Descriptions.Item>
                        <Descriptions.Item label="差额金额">{detail.differenceMoney}</Descriptions.Item>
                        <Descriptions.Item label="应交款金额">{detail.payCenterMoney}</Descriptions.Item>
                        <Descriptions.Item label="实际交款金额">{detail.handOverMoney}</Descriptions.Item>
                        <Descriptions.Item label="收银员">{detail.cashierInfo}</Descriptions.Item>
                        <Descriptions.Item label="门店">{detail.shopInfo}</Descriptions.Item>
                    </Descriptions>
                    <Form
                        labelCol={
                            { span: 8 }
                        }
                        wrapperCol={
                            { span: 16 }
                        }
                    >
                        <Form.Item
                            label="选择差额处理方式"
                            labelCol={
                                { span: 3 }
                            }
                            wrapperCol={
                                { span: 11 }
                            }
                        >
                            {
                                getFieldDecorator('processType', {
                                    initialValue: '',
                                    rules: [
                                        { required: true, message: '差额处理方式不能为空' },
                                    ],
                                })(
                                    <Radio.Group>
                                        {
                                            detail.differenceCode === '01'
                                                ? <React.Fragment>
                                                    <Radio key="01" value="01">补款</Radio>
                                                    <Radio key="03" value="03">串户处理</Radio>
                                                </React.Fragment>
                                                : null
                                        }
                                        {
                                            detail.differenceCode === '02'
                                                ? <React.Fragment>
                                                    <Radio key="02" value="02">拾遗处理</Radio>
                                                    <Radio key="03" value="03">串户处理</Radio>
                                                </React.Fragment>
                                                : null
                                        }
                                    </Radio.Group>,
                                )
                            }
                        </Form.Item>
                        {
                            form.getFieldValue('processType') === '01'
                                ? <Form.Item
                                    label="请填写交易流水号"
                                    labelCol={
                                        { span: 3 }
                                    }
                                    wrapperCol={
                                        { span: 11 }
                                    }
                                >
                                    {
                                        getFieldDecorator('ticketNum', {
                                            initialValue: '',
                                            rules: [
                                                { required: true, message: '补款小票号不能为空' },
                                            ],
                                        })(
                                            <Input maxLength={30} />,
                                        )
                                    }
                                </Form.Item>
                                : null
                        }
                        {
                            form.getFieldValue('processType') === '02'
                                ? <Form.Item
                                    label="请填写交易流水号"
                                    labelCol={
                                        { span: 3 }
                                    }
                                    wrapperCol={
                                        { span: 11 }
                                    }
                                >
                                    {
                                        getFieldDecorator('ticketNum', {
                                            initialValue: '',
                                            rules: [
                                                { required: true, message: '拾遗小票号不能为空' },
                                            ],
                                        })(
                                            <Input maxLength={30} />,
                                        )
                                    }
                                </Form.Item>
                                : null
                        }
                        {
                            form.getFieldValue('processType') === '03'
                                ? <Form.Item
                                    label="勾兑串户差错流水号"
                                    labelCol={
                                        { span: 3 }
                                    }
                                    wrapperCol={
                                        { span: 11 }
                                    }
                                >
                                    {
                                        getFieldDecorator('ticketNum', {
                                            initialValue: '',
                                            rules: [
                                                { required: true, message: '勾兑串户差错流水号不能为空' },
                                            ],
                                        })(
                                            <Input maxLength={30} />,
                                        )
                                    }
                                    <Form.Item>
                                        {
                                            getFieldDecorator('blendFlag', {
                                                initialValue: [],
                                            })(
                                                <Checkbox.Group>
                                                    <Checkbox value={1}>无需勾兑，串户没有影响其他交款</Checkbox>
                                                </Checkbox.Group>,
                                            )
                                        }
                                    </Form.Item>
                                </Form.Item>
                                : null
                        }
                        <Form.Item
                            label="处理说明"
                            labelCol={
                                { span: 3 }
                            }
                            wrapperCol={
                                { span: 11 }
                            }
                        >
                            {
                                getFieldDecorator('processMark', {
                                    initialValue: '',
                                    rules: [
                                        { required: true, message: '处理说明不能为空' },
                                    ],
                                })(
                                    <Input.TextArea />,
                                )
                            }
                        </Form.Item>
                    </Form>
                    <Row type="flex">
                        <Col offset={6}>
                            <Button
                                style={{ margin: '0 auto' }}
                                onClick={() => {
                                    const { validateFieldsAndScroll } = form;
                                    validateFieldsAndScroll((err, values) => {
                                        const {
                                            asyncSet,
                                        } = this.props;
                                        if (err) {
                                            return;
                                        }
                                        // eslint-disable-next-line no-prototype-builtins
                                        if (values.hasOwnProperty('blendFlag')) {
                                            values.blendFlag = values.blendFlag.length > 0 ? 1 : 0;
                                        }
                                        Modal.confirm({
                                            title: '确认补款',
                                            content: '您正在对差额做补款处理，请确认。',
                                            onOk: () => {
                                                return new Promise((res, rej) => {
                                                    asyncSet({
                                                        ...values,
                                                        id: this.props.match.params.id,
                                                    }).then((data) => {
                                                        if (data.success) {
                                                            message.success({
                                                                content: '处理成功',
                                                                duration: 1,
                                                                onClose: () => {
                                                                    res();
                                                                    window.location.href = '/treasury/payment/differencemanage';
                                                                },
                                                            });
                                                        } else {
                                                            rej();
                                                        }
                                                    });
                                                });
                                            },
                                        });
                                    });
                                }}
                            >提交审核</Button>
                        </Col>
                        <Col offset={1}>
                            <Button
                                style={{ margin: '0 auto' }}
                                onClick={() => {
                                    window.close();
                                }}
                            >关闭</Button>
                        </Col>
                    </Row>
                </Spin>
            </React.Fragment>
        );
    }
}
const mapState = (state) => {
    return {
        loading: state.loading.effects.differenceManage.asyncGetDetail,
        sysAllDictItems: state.login.sysAllDictItems,
        detail: state.differenceManage.detail,
    };
};
const mapDispatch = (dispatch) => {
    return {
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
        asyncGetDetail: dispatch.differenceManage.asyncGetDetail,
        clearClassDetail: dispatch.differenceManage.clearClassDetail,
        clearDetail: dispatch.differenceManage.clearDetail,
        asyncSet: dispatch.differenceManage.asyncSet,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(Set));
