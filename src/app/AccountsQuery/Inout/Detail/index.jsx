import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Form,
    Skeleton,
    Descriptions,
    Button,
} from 'antd';

class Detail extends React.Component {
    static propTypes = {
        asyncGetDetail: Proptypes.func,
        detail: Proptypes.object,
    }

    static defaultProps = {
        asyncGetDetail: () => { },
        detail: {},
    }

    constructor(props) {
        super(props);
        this.state = {
            // eslint-disable-next-line react/prop-types
            id: this.props.match.params.id,
        };
    }

    componentDidMount() {
        const { asyncGetDetail } = this.props;
        asyncGetDetail({
            id: this.state.id,
        });
    }

    render() {
        const {
            detail,
        } = this.props;
        return (
            <div>
                <Skeleton loading={false}>
                    <Descriptions>
                        <Descriptions.Item label="帐户号">{detail.accountNum}</Descriptions.Item>
                        <Descriptions.Item label="帐户名称">{detail.accountName}</Descriptions.Item>
                        <Descriptions.Item label="帐户类型">{detail.accountTypeName}</Descriptions.Item>
                        <Descriptions.Item label="记账日期">{detail.recordDay}</Descriptions.Item>
                        <Descriptions.Item label="系统日期">{detail.systemDay}</Descriptions.Item>
                        <Descriptions.Item label="系统时间">{detail.systemHMS}</Descriptions.Item>
                        <Descriptions.Item label="账务类型">{detail.billType}</Descriptions.Item>
                        <Descriptions.Item label="交易类型">{detail.tradeType}</Descriptions.Item>
                        <Descriptions.Item label="业务名称">{detail.businessType}</Descriptions.Item>
                        <Descriptions.Item label="记账流水号">{detail.sequenceNum}</Descriptions.Item>
                        <Descriptions.Item label="资金种类">{detail.moneyType}</Descriptions.Item>
                        <Descriptions.Item label="币种">{detail.currencyType}</Descriptions.Item>
                        <Descriptions.Item label="收入金额">{detail.inMoney || 0}</Descriptions.Item>
                        <Descriptions.Item label="支出金额">{detail.outMoney || 0}</Descriptions.Item>
                        <Descriptions.Item label="账户余额">{detail.currentBalance}</Descriptions.Item>
                    </Descriptions>
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            style={{ margin: '0 auto' }}
                            onClick={() => {
                                window.history.back();
                            }}
                        >返回</Button>
                    </div>
                </Skeleton>

            </div>
        );
    }
}
const mapState = (state) => {
    return {
        detail: state.inoutList.detail,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetDetail: dispatch.inoutList.asyncGetDetail,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(Detail));
