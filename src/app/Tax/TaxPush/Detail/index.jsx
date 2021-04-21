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
                <Title level={4}>查看会计科目</Title>
                <hr />
                <Skeleton loading={loading} active paragraph={{ rows: 15 }}>
                    <Descriptions>
                        <Descriptions.Item label="公司编号">{detail.companyCode||'无'}</Descriptions.Item>
                        <Descriptions.Item label="公司名称">{detail.companyName||'无'}</Descriptions.Item>
                        <Descriptions.Item label="报表类型">{this.showDict(sysAllDictItems.tax_type,detail.reportType)||'无'}</Descriptions.Item>
                        <Descriptions.Item label="纳税月份">{detail.taxMonth||'无'}</Descriptions.Item>

                        <Descriptions.Item label="SAP报表推送时间">{detail.sapTime||'无'}</Descriptions.Item>
                        <Descriptions.Item label="手工报表推送时间">{detail.manupTime||'无'}</Descriptions.Item>
                        <Descriptions.Item label="推送神州云状态">{this.showDict(sysAllDictItems.declare_push_flag,detail.pushFlag)||'无'}</Descriptions.Item>
                        <Descriptions.Item label="神州云返回消息">{detail.message||'无'}</Descriptions.Item>
                    </Descriptions>
                    <Descriptions>
                        <Descriptions.Item label="推送日志">{detail.recordData||'无'}</Descriptions.Item>
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
