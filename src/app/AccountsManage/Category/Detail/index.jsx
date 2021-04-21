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
        getDetail: Proptypes.func,
        detail: Proptypes.object,
        justDetail: Proptypes.func,
        clearData: Proptypes.func,
    }

    static defaultProps = {
        loading: true,
        getDetail: () => { },
        detail: {},
        justDetail: () => { },
        clearData: () => { },
    }

    constructor(props) {
        super(props);
        this.state = {
            // eslint-disable-next-line react/prop-types
            no: this.props.match.params.id,
            initData: {
                accountType: '',
                bussinessType: '',
            },
        };
    }

    componentDidMount() {
        const { no } = this.state;
        const { getDetail, justDetail } = this.props;
        getDetail({
            no,
            // eslint-disable-next-line react/prop-types
            level: this.props.match.params.level,
            // eslint-disable-next-line consistent-return
        }).then((data) => {
            if (data.classLevel === '02') {
                justDetail({
                    no: data.parentClassNo,
                }).then((accountObj) => {
                    this.setState({
                        initData: {
                            accountType: accountObj.className,
                        },
                    });
                    return false;
                });
            } else if (data.classLevel === '03') {
                const bussinessObj = justDetail({
                    no: data.parentClassNo,
                });
                return bussinessObj;
            }
        }).then((bussinessObj) => {
            if (bussinessObj) {
                justDetail({
                    no: bussinessObj.parentClassNo,
                }).then((accountObj) => {
                    this.setState({
                        initData: {
                            accountType: accountObj.className,
                            bussinessType: bussinessObj.className,
                        },
                    });
                });
            }
        });
    }

    componentWillUnmount() {
        const { clearData } = this.props;
        clearData();
    }

    render() {
        const whichLevel = (list, level) => {
            let result = '';
            list.forEach((element) => {
                if (element.id === level) {
                    result = element.name;
                }
            });
            return result;
        };
        const { loading, detail } = this.props;
        const { initData } = this.state;
        return (
            <div>
                <Title level={4}>查看账务分类</Title>
                <hr />
                <Skeleton loading={loading} paragraph={{ rows: 15 }}>
                    <div className="clearfix">
                        <div className="detailsBox clearfix">
                            <div className="detailsLabel pull-left">分类等级:</div>
                            <div className="detailsValue pull-left">{whichLevel(searchOptionsCommon('categoryLevel'), detail.classLevel)}</div>
                        </div>
                        {
                            initData.accountType ? (<div className="detailsBox clearfix">
                                <div className="detailsLabel pull-left">账务类型:</div>
                                <div className="detailsValue pull-left">{initData.accountType}</div>
                            </div>) : null
                        }
                        {
                            initData.bussinessType ? (<div className="detailsBox clearfix">
                                <div className="detailsLabel pull-left">交易类型:</div>
                                <div className="detailsValue pull-left">{initData.bussinessType}</div>
                            </div>) : null
                        }


                        <div className="detailsBox clearfix">
                            <div className="detailsLabel pull-left">类编号:</div>
                            <div className="detailsValue pull-left">{detail.classNo}</div>
                        </div>
                        <div className="detailsBox clearfix">
                            <div className="detailsLabel pull-left">类名称:</div>
                            <div className="detailsValue pull-left">{detail.className}</div>
                        </div>
                        <div className="detailsBox clearfix">
                            <div className="detailsLabel pull-left">排列序号:</div>
                            <div className="detailsValue pull-left">{detail.sortNo}</div>
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
        detail: state.categoryNew.detail,
        loading: state.loading.effects.categoryNew.asyncJustDetail || state.loading.effects.categoryNew.asyncGetDetail,
    };
};
const mapDispatch = (dispatch) => {
    return {
        getDetail: dispatch.categoryNew.asyncGetDetail,
        justDetail: dispatch.categoryNew.asyncJustDetail,
        clearData: dispatch.categoryNew.clearData,
    };
};

export default connect(mapState, mapDispatch)(Form.create()(VarifyDetail));
