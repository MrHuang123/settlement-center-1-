/* eslint-disable */
import React, { Component } from 'react';
import {
    Form,
    Button,
    Skeleton,
    Typography,
    Descriptions,
} from 'antd';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';

const { Title } = Typography;

class VarifyDetail extends Component {
    static propTypes = {
        loading: Proptypes.bool,
        getInnerDetail: Proptypes.func,
        innerDetail: Proptypes.object,
        classAll: Proptypes.array,
        getSysAllDictItems: Proptypes.func,
        sysAllDictItems: Proptypes.object,
        asyncGetClassAll: Proptypes.func,
    }

    static defaultProps = {
        loading: true,
        getInnerDetail: () => { },
        innerDetail: {},
        classAll: [],
        getSysAllDictItems: () => { },
        sysAllDictItems: {},
        asyncGetClassAll: () => { },
    }

    constructor(props) {
        super(props);
        this.state = {
            // eslint-disable-next-line react/prop-types
            id: this.props.match.params.id,
        };
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

    showClass = (classAllList,text,level)=>{
        let result='';
        classAllList.forEach(element => {
            if((element.classNo===text)&&(element.classLevel===level)){
                result=element.className;
            }
        });
        return result
    }

    componentDidMount() {
        const {
            asyncGetDetail,
            getSysAllDictItems,
            getClassList,
        } = this.props;
        const { id } = this.state;
        getSysAllDictItems();
        getClassList();
        asyncGetDetail({
            id,
        });
    }

    render() {
        const {
            loading,
            detail,
            classAllList,
            sysAllDictItems,
        } = this.props;
        return (
            <div>
                <Title level={4}>出金交易查询</Title>
                <hr />
                <Skeleton loading={loading} active>
                    <Descriptions>
                        <Descriptions.Item label="交易日期">{detail.tradeTime}</Descriptions.Item>
                        <Descriptions.Item label="出金结算金额">{detail.payAmount}</Descriptions.Item>
                        <Descriptions.Item label="原业务订单号">{detail.primaryOrder}</Descriptions.Item>

                        <Descriptions.Item label="商户/客户编号">{detail.customerCode}</Descriptions.Item>
                        <Descriptions.Item label="商户/客户名称">{detail.customerName}</Descriptions.Item>
                        <Descriptions.Item label="账务所属机构">{this.showDict(sysAllDictItems.org_no,detail.orgCode)}</Descriptions.Item>

                        <Descriptions.Item label="账务类型">{`${detail.billType}-${this.showClass(classAllList,detail.billType,'01')}`}</Descriptions.Item>
                        <Descriptions.Item label="交易类型">{`${detail.tradeType}-${this.showClass(classAllList,detail.tradeType,'02')}`}</Descriptions.Item>
                        <Descriptions.Item label="业务名称">{`${detail.busType}-${this.showClass(classAllList,detail.busType,'03')}`}</Descriptions.Item>
                        
                        {/* <Descriptions.Item label="出金流水号">{detail.outFlowNo}</Descriptions.Item> */}
                        <Descriptions.Item label="订单实收金额">{detail.orderAmount}</Descriptions.Item>
                        <Descriptions.Item label="平台服务费">{detail.platFee}</Descriptions.Item>
                        <Descriptions.Item label="渠道手续费">{detail.channelFee}</Descriptions.Item>
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
        detail: state.outMoney.detail,
        classAllList: state.accountManageRule.classList,
        loading: state.loading.effects.outMoney.asyncGetDetail,
        sysAllDictItems: state.login.sysAllDictItems,
    };
};

const mapDispatch = (dispatch) => {
    return {
        asyncGetDetail: dispatch.outMoney.asyncGetDetail,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
        getClassList: dispatch.accountManageRule.asyncGetClassList,
    };
};

export default connect(mapState, mapDispatch)(Form.create()(VarifyDetail));
