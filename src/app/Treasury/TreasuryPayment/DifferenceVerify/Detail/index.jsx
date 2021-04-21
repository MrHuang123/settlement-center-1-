import React, { Component } from 'react';
import {
    Form,
    Button,
    Typography,
    Descriptions,
    Spin,
    Row,
    Col,
} from 'antd';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';

const { Title } = Typography;

class Detail extends Component {
    static propTypes = {
        detail: Proptypes.array,
        clearDetail: Proptypes.func,
        asyncGetDetail: Proptypes.func,
        match: Proptypes.object,
        loading: Proptypes.bool,
    }

    static defaultProps = {
        detail: {},
        match: {},
        clearDetail: () => { },
        asyncGetDetail: () => { },
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
        } = this.props;
        return (
            <div>
                <Title level={4}>差额处理审核详情</Title>
                <hr />
                <Spin spinning={loading}>
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
                    <Descriptions>
                        <Descriptions.Item label="差额处理方式">{detail.processType}</Descriptions.Item>
                        <Descriptions.Item label="处理状态">{detail.processStatus}</Descriptions.Item>
                    </Descriptions>
                    <Descriptions>
                        <Descriptions.Item label="审核说明">{detail.auditMark}</Descriptions.Item>
                    </Descriptions>
                    <Row type="flex" justify="start" gutter={[20, 20]}>
                        <Col offset={6}>
                            <Button
                                style={{ margin: '0 auto' }}
                                onClick={() => {
                                    window.close();
                                }}
                            >关闭</Button>
                        </Col>
                    </Row>
                </Spin>
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        loading: state.loading.effects.differenceVerify.asyncGetDetail,
        detail: state.differenceVerify.detail,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetDetail: dispatch.differenceVerify.asyncGetDetail,
        clearDetail: dispatch.differenceVerify.clearDetail,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(Detail));
