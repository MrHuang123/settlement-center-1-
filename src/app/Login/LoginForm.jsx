import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    Input,
    Icon,
    message,
    Row,
    Col,
    Button,
    Form,
} from 'antd';
import './index.less';

const { Password } = Input;
const FormItem = Form.Item;

@withRouter
class LoginForm extends Component {
    static propTypes = {
        form: PropTypes.object,
        history: PropTypes.object,
        location: PropTypes.object,
        sendLogin: PropTypes.func,
        asyncSendPhoneVerificodeMsg: PropTypes.func,
        asyncCheckPhoneVerificodeMsg: PropTypes.func,
        asyncUpdatePassWord: PropTypes.func,
    };

    static defaultProps = {
        form: {},
        history: {},
        location: {},
        sendLogin: () => {},
        asyncSendPhoneVerificodeMsg: () => {},
        asyncCheckPhoneVerificodeMsg: () => {},
        asyncUpdatePassWord: () => {},
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { sendLogin } = this.props;
        const { validateFields } = this.props.form;
        validateFields((error, values) => {
            if (!error) {
                sendLogin(values);
            }
        });
    };

    renderLogin = () => {
        const { getFieldDecorator } = this.props.form;
        const { history } = this.props;
        return <Fragment>
            <FormItem>
                {getFieldDecorator('username', {
                    rules: [
                        {
                            required: true,
                            message: '请输入用户名',
                        },
                    ],
                })(
                    <Input
                        size="large"
                        placeholder="请输入用户名"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />,
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('password', {
                    rules: [
                        {
                            required: true,
                            message: '请输入密码',
                        },
                    ],
                })(
                    <Password
                        size="large"
                        placeholder="请输入密码"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />,
                )}
            </FormItem>
            <div style={{ margin: '-10px 0 12px 0', textAlign: 'right' }}>
                {/* <span
                    className="buttonStyle"
                    onClick={() => {
                        history.replace({
                            type: 'check',
                        }, '/login');
                    }}
                >忘记密码</span> */}
            </div>
            <FormItem>
                <Button
                    type="primary"
                    block
                    htmlType="submit"
                    size="large"
                >登 录</Button>
            </FormItem>
        </Fragment>;
    };

    renderCheck = () => {
        const {
            getFieldDecorator,
            validateFields,
            getFieldValue,
            setFields,
        } = this.props.form;
        const { history } = this.props;
        return <Fragment>
            <Row>
                <Col>
                    <FormItem>
                        {getFieldDecorator('phone', {
                            rules: [
                                {
                                    required: true,
                                    message: '请填写手机号码',
                                },
                            ],
                        })(
                            <Input
                                size="large"
                                placeholder="请输入手机号"
                                prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            />,
                        )}
                    </FormItem>
                </Col>
            </Row>
            <Row gutter={28}>
                <Col span={16}>
                    <FormItem>
                        {getFieldDecorator('verificationCode', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入手机验证码',
                                },
                            ],
                        })(
                            <Input
                                size="large"
                                placeholder="请输入手机验证码"
                                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            />,
                        )}
                    </FormItem>
                </Col>
                <Col span={8}>
                    <FormItem>
                        <Button
                            size="large"
                            onClick={() => {
                                const { asyncSendPhoneVerificodeMsg } = this.props;
                                const phoneData = getFieldValue('phone');
                                if (!phoneData) {
                                    setFields({
                                        phone: {
                                            errors: [new Error('请填写手机号码')],
                                        },
                                    });
                                } else {
                                    setFields({
                                        errors: [],
                                    });
                                    asyncSendPhoneVerificodeMsg({
                                        phone: phoneData,
                                    }).then((res) => {
                                        if (res.code !== 0) {
                                            message.error(res.msg || '异常错误');
                                        } else {
                                            message.success(res.result.data || '发送成功');
                                        }
                                    });
                                }
                            }}
                        >
                            获取验证码
                        </Button>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormItem>
                        <Button
                            type="primary"
                            block
                            onClick={() => {
                                const { asyncCheckPhoneVerificodeMsg } = this.props;
                                validateFields((error, values) => {
                                    if (!(error.verificationCode || error.phone)) {
                                        asyncCheckPhoneVerificodeMsg(values).then((res) => {
                                            if (res.code === 0) {
                                                history.replace({
                                                    type: 'change',
                                                    phone: values.phone,
                                                }, '/login');
                                            } else {
                                                message.error(res.msg || '异常错误');
                                            }
                                        });
                                    }
                                });
                            }}
                            size="large"
                        >下一步</Button>
                    </FormItem>
                </Col>
            </Row>
        </Fragment>;
    };

    renderChange = () => {
        const { getFieldDecorator, validateFields } = this.props.form;
        const { history } = this.props;
        return <Fragment>
            <FormItem>
                {getFieldDecorator('newpassword', {
                    rules: [
                        {
                            required: true,
                            message: '请输入新密码',
                        },
                    ],
                })(
                    <Password
                        size="large"
                        placeholder="请输入新密码"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />,
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('checkPassword', {
                    rules: [
                        {
                            required: true,
                            message: '请确认密码',
                        },
                    ],
                })(
                    <Password
                        size="large"
                        placeholder="请确认密码"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />,
                )}
            </FormItem>
            <FormItem>
                <Button
                    type="primary"
                    block
                    onClick={() => {
                        const { asyncUpdatePassWord } = this.props;
                        const {
                            phone = '',
                        } = this.props.location;
                        validateFields((errors, values) => {
                            if (!phone) {
                                history.replace({
                                    type: 'check',
                                }, '/login');
                                message.error('未填写手机号码');
                            } else if (!(errors.newpassword || errors.checkPassword)) {
                                asyncUpdatePassWord({
                                    password: values.newpassword,
                                    checkPassword: values.checkPassword,
                                    phone,
                                }).then((res) => {
                                    if (res.code === 0) {
                                        message.success(res.result.data || '异常错误');
                                        setTimeout(() => {
                                            window.location.href = '/login';
                                        }, 1000);
                                    } else {
                                        message.error(res.msg || '异常错误');
                                    }
                                });
                            }
                        });
                    }}
                    size="large"
                >提 交</Button>
            </FormItem>
        </Fragment>;
    };

    render() {
        const {
            type = '',
        } = this.props.location;
        console.info(this.props);
        let formHtml = this.renderLogin();
        if (type === 'check') {
            formHtml = this.renderCheck();
        } else if (type === 'change') {
            formHtml = this.renderChange();
        }
        return (
            <Form onSubmit={this.handleSubmit}>
                {formHtml}
            </Form>
        );
    }
}

const mapDispatch = (dispatch) => {
    return {
        sendLogin: dispatch.login.asyncSendLogin,
        asyncSendPhoneVerificodeMsg: dispatch.login.asyncSendPhoneVerificodeMsg,
        asyncCheckPhoneVerificodeMsg: dispatch.login.asyncCheckPhoneVerificodeMsg,
        asyncUpdatePassWord: dispatch.login.asyncUpdatePassWord,
    };
};

export default Form.create()(connect(null, mapDispatch)(LoginForm));
