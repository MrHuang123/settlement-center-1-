import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Form, Icon, Input,
} from 'antd';
import sha1 from 'js-sha1';
import { CreateModal } from 'bnq-sys-react-component';
import _forEach from 'lodash.foreach';
import { connect } from 'react-redux';

const FormItem = Form.Item;

class UpdatePassword extends Component {
    static propTypes = {
        asyncUpdatePassword: PropTypes.func,
        form: PropTypes.object,
        viewStr: PropTypes.string,
    };

    static defaultProps = {
        asyncUpdatePassword: () => {},
        form: {},
        viewStr: '',
    };

    onOk = () => {
        const { asyncUpdatePassword, form } = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                _forEach(values, (value, key) => {
                    values[key] = sha1(value);
                });
                asyncUpdatePassword(values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form>
                <FormItem>
                    {getFieldDecorator('oldPassword', {
                        rules: [{ required: true, message: '旧密码不能为空!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入旧密码" />,
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '新密码不能为空!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入新密码" />,
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('confirmPassword', {
                        rules: [{ required: true, message: '再次输入新密码不能为空!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请再次输入新密码" />,
                    )}
                </FormItem>
                <div>{this.props.viewStr}</div>
            </Form>
        );
    }
}

const mapDispatch = (dispatch) => {
    return {
        asyncUpdatePassword: dispatch.changePassword.asyncUpdatePassword,
    };
};

const mapState = (state) => {
    return {
        viewStr: state.changePassword.str,
    };
};
export default CreateModal({
    customBtn: <span className="logout">重置密码</span>,
    title: '密码重置',
    btnType: 'custom',
    maskClosable: true,
    isForm: true,
    destroyOnClose: true,
})(connect(mapState, mapDispatch)(Form.create()(UpdatePassword)));
