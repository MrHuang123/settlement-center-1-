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
import { companyType } from '../List/columns';

const { Title } = Typography;

class VarifyDetail extends Component {
    static propTypes = {
        loading: Proptypes.bool,
        getSysAllDictItems: Proptypes.func,
        sysAllDictItems: Proptypes.object,
    }

    static defaultProps = {
        loading: false,
        getSysAllDictItems: () => { },
        sysAllDictItems: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            // eslint-disable-next-line react/prop-types
            subjectNo: this.props.match.params.id,
        };
    }

    componentDidMount() {
        const {
            asyncGetDetail,
        }=this.props;
        asyncGetDetail({
            id:this.props.match.params.id
        });
    }

    componentWillUnmount() {
        const {
            clearData,
        }=this.props;
        clearData();
    }

    showEnum = (arr, code) => {
        if (arr) {
            // eslint-disable-next-line no-restricted-syntax
            for (const v of arr) {
                // eslint-disable-next-line eqeqeq
                if (v.code == code) {
                    return v.description;
                }
            }
        } else {
            return '';
        }
        return '';
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
            loading,
            sysAllDictItems,
        } = this.props;
        return (
            <div>
                <Title level={4}>查看付款明细</Title>
                <hr />
                <Skeleton loading={loading} active paragraph={{ rows: 8 }}>
                    <Descriptions>
                        <Descriptions.Item label="代付批次号">{detail.batpayNo||'无'}</Descriptions.Item>
                        <Descriptions.Item label="打款上传时间">{detail.batpayUptime||'无'}</Descriptions.Item>
                        <Descriptions.Item label="付款时间">{detail.batpayTime||'无'}</Descriptions.Item>

                        <Descriptions.Item label="付款状态">{this.showDict(sysAllDictItems.batpay_statu,detail.batpayStatu)||'无'}</Descriptions.Item>
                        <Descriptions.Item label="对公/对私">{this.showEnum(companyType,detail.companyType)}</Descriptions.Item>

                        <Descriptions.Item label="收款账户名称">{detail.receviName}</Descriptions.Item>
                        <Descriptions.Item label="收款账户号">{detail.receCardno||'无'}</Descriptions.Item>
                        <Descriptions.Item label="收款开户行名称">{detail.receBankname||'无'}</Descriptions.Item>
                        
                        <Descriptions.Item label="收款开户行行号">{detail.reveBankno||'无'}</Descriptions.Item>
                        <Descriptions.Item label="付款金额">{detail.amout||'无'}</Descriptions.Item>
                    </Descriptions>
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            style={{ margin: '0 auto' }}
                            onClick={() => {
                                window.close();
                            }}
                        >关闭</Button>
                    </div>
                </Skeleton>
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        loading: state.loading.effects.payment.asyncGetDetail,
        sysAllDictItems: state.login.sysAllDictItems,
        detail:state.payment.detail,
    };
};
const mapDispatch = (dispatch) => {
    return {
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
        asyncGetDetail:dispatch.payment.asyncGetDetail,
        clearClassDetail:dispatch.payment.clearClassDetail,
        clearData:dispatch.payment.clearData,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(VarifyDetail));
