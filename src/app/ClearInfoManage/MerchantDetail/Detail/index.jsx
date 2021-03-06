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
    Descriptions
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
                    <Title level={4}>{`????????????????????????`}</Title>
                    <hr />
                    <Descriptions>
                        <Descriptions.Item label='????????????'>{detail.custno}</Descriptions.Item>
                        <Descriptions.Item label='????????????'>{detail.custna}</Descriptions.Item>
                        <Descriptions.Item label='???????????????'>{detail.orderNum}</Descriptions.Item>

                        <Descriptions.Item label='????????????'>{this.showClass(classAllList,detail.billType,'01')}</Descriptions.Item>
                        <Descriptions.Item label='????????????'>{this.showClass(classAllList,detail.tradeType,'02')}</Descriptions.Item>
                        <Descriptions.Item label='????????????'>{this.showClass(classAllList,detail.businessCode,'03')}</Descriptions.Item>
                        
                        <Descriptions.Item label='????????????'>{detail.recordTime}</Descriptions.Item>
                        <Descriptions.Item label='????????????'>{detail.systemDate}</Descriptions.Item>
                        <Descriptions.Item label='????????????'>{detail.systemTime}</Descriptions.Item>

                        <Descriptions.Item label='???????????????'>{'1009895'}</Descriptions.Item>
                        <Descriptions.Item label='????????????'>{detail.accountName}</Descriptions.Item>
                        <Descriptions.Item label='????????????'>{this.showDict(sysAllDictItems.in_out_type,detail.accountType)}</Descriptions.Item>
                        
                        <Descriptions.Item label='???????????????'>{detail.sequenceNum}</Descriptions.Item>
                        <Descriptions.Item label='????????????'>{this.showDict(sysAllDictItems.cash_type,detail.moneyType)}</Descriptions.Item>
                        <Descriptions.Item label='??????'>{detail.currencyType}</Descriptions.Item>
                        
                        <Descriptions.Item label='????????????'>{detail.inMoney}</Descriptions.Item>
                        <Descriptions.Item label='????????????'>{detail.outMoney}</Descriptions.Item>
                        <Descriptions.Item label='????????????'>{detail.currentBalance}</Descriptions.Item>
                        
                        <Descriptions.Item label='??????????????????'>{this.showDict(sysAllDictItems.org_no,detail.accountOrg)}</Descriptions.Item>
                    </Descriptions>
                    <Row gutter={[16, 8]} style={{marginTop:'20px'}}>
                        <Col offset={4}>
                            <Button
                                onClick={() => {
                                    window.history.back();
                                }}
                            >??????</Button>
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
