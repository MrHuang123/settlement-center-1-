/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import {
    Form,
    Button,
    Skeleton,
    Typography,
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
            no: this.props.match.params.id,
        };
    }

    componentDidMount() {
        const {
            getInnerDetail,
            getSysAllDictItems,
            asyncGetClassAll,
        } = this.props;
        const { no } = this.state;
        getSysAllDictItems();
        asyncGetClassAll();
        getInnerDetail({
            no,
        });
    }

    render() {
        const {
            loading,
            innerDetail,
            classAll,
            sysAllDictItems,
        } = this.props;
        const subjectName = (subjectNo) => {
            // eslint-disable-next-line no-restricted-syntax
            for (const v of classAll) {
                if (v.subjectNo === subjectNo) {
                    return v.subjectName;
                }
            }
            return '';
        };
        const whichOrg = (list, no) => {
            let org = '';
            // eslint-disable-next-line no-bitwise
            if (list) {
                if (list.length > 0) {
                    // eslint-disable-next-line no-restricted-syntax
                    for (const i of list) {
                        if (i.value === no) {
                            org = i.text;
                        }
                    }
                } else {
                    org = '无';
                }
            }
            return org;
        };
        return (
            <div>
                <Title level={4}>内部账户详情</Title>
                <hr />
                <Skeleton loading={loading} active paragraph={{ rows: 15 }}>
                    <div className="clearfix">
                        <div className="detailsBox clearfix">
                            <div className="detailsLabel pull-left">内部户号:</div>
                            <div className="detailsValue pull-left">{innerDetail.internalAccountNo}</div>
                        </div>
                        <div className="detailsBox clearfix">
                            <div className="detailsLabel pull-left">内部账户名称:</div>
                            <div className="detailsValue pull-left">{innerDetail.internalAccountName}</div>
                        </div>
                        <div className="detailsBox clearfix">
                            <div className="detailsLabel pull-left">对应科目号:</div>
                            <div className="detailsValue pull-left">{innerDetail.subjectNo}</div>
                        </div>
                        <div className="detailsBox clearfix">
                            <div className="detailsLabel pull-left">对应科目名称:</div>
                            <div className="detailsValue pull-left">{
                                subjectName(innerDetail.subjectNo)
                            }</div>
                        </div>
                        <div className="detailsBox clearfix">
                            <div className="detailsLabel pull-left">账户状态:</div>
                            <div className="detailsValue pull-left">{innerDetail.internalAccountStatus == 0 ? '失效' : '生效'}</div>
                        </div>
                        <div className="detailsBox clearfix">
                            <div className="detailsLabel pull-left">帐户所属机构:</div>
                            <div className="detailsValue pull-left">{whichOrg(sysAllDictItems.org_no, innerDetail.orgNo)}</div>
                        </div>
                        <div className="detailsBox clearfix">
                            <div className="detailsLabel pull-left">是否允许透支:</div>
                            <div className="detailsValue pull-left">{innerDetail.allowOverdrawFlag == 0 ? '不允许' : '允许'}</div>
                        </div>
                        <div className="detailsBox clearfix">
                            <div className="detailsLabel pull-left">特征码:</div>
                            <div className="detailsValue pull-left">{innerDetail.featureCode}</div>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            style={{ margin: '0 auto' }}
                            type="primary"
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
        innerDetail: state.accountManageInner.innerDetail,
        classAll: state.accountManageInner.classAll,
        loading: state.loading.effects.accountManageInner.asyncGetInnerDetail,
        sysAllDictItems: state.login.sysAllDictItems,
    };
};

const mapDispatch = (dispatch) => {
    return {
        getInnerDetail: dispatch.accountManageInner.asyncGetInnerDetail,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
        asyncGetClassAll: dispatch.accountManageInner.asyncGetClassAll,
    };
};

export default connect(mapState, mapDispatch)(Form.create()(VarifyDetail));
