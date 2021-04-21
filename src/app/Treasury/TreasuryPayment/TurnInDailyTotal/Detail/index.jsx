import React, { Component } from 'react';
import {
    Form,
    Button,
    Row,
    Col,
    Typography,
    Descriptions,
    Spin,
    Table,
} from 'antd';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { Tools } from '@/util';

const { Title } = Typography;

class Detail extends Component {
    static propTypes = {
        asyncGetDetail: Proptypes.func,
        asyncGetPayType: Proptypes.func,
        clearData: Proptypes.func,
        match: Proptypes.object,
        detail: Proptypes.object,
        loading: Proptypes.bool,
        payType: Proptypes.array,
    }

    static defaultProps = {
        asyncGetDetail: () => { },
        asyncGetPayType: () => { },
        clearData: () => { },
        match: {},
        detail: {},
        loading: false,
        payType: [],
    }

    componentDidMount() {
        const {
            asyncGetDetail,
            asyncGetPayType,
        } = this.props;
        asyncGetPayType();
        asyncGetDetail({
            saleDate: this.props.match.params.saledate,
            shopCode: this.props.match.params.shopcode,
            cashierCode: this.props.match.params.cashiercode,
            // saleDate: '2021-03-30',
            // shopCode: '1004',
            // cashierCode: '10002472',
        });
    }

    componentWillUnmount() {
        const {
            clearData,
        } = this.props;
        clearData();
    }

    render() {
        const {
            detail,
            loading,
            payType,
        } = this.props;
        const columnsOptions = [{
            name: '序号',
            dataindex: 'index',
            width: 120,
        }, {
            name: '支付类型',
            dataindex: 'psid',
            width: 120,
            render: (text) => {
                let result = '';
                payType.forEach((element) => {
                    if (element.id === text) {
                        result = element.name;
                    }
                });
                return <span>{result}</span>;
            },
        }, {
            name: '备用金',
            dataindex: 'recieveAmount',
            width: 120,
        }, {
            name: '应收金额',
            dataindex: 'shouldReceive',
            width: 120,
        }, {
            name: '已交累计金额',
            dataindex: 'handedAmount',
            width: 120,
        }, {
            name: '串户处理金额',
            dataindex: 'errorMoney',
            width: 120,
        }, {
            name: '补款处理金额',
            dataindex: 'ownMoney',
            width: 120,
        }, {
            name: '拾遗处理金额',
            dataindex: 'pickUpMoney',
            width: 120,
        }, {
            name: '差额',
            dataindex: 'nowBalance',
            width: 120,
        }];
        return (
            <div>
                <Title level={4}>交款日汇总明细</Title>
                <hr />
                <Spin spinning={loading}>
                    <Descriptions>
                        <Descriptions.Item label="销售日期">{detail.saleDate}</Descriptions.Item>
                        <Descriptions.Item label="收银员">{detail.cashierName}</Descriptions.Item>
                        <Descriptions.Item label="门店">{detail.shopName}</Descriptions.Item>
                        <Descriptions.Item label="应收金额">{detail.totalShouldReceive}</Descriptions.Item>
                        <Descriptions.Item label="已交总额">{detail.totalHandedAmount}</Descriptions.Item>
                        <Descriptions.Item label="汇总差额">{detail.totalBalanceAmount}</Descriptions.Item>
                        <Descriptions.Item label="最后交款时间">{detail.lastDeliveryTime}</Descriptions.Item>
                    </Descriptions>
                    <Table
                        columns={Tools.genTableOptions(columnsOptions)}
                        dataSource={detail.exchequernCashierDeliveryVOS ? detail.exchequernCashierDeliveryVOS.map((item, index) => {
                            return {
                                ...item,
                                index: index + 1,
                            };
                        }) : []}
                        scroll={{ x: 'max-content' }}
                        pagination={false}
                    />
                    <Row type="flex" gutter={[20, 20]} justify="start" style={{ marginTop: '10px' }}>
                        <Col offset={6}>
                            <Button
                                style={{ margin: '0 auto' }}
                                type="primary"
                                onClick={() => {
                                    Tools.print('ant-layout-content');
                                }}
                            >打印</Button>
                        </Col>
                        <Col>
                            <Button
                                style={{ margin: '0 auto' }}
                                onClick={() => {
                                    window.location.href = '/treasury/payment/dailytotal';
                                }}
                            >返回</Button>
                        </Col>
                    </Row>
                </Spin>
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        loading: state.loading.effects.turninDailyTotal.asyncGetDistinctDetail,
        detail: state.turninDailyTotal.detail,
        payType: state.tradeInout.payType,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetDistinctDetail: dispatch.turninDailyTotal.asyncGetDistinctDetail,
        clearData: dispatch.turninDailyTotal.clearData,
        asyncGetDetail: dispatch.turninDailyTotal.asyncGetDetail,
        asyncGetPayType: dispatch.tradeInout.asyncGetPayType,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(Detail));
