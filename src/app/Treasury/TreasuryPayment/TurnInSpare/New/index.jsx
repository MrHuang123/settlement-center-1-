/* eslint-disable  */
import React from 'react';
import {
    Typography,
    Form,
    Button,
    Row,
    Col,
    message,
    Select,
    Table,
    Spin,
    InputNumber,
} from 'antd';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { Tools } from '@/util/index';
import SingleTime from '@/components/SingleTime';
import './index.css';

const { Title } = Typography;
const FormItem = Form.Item;
class New extends React.Component {
    static propTypes = {
        asyncQueryTurnInList: Proptypes.func,
        form: Proptypes.object,
        loading: Proptypes.bool,
        asyncGetShopList: Proptypes.func,
        asyncGetPayType: Proptypes.func,
        shopList: Proptypes.array,
        shopListLoading: Proptypes.bool,
        asyncGetCasherList: Proptypes.func,
        casherList: Proptypes.array,
        payType: Proptypes.array,
        asyncAdd: Proptypes.func,
    }

    static defaultProps = {
        form: null,
        loading: true,
        asyncQueryTurnInList: () => { },
        asyncGetShopList: () => { },
        asyncGetPayType: () => { },
        shopList: [],
        shopListLoading: false,
        asyncGetCasherList: () => { },
        casherList: [],
        payType: [],
        asyncAdd: () => { },
    }

    constructor(props) {
        super(props);
        this.state = {
            result: {},
        };
    }

    componentDidMount() {
        const {
            asyncGetShopList,
            shopList,
            asyncGetPayType,
            asyncCheckStatus,
        } = this.props;
        asyncGetPayType();
        if (shopList.length === 0) {
            asyncGetShopList();
        }
    }

