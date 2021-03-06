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
// import { searchOptionsCommon } from '../optionsCommon';

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
        const { clearClassDetail } = this.props;
        clearClassDetail();
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
                <Skeleton loading={loading} active paragraph={{ rows: 15 }}>
                    <Descriptions>
                        <Descriptions.Item label="????????????">{detail.companyCode||'???'}</Descriptions.Item>
                        <Descriptions.Item label="????????????">{detail.companyName||'???'}</Descriptions.Item>
                        <Descriptions.Item label="????????????">{this.showDict(sysAllDictItems.tax_type,detail.reportType)||'???'}</Descriptions.Item>
                        <Descriptions.Item label="????????????">{detail.taxMonth||'???'}</Descriptions.Item>

                        <Descriptions.Item label="SAP??????????????????">{detail.sapTime||'???'}</Descriptions.Item>
                        <Descriptions.Item label="????????????????????????">{detail.manupTime||'???'}</Descriptions.Item>
                        <Descriptions.Item label="?????????????????????">{this.showDict(sysAllDictItems.declare_push_flag,detail.pushFlag)||'???'}</Descriptions.Item>
                        <Descriptions.Item label="?????????????????????">{detail.message||'???'}</Descriptions.Item>
                    </Descriptions>
                    <Descriptions>
                        <Descriptions.Item label="????????????">{detail.recordData||'???'}</Descriptions.Item>
                    </Descriptions>
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            style={{ margin: '0 auto' }}
                            onClick={() => {
                                window.history.back();
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
        loading: state.loading.effects.taxPush.asyncGetDetail,
        sysAllDictItems: state.login.sysAllDictItems,
        detail:state.taxPush.detail,
    };
};
const mapDispatch = (dispatch) => {
    return {
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
        asyncGetDetail:dispatch.taxPush.asyncGetDetail,
        clearClassDetail:dispatch.taxPush.clearClassDetail,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(VarifyDetail));
