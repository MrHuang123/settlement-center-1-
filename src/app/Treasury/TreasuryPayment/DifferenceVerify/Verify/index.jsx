import React, { Component } from 'react';
import {
    Form,
    Button,
    Descriptions,
    Typography,
    Input,
    Row,
    Col,
    Spin,
    message,
} from 'antd';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';

const { Title } = Typography;
class Set extends Component {
    static propTypes = {
        detail: Proptypes.array,
        clearDetail: Proptypes.func,
        form: Proptypes.object,
        loading: Proptypes.bool,
        asyncGetDetail: Proptypes.func,
        asyncVerify: Proptypes.func,
        match: Proptypes.object,
    }

    static defaultProps = {
        detail: {},
        clearDetail: () => { },
        form: null,
        loading: true,
        asyncGetDetail: () => { },
        asyncVerify: () => { },
        match: {},
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

    handleVerify = (opinion) => {
        const {
            asyncVerify,
            form,
        } = this.props;
        const {
            validateFieldsAndScroll,
        } = form;
        validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }
            asyncVerify({
                id: this.props.match.params.id,
                opinion,
                auditMark: values.auditMark,
            }).then((data) => {
                if (data.success) {
                    message.success(data.message, 1, () => {
                        window.location.href = '/treasury/payment/differenceverify';
                    });
                } else {
                    message.error(data.message);
                }
            });
        });
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
                    <Title level={4}>??????????????????</Title>
                    <hr />
                    <Descriptions>
                        <Descriptions.Item label="?????????????????????">{detail.serialNumber}</Descriptions.Item>
                        <Descriptions.Item label="???????????????">{detail.payType}</Descriptions.Item>
                        <Descriptions.Item label="????????????">{detail.differenceType}</Descriptions.Item>
                        <Descriptions.Item label="????????????">{detail.differenceMoney}</Descriptions.Item>
                        <Descriptions.Item label="???????????????">{detail.payCenterMoney}</Descriptions.Item>
                        <Descriptions.Item label="??????????????????">{detail.handOverMoney}</Descriptions.Item>
                        <Descriptions.Item label="?????????">{detail.cashierInfo}</Descriptions.Item>
                        <Descriptions.Item label="??????">{detail.shopInfo}</Descriptions.Item>
                    </Descriptions>
                    <Descriptions>
                        <Descriptions.Item label="??????????????????">{detail.processType}</Descriptions.Item>
                        <Descriptions.Item label="????????????">{detail.processStatus}</Descriptions.Item>
                    </Descriptions>
                    <Form>
                        <Form.Item
                            label="????????????"
                            labelCol={
                                { span: 2 }
                            }
                            wrapperCol={
                                { span: 11 }
                            }
                        >
                            {
                                getFieldDecorator('auditMark', {
                                    initialValue: '',
                                })(
                                    <Input.TextArea maxLength={200} />,
                                )
                            }
                        </Form.Item>
                    </Form>
                    <Row type="flex">
                        <Col offset={6}>
                            <Button
                                style={{ margin: '0 auto' }}
                                type="primary"
                                onClick={() => {
                                    this.handleVerify(1);
                                }}
                            >????????????</Button>
                        </Col>
                        <Col offset={1}>
                            <Button
                                style={{ margin: '0 auto' }}
                                onClick={() => {
                                    this.handleVerify(0);
                                }}
                            >????????????</Button>
                        </Col>
                        <Col offset={1}>
                            <Button
                                style={{ margin: '0 auto' }}
                                onClick={() => {
                                    window.close();
                                }}
                            >??????</Button>
                        </Col>
                    </Row>
                </Spin>
            </React.Fragment>
        );
    }
}
const mapState = (state) => {
    return {
        loading: state.loading.effects.differenceVerify.asyncGetDetail || state.loading.effects.differenceVerify.asyncVerify,
        sysAllDictItems: state.login.sysAllDictItems,
        detail: state.differenceVerify.detail,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetDetail: dispatch.differenceVerify.asyncGetDetail,
        clearDetail: dispatch.differenceVerify.clearDetail,
        asyncVerify: dispatch.differenceVerify.asyncVerify,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(Set));