    handleSubmit = () => {
        const {
            form,
            asyncAdd,
            casherList,
            shopList,
        } = this.props;
        const {
            validateFieldsAndScroll,
        } = form;
        validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }
            let cashierName='';
            let shopName='';
            casherList.forEach(item=>{
                if(item.jobNo==values.cashierCode){
                    cashierName=item.employeeName;
                }
            });
            shopList.forEach(item=>{
                if(item.shopCode==values.shopCode){
                    shopName=item.shopName;
                }
            });
            const send = {
                shopCode:values.shopCode,
                shopName,
                cashierCode:values.cashierCode,
                cashierName,
                exchequernCashierDeliveries: [],
            };
            for (const key in values) {
                if (key.includes('_')) {
                    const [, psid] = key.split('_');
                    send.exchequernCashierDeliveries.push({
                        psid,
                        nowPayment: values[key],
                    });
                }
            }
            send.exchequernCashierDeliveries.forEach((item,index)=>{
                let psid=item.psid;
                this.state.result.exchequernCashierDeliveries.forEach(i=>{
                    if(i.psid==psid){
                        send.exchequernCashierDeliveries[index].recieveAmount=i.recieveAmount;
                        send.exchequernCashierDeliveries[index].shouldReceive=i.shouldReceive;
                        send.exchequernCashierDeliveries[index].handedAmount=i.handedAmount;
                        // 计算得来
                        // send.exchequernCashierDeliveries[index].nowBalance=i.recieveAmount+i.shouldReceive-i.handedAmount-item.nowPayment;
                    }
                });
            });
            send.recieveAmount=this.state.result.recieveAmount;
            send.totalShouldReceive=this.state.result.totalShouldReceive;
            send.totalHandedAmount=this.state.result.totalHandedAmount;
            // let totalBalanceAmount=0;
            let totalNowPayment=0;
            send.exchequernCashierDeliveries.forEach(item=>{
                // totalBalanceAmount+=item.nowBalance;
                totalNowPayment+=item.nowPayment;
            });
            // send.totalBalanceAmount=totalBalanceAmount;
            send.totalNowPayment=totalNowPayment;
            send.saleDate=this.state.result.saleDate;
            asyncAdd(send).then((data) => {
                if (data.success) {
                    message.success({
                        content:data.message,
                        duration:1,
                        onClose:()=>{
                            this.setState({
                                result:{},
                            });
                        }
                    });
                } else {
                    message.error(data.message);
                }
            });
        });
    }

    render() {
        const {
            form,
            loading,
            shopListLoading,
            shopList,
            asyncGetCasherList,
            casherList,
            asyncQueryTurnInList,
            payType,
            asyncCheckStatus,
        } = this.props;
        const { getFieldDecorator } = form;
        const columnsOptions = [{
            name: '序号',
            dataindex: 'dataIndex',
            width: '10%',
        }, {
            name: '支付类型',
            dataindex: 'psid',
            width: '14%',
            render: (text) => {
                let result = '';
                payType.forEach((item) => {
                    if (item.id === text) {
                        result = item.name;
                    }
                });
                return <span>{result}</span>;
            },
        }, {
            name: '备用金',
            dataindex: 'recieveAmount',
            width: '14%',
        }, {
            name: '应收金额',
            dataindex: 'shouldReceive',
            width: '14%',
        }, {
            name: '已交累计金额',
            dataindex: 'handedAmount',
            width: '14%',
        }, {
            name: '当前差额',
            dataindex: 'nowBalance',
            width: '14%',
        }, {
            name: '本次交款金额',
            dataindex: 'nowPayment',
            width: '20%',
            render: (text, rc) => {
                return text !== null ? <React.Fragment>
                    <FormItem style={{ marginBottom: 0 }}>
                        {
                            getFieldDecorator(`nowPayment_${rc.psid}`, {
                                initialValue: text,
                            })(
                                <InputNumber style={{width:'100%'}} size="small" />,
                            )
                        }
                    </FormItem>
                </React.Fragment> : null;
            },
        }];
        return (
            <React.Fragment>
                <Spin spinning={loading}>
                    <Title level={4}>新增交款</Title>
                    <hr />
                    <Form
                        labelCol={
                            { span: 6 }
                        }
                        wrapperCol={
                            { span: 18 }
                        }
                    >
                        <Spin spinning={shopListLoading}>
                            <Row type="flex" align="top">
                            <Col span={6}>
                                    <FormItem label="门店">
                                        {
                                            getFieldDecorator('shopCode', {
                                                initialValue: '',
                                                rules: [
                                                    { required: true, message: '门店不能为空' },
                                                ],
                                            })(
                                                <Select
                                                    onChange={(shopCode) => {
                                                        asyncGetCasherList({
                                                            shopCode,
                                                        });
                                                    }}
                                                >
                                                    {
                                                        shopList.map((item) => {
                                                            return <Select.Option key={item.shopCode} value={item.shopCode}>{item.shopName}</Select.Option>;
                                                        })
                                                    }
                                                </Select>,
                                            )
                                        }
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem label="收银员">
                                        {
                                            getFieldDecorator('cashierCode', {
                                                initialValue: '',
                                                rules: [
                                                    { required: true, message: '收银员不能为空' },
                                                ],
                                            })(
                                                <Select style={{ width: '100%' }}>
                                                    {
                                                        casherList.map((item) => {
                                                            return <Select.Option key={item.id} value={item.jobNo}>{`${item.attendanceLocation}--${item.employeeName}`}</Select.Option>;
                                                        })
                                                    }
                                                </Select>,
                                            )
                                        }
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem label="销售日期">
                                        {
                                            getFieldDecorator('createTime', {
                                                initialValue: null,
                                                rules: [{
                                                    required: true,
                                                    message: '请选择销售日期',
                                                }],
                                            })(
                                                <SingleTime />,
                                            )
                                        }
                                    </FormItem>
                                </Col>
                                <Col span={5} offset={1}>
                                    <Button
                                        style={{ marginTop: '4px' }}
                                        onClick={() => {
                                            const {
                                                validateFieldsAndScroll,
                                            } = form;
                                            validateFieldsAndScroll((err, values) => {
                                                if (err) {
                                                    return;
                                                }
                                                const day1 = new Date();
                                                day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
                                                const s1 = `${day1.getFullYear()}-${day1.getMonth() + 1}-${day1.getDate()}`;
                                                asyncCheckStatus({
                                                    shopCode: values.shopCode,
                                                    cashierCode: values.cashierCode,
                                                    startSaleDate: `${s1} 00:00:00`,
                                                    endSaleDate: `${s1} 23:59:59`,
                                                }).then((data) => {
                                                    if (data.success) {
                                                        // 可以交款
                                                        const send = {
                                                            shopCode:values.shopCode,
                                                            cashierCode:values.cashierCode,
                                                            saleDate:values.createTime,
                                                        };
                                                        asyncQueryTurnInList({
                                                            ...send,
                                                        }).then((data) => {
                                                            if (data.success) {
                                                                message.success(data.message);
                                                                if(data.result){
                                                                    this.setState({
                                                                        result: data.result,
                                                                    });
                                                                }
                                                            }
                                                        });
                                                    } else {
                                                        Modal.warning({
                                                            title: '交款提醒',
                                                            content: '昨天的金库交款差额数据未处理完，请先处理差额数据。',
                                                        });
                                                    }
                                                });
                                            });
                                        }}
                                    >查询列表</Button>
                                </Col>
                            </Row>
                        </Spin>
                    </Form>
                    <Row style={{ marginTop: '20px' }}>
                        <Col span={24}>
                            <Table
                                size="small"
                                columns={Tools.genTableOptions(columnsOptions)}
                                dataSource={this.state.result.exchequernCashierDeliveries ? this.state.result.exchequernCashierDeliveries.map((item, index) => {
                                    return {
                                        ...item,
                                        dataIndex: index + 1,
                                    };
                                }).concat({
                                    // 待沟通，缺少备用金的合计
                                    nowPayment: null,
                                    dataIndex: <span style={{ fontWeight: 'bold' }}>合计</span>,
                                    recieveAmount: <span style={{ fontWeight: 'bold' }}>{this.state.result.recieveAmount}</span>,
                                    shouldReceive: <span style={{ fontWeight: 'bold' }}>{this.state.result.totalShouldReceive}</span>,
                                    handedAmount: <span style={{ fontWeight: 'bold' }}>{this.state.result.totalHandedAmount}</span>,
                                    nowBalance: <span style={{ fontWeight: 'bold' }}>{this.state.result.totalBalanceAmount}</span>,
                                }) : []}
                                scroll={{ x: 'max-content' }}
                                pagination={false}
                                rowKey={(record) => { return record.dataIndex; }}
                            />
                        </Col>
                    </Row>
                    <Row gutter={[30, 30]} type="flex">
                        <Col offset={6}>
                            <Button
                                type="primary"
                                onClick={this.handleSubmit}
                            >确认交款</Button>
                        </Col>
                        <Col>
                            <Button
                                offset={1}
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
        shopList: state.tradeInout.shopList,
        casherList: state.tradeInout.casherList,
        loading: state.loading.effects.tradeInout.asyncGetShopList
        || state.loading.effects.turninSpare.asyncQueryTurnInList
        || state.loading.effects.turninSpare.asyncCheckStatus
        || state.loading.effects.turninSpare.asyncAdd,
        shopListLoading: state.loading.effects.tradeInout.asyncGetCasherList,
        payType: state.tradeInout.payType,
    };
};

const mapDispatch = (dispatch) => {
    return {
        asyncQueryTurnInList: dispatch.turninSpare.asyncQueryTurnInList,
        asyncGetShopList: dispatch.tradeInout.asyncGetShopList,
        asyncGetCasherList: dispatch.tradeInout.asyncGetCasherList,
        asyncGetPayType: dispatch.tradeInout.asyncGetPayType,
        asyncAdd: dispatch.turninSpare.asyncAdd,
        asyncCheckStatus: dispatch.turninSpare.asyncCheckStatus,
    };
};

export default connect(mapState, mapDispatch)(Form.create()(New));
