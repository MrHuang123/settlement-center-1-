import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    Form,
    Descriptions,
    Typography,
    Button,
    Row,
    Col,
    Spin,
} from 'antd';
import { optionsCommon } from '../optionsCommon';

@withRouter
class Detail extends React.Component {
    static propTypes = {
        asyncGetDetail: Proptypes.func,
        clearData: Proptypes.func,
        loading: Proptypes.bool,
        match: Proptypes.object,
        detail: Proptypes.object,
        sysAllDictItems: Proptypes.object,
        getSysAllDictItems: Proptypes.func,
    }

    static defaultProps = {
        asyncGetDetail: () => { },
        clearData: () => { },
        loading: true,
        match: {},
        detail: {},
        sysAllDictItems: {},
        getSysAllDictItems: () => { },
    }

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
        };
    }

    componentDidMount() {
        const {
            id,
        } = this.state;
        const {
            asyncGetDetail,
            getSysAllDictItems,
        } = this.props;
        getSysAllDictItems();
        asyncGetDetail({
            id,
        });
    }

    componentWillUnmount() {
        this.props.clearData();
    }

    showEnum = (arr, code) => {
        if (arr) {
            // eslint-disable-next-line no-restricted-syntax
            for (const v of arr) {
                // eslint-disable-next-line eqeqeq
                if (v.id == code) {
                    return v.name;
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
                <Spin spinning={loading}>
                    <Typography.Title level={4}>????????????????????????</Typography.Title>
                    <Descriptions>
                        <Descriptions.Item label="???????????????">{detail.errorSequenceNum}</Descriptions.Item>
                        <Descriptions.Item label="????????????">{detail.errorTime}</Descriptions.Item>
                        <Descriptions.Item label="????????????">{this.showEnum(optionsCommon('errorType'), detail.errorType)}</Descriptions.Item>

                        <Descriptions.Item label="????????????">{detail.businessBrchno}</Descriptions.Item>
                        <Descriptions.Item label="????????????">{this.showDict(sysAllDictItems.trade_type, detail.tradeType)}</Descriptions.Item>
                        <Descriptions.Item label="????????????">{this.showDict(sysAllDictItems.cooper_business_code, detail.cooperBusinessCode)}</Descriptions.Item>

                        <Descriptions.Item label="????????????">{detail.nostroMoney}</Descriptions.Item>
                        <Descriptions.Item label="??????????????????">{detail.origiOrderNum}</Descriptions.Item>

                        <Descriptions.Item label="????????????">{detail.reciprMoney}</Descriptions.Item>
                        <Descriptions.Item label="??????">{detail.shopId}</Descriptions.Item>
                    </Descriptions>
                    <Row gutter={30}>
                        <Col offset={6}>
                            <Button
                                style={{ margin: '0 auto' }}
                                onClick={() => {
                                    window.close();
                                }}
                            >??????</Button>
                        </Col>
                    </Row>
                </Spin>
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        detail: state.errorHandleDetail.detail,
        loading: state.loading.effects.errorHandleDetail.asyncGetDetail,
        sysAllDictItems: state.login.sysAllDictItems,
    };
};
const mapDispatch = (dispatch) => {
    return {
        editOne: dispatch.errorHandleDetail.editOne,
        asyncGetDetail: dispatch.errorHandleDetail.asyncGetDetail,
        clearData: dispatch.errorHandleDetail.clearData,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(Detail));
