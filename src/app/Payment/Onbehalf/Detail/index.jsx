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
                <Title level={4}>??????????????????</Title>
                <hr />
                <Skeleton loading={loading} active paragraph={{ rows: 8 }}>
                    <Descriptions>
                        <Descriptions.Item label="???????????????">{detail.batpayNo||'???'}</Descriptions.Item>
                        <Descriptions.Item label="??????????????????">{detail.batpayUptime||'???'}</Descriptions.Item>
                        <Descriptions.Item label="????????????">{detail.batpayTime||'???'}</Descriptions.Item>

                        <Descriptions.Item label="????????????">{this.showDict(sysAllDictItems.batpay_statu,detail.batpayStatu)||'???'}</Descriptions.Item>
                        <Descriptions.Item label="??????/??????">{this.showEnum(companyType,detail.companyType)}</Descriptions.Item>

                        <Descriptions.Item label="??????????????????">{detail.receviName}</Descriptions.Item>
                        <Descriptions.Item label="???????????????">{detail.receCardno||'???'}</Descriptions.Item>
                        <Descriptions.Item label="?????????????????????">{detail.receBankname||'???'}</Descriptions.Item>
                        
                        <Descriptions.Item label="?????????????????????">{detail.reveBankno||'???'}</Descriptions.Item>
                        <Descriptions.Item label="????????????">{detail.amout||'???'}</Descriptions.Item>
                    </Descriptions>
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            style={{ margin: '0 auto' }}
                            onClick={() => {
                                window.close();
                            }}
                        >??????</Button>
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
