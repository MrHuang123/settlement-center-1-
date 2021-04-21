/* eslint-disable  */
import React from 'react';
import { connect } from 'react-redux';
import {
    Form,
    Select,
    Modal,
    Input,
    message,
} from 'antd';

const FormItem = Form.Item;
class ModalNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmLoading: false,
        };
    }

    render() {
        const {
            form,
            asyncAdd,
        } = this.props;
        const { getFieldDecorator } = form;
        const col = {
            labelCol: {
                span: 5,
            },
            wrapperCol: {
                span: 18,
            },
        };
        return (
            <React.Fragment>
                <Modal
                    {...this.props.domProps}
                    confirmLoading={this.state.confirmLoading}
                    onOk={() => {
                        const { validateFieldsAndScroll } = form;
                        const { that } = this.props;
                        validateFieldsAndScroll((err, values) => {
                            if (err) {
                                return;
                            }
                            this.setState({
                                confirmLoading: true,
                            });
                            asyncAdd({
                                ...values,
                            }).then(result => {
                                this.setState({
                                    confirmLoading: false,
                                }, () => {
                                    if (result.success) {
                                        message.success(result.message);
                                        that.setState({
                                            openModal: false,
                                        });
                                        that.props.asyncGetList({
                                            ...this.props.searchData,
                                        });
                                    }
                                })

                            });
                        });
                    }}
                >
                    <Form>
                        <FormItem label="备用金帐户名称" {...col}>
                            {
                                getFieldDecorator('pettyCashAccountname', {
                                    initialValue: '',
                                    rules: [
                                        { required: true, message: '备用金帐户名称不能为空' },
                                    ],
                                })(
                                    <Input maxLength={20} />,
                                )
                            }
                        </FormItem>
                        <FormItem label="账户状态" {...col}>
                            {
                                getFieldDecorator('state', {
                                    initialValue: '',
                                    rules: [
                                        { required: true, message: '账户状态不能为空' },
                                    ],
                                })(
                                    <Select style={{ width: '100%' }}>
                                        <Select.Option value="01">有效</Select.Option>
                                        <Select.Option value="02">失效</Select.Option>
                                    </Select>,
                                )
                            }
                        </FormItem>
                    </Form>
                </Modal>
            </React.Fragment>
        );
    }
}

const mapState = (state) => {
    return {
        searchData: state.spareAccount.searchData,
    };
};

const mapDispatch = (dispatch) => {
    return {
        asyncAdd: dispatch.spareAccount.asyncAdd,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(ModalNew));
