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
                <Title level={4}>??????????????????</Title>
                <hr />
                <Skeleton loading={loading} active>
                    <Descriptions>
                        <Descriptions.Item label="????????????">{detail.tradeTime}</Descriptions.Item>
                        <Descriptions.Item label="??????????????????">{detail.payAmount}</Descriptions.Item>
                        <Descriptions.Item label="??????????????????">{detail.primaryOrder}</Descriptions.Item>

                        <Descriptions.Item label="??????/????????????">{detail.customerCode}</Descriptions.Item>
                        <Descriptions.Item label="??????/????????????">{detail.customerName}</Descriptions.Item>
                        <Descriptions.Item label="??????????????????">{this.showDict(sysAllDictItems.org_no,detail.orgCode)}</Descriptions.Item>

                        <Descriptions.Item label="????????????">{`${detail.billType}-${this.showClass(classAllList,detail.billType,'01')}`}</Descriptions.Item>
                        <Descriptions.Item label="????????????">{`${detail.tradeType}-${this.showClass(classAllList,detail.tradeType,'02')}`}</Descriptions.Item>
                        <Descriptions.Item label="????????????">{`${detail.busType}-${this.showClass(classAllList,detail.busType,'03')}`}</Descriptions.Item>
                        
                        {/* <Descriptions.Item label="???????????????">{detail.outFlowNo}</Descriptions.Item> */}
                        <Descriptions.Item label="??????????????????">{detail.orderAmount}</Descriptions.Item>
                        <Descriptions.Item label="???????????????">{detail.platFee}</Descriptions.Item>
                        <Descriptions.Item label="???????????????">{detail.channelFee}</Descriptions.Item>
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
