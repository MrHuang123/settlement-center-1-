import React, { Component } from 'react';
import {
    Form,
    Button,
    Skeleton,
    Typography,
} from 'antd';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { searchOptionsCommon } from '../optionsCommon';

const { Title } = Typography;

class VarifyDetail extends Component {
    static propTypes = {
        loading: Proptypes.bool,
        getClassDetail: Proptypes.func,
        clearClassDetail: Proptypes.func,
        classDetail: Proptypes.object,
        classEnum: Proptypes.object,
        getClassEnum: Proptypes.func,
        getSysAllDictItems: Proptypes.func,
        sysAllDictItems: Proptypes.object,
    }

    static defaultProps = {
        loading: false,
        getClassDetail: () => { },
        clearClassDetail: () => { },
        classDetail: {
        },
        classEnum: {
            subjectLevel: [],
        },
        getClassEnum: () => { },
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
        const { subjectNo } = this.state;
        const {
            getClassDetail,
            classEnum,
            getClassEnum,
            getSysAllDictItems,
        } = this.props;
        getSysAllDictItems();
        if (!classEnum.subjectCategoryEnum) {
            getClassEnum();
        }
        getClassDetail({
            subjectNo,
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
            classDetail,
            classEnum,
            loading,
            sysAllDictItems,
        } = this.props;
        return (
            <div>
                <Title level={4}>查看会计科目</Title>
                <hr />
                <Skeleton loading={loading} active paragraph={{ rows: 15 }}>
                    <div className="clearfix">
                        <div className="detailsBox clearfix">
                            <div className="detailsLabel pull-left">科目号:</div>
                            <div className="detailsValue pull-left">{classDetail.subjectNo}</div>
                        </div>
                        <div className="detailsBox clearfix">
                            <div className="detailsLabel pull-left">科目名称:</div>
                            <div className="detailsValue pull-left">{classDetail.subjectName}</div>
                        </div>
                        <div className="detailsBox clearfix">
                            <div className="detailsLabel pull-left">科目级别:</div>
                            <div className="detailsValue pull-left">{this.showEnum(classEnum.subjectLevelEnum, classDetail.subjectLevel)}</div>
                        </div>
                        <div className="detailsBox clearfix">
                            <div className="detailsLabel pull-left">上级科目号:</div>
                            <div className="detailsValue pull-left">{classDetail.parentSubjectNo}</div>
                        </div>
                        <div className="detailsBox clearfix">
                            <div className="detailsLabel pull-left">科目类别:</div>
                            <div className="detailsValue pull-left">{this.showEnum(classEnum.subjectCategoryEnum, classDetail.subjectType)}</div>
                        </div>
                        <div className="detailsBox clearfix">
                            <div className="detailsLabel pull-left">科目状态:</div>
                            <div className="detailsValue pull-left">{this.showEnum(searchOptionsCommon('classStatus'), classDetail.subjectStatus)}</div>
                        </div>
                        <div className="detailsBox clearfix">
                            <div className="detailsLabel pull-left">余额方向:</div>
                            <div className="detailsValue pull-left">{this.showDict(sysAllDictItems.balance_direction, classDetail.balanceDirection)}</div>
                        </div>
                        <div className="detailsBox clearfix">
                            <div className="detailsLabel pull-left">损益结转标识:</div>
                            <div className="detailsValue pull-left">{this.showEnum(sysAllDictItems.profit_loss_flag, classDetail.profitLossFlag)}</div>
                        </div>
                        <div className="detailsBox clearfix">
                            <div className="detailsLabel pull-left">说明:</div>
                            <div className="detailsValue pull-left">{classDetail.memo}</div>
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
        classDetail: state.accountManageClass.classDetail,
        classEnum: state.accountManageClass.classEnum,
        loading: state.loading.effects.accountManageClass.asyncGetClassDetail,
        sysAllDictItems: state.login.sysAllDictItems,
    };
};
const mapDispatch = (dispatch) => {
    return {
        getClassDetail: dispatch.accountManageClass.asyncGetClassDetail,
        clearClassDetail: dispatch.accountManageClass.clearClassDetail,
        getClassEnum: dispatch.accountManageClass.asyncGetClassEnum,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(VarifyDetail));
