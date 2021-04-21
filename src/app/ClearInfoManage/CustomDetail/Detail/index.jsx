/* eslint-disable */
import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Form,
    Skeleton,
    Button,
    Typography,
    Row,
    Col,
    Descriptions,
} from 'antd';

const { Title } = Typography;
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
            accountNo: this.props.match.params.accountNo,
            sequenceNum: this.props.match.params.sequenceNum,
        };
    }

    componentDidMount() {
        const { asyncGetDetail,getClassList,getSysAllDictItems } = this.props;
        getClassList();
        getSysAllDictItems();
        asyncGetDetail({
            accountNo: this.state.accountNo,
            sequenceNum: this.state.sequenceNum,
        });
    }

    handleClick=()=>{
        const { validateFieldsAndScroll } = this.props.form;
        validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }
        });
    }

    showClass=(classAllList,text,level)=>{
        let result;
        classAllList.forEach(element => {
            if((element.classNo===text)&&(element.classLevel===level)){
                result=element.className;
            }
        });
        return result;
    }

    showDict = (arr, code) => {
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
        const {
            detail,
            classAllList,
            sysAllDictItems,
            loading,
        } = this.props;
        return (
            <div>
                <Skeleton loading={loading}>
                    <Title level={4}>{`商户账户收支详情`}</Title>
                    <hr />
                    <Descriptions>
                        <Descriptions.Item label='商户编号'>{detail.custno}</Descriptions.Item>
                        <Descriptions.Item label='商户名称'>{detail.custna}</Descriptions.Item>
                        <Descriptions.Item label='业务订单号'>{detail.orderNum}</Descriptions.Item>

                        <Descriptions.Item label='账务类型'>{this.showClass(classAllList,detail.billType,'01')}</Descriptions.Item>
                        <Descriptions.Item label='交易类型'>{this.showClass(classAllList,detail.tradeType,'02')}</Descriptions.Item>
                        <Descriptions.Item label='业务名称'>{this.showClass(classAllList,detail.businessCode,'03')}</Descriptions.Item>
                        
                        <Descriptions.Item label='记账日期'>{detail.recordTime}</Descriptions.Item>
                        <Descriptions.Item label='系统日期'>{detail.systemDate}</Descriptions.Item>
                        <Descriptions.Item label='系统时间'>{detail.systemTime}</Descriptions.Item>

                        <Descriptions.Item label='商户账户号'>{'1009895'}</Descriptions.Item>
                        <Descriptions.Item label='帐户名称'>{detail.accountName}</Descriptions.Item>
                        <Descriptions.Item label='帐户类型'>{this.showDict(sysAllDictItems.in_out_type,detail.accountType)}</Descriptions.Item>
                        
                        <Descriptions.Item label='记账流水号'>{detail.sequenceNum}</Descriptions.Item>
                        <Descriptions.Item label='资金种类'>{this.showDict(sysAllDictItems.cash_type,detail.moneyType)}</Descriptions.Item>
                        <Descriptions.Item label='币种'>{detail.currencyType}</Descriptions.Item>
                        
                        <Descriptions.Item label='收入金额'>{detail.inMoney}</Descriptions.Item>
                        <Descriptions.Item label='支出金额'>{detail.outMoney}</Descriptions.Item>
                        <Descriptions.Item label='账户余额'>{detail.currentBalance}</Descriptions.Item>
                        
                        <Descriptions.Item label='账务所属机构'>{this.showDict(sysAllDictItems.org_no,detail.accountOrg)}</Descriptions.Item>
                    </Descriptions>
                    <Row gutter={[16, 8]} style={{marginTop:'20px'}}>
                        <Col offset={4}>
                            <Button
                                onClick={() => {
                                    window.history.back();
                                }}
                            >返回</Button>
                        </Col>
                    </Row>
                </Skeleton>
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        detail: state.merchant.detail,
        classAllList: state.accountManageRule.classList,
        sysAllDictItems: state.login.sysAllDictItems,
        loading:state.loading.effects.merchant.asyncGetDetail,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetDetail: dispatch.merchant.asyncGetDetail,
        getClassList: dispatch.accountManageRule.asyncGetClassList,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(Detail));
