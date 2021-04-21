/* eslint-disable */
import React, { Component } from 'react';
import {
    Form,
    Button,
    Skeleton,
    Typography,
    Table,
    Row,
    Col,
} from 'antd';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { Tools } from '../../../../../util/index';

const { Title } = Typography;

class VarifyDetail extends Component {
    static propTypes = {
        loading: Proptypes.bool,
        asyncGetDetail: Proptypes.func,
        innerDetail: Proptypes.object,
        classAll: Proptypes.array,
        getSysAllDictItems: Proptypes.func,
        sysAllDictItems: Proptypes.object,
        getClassList: Proptypes.func,
    }

    static defaultProps = {
        loading: true,
        asyncGetDetail: () => { },
        innerDetail: {},
        classAll: [],
        getSysAllDictItems: () => { },
        sysAllDictItems: {},
        getClassList: () => { },
    }

    constructor(props) {
        super(props);
        this.state = {
            // eslint-disable-next-line react/prop-types
            id: this.props.match.params.id,
        };
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
            detailList,
            classAllList,
            sysAllDictItems,
        } = this.props;
        const columnsList =[
            {
                name:'序号',
                dataindex: 'index',
                render:(text)=>{
                    return <span>{text+1}</span>
                }
            },{
                name:'商户号/客户编号',
                dataindex: 'customerCode',
                width: 180,
            },{
                name:'商户名称/客户名称',
                dataindex: 'customerName',
                width: 240,
            },{
                name:'付款日期',
                dataindex: 'payDate',
                width: 180,
            },{
                name:'付款类型',
                dataindex: 'tradeType',
                width: 180,
                render:(text)=>{
                    let result='';
                    classAllList.forEach(item=>{
                        if((item.classNo===text)&&(item.classLevel==='02')){
                            result=`${item.classNo}-${item.className}`
                        }
                    });
                    return (<span>{result}</span>)
                }
            },{
                name:'付款机构名称',
                dataindex: 'payOrgName',
            },{
                name:'申请总金额',
                dataindex: 'amount',
            },{
                name:'付款操作状态',
                dataindex:'operState',
            },{
                name:'审核状态',
                dataindex:'auditState',
            },{
                name:'付款状态',
                dataindex: 'paymentState',
            },
        ];
        const columns = Tools.genTableOptions(columnsList);
        let width = 0;
        columns.forEach((item) => {
            if (item.width) {
                width += item.width;
            } else {
                width += 120;
            }
        });
        return (
            <div>
                <Title level={4}>查看付款明细</Title>
                <hr />
                <Skeleton loading={loading} active>
                    <Table
                        columns={columns}
                        scroll={{x:width}}
                        align='center'
                        rowClassName={()=>{return 'tableStyle'}}
                        dataSource={detailList.map((item,index)=>{
                            return{
                                ...item,
                                index,
                                auditState:detail.auditState,
                                paymentState:detail.paymentState,
                                operState:detail.operState,
                            }
                        })}
                        rowKey={(record) => {
                            return `${record.index}`;
                        }}
                        pagination={false}
                    >
                    </Table>

                    <Row gutter={[16, 8]} style={{marginTop:'20px'}}>
                        <Col>
                            <p>明细总数：<span>{detailList.length}</span></p>
                        </Col>
                        <Col offset={10}>
                            <Button
                                onClick={() => {
                                    window.history.back();
                                }}
                            >返回</Button>
                        </Col>
                    </Row>
                </Skeleton>
            </div>
        );
    }
}

const mapState = (state) => {
    return {
        detail: state.payProcess.detail,
        detailList:state.payProcess.detailList,
        loading: state.loading.effects.payProcess.asyncGetDetail,
        sysAllDictItems: state.login.sysAllDictItems,
        classAllList: state.accountManageRule.classList,
    };
};

const mapDispatch = (dispatch) => {
    return {
        asyncGetDetail: dispatch.payProcess.asyncGetDetail,
        getClassList: dispatch.accountManageRule.asyncGetClassList,
    };
};

export default connect(mapState, mapDispatch)(Form.create()(VarifyDetail));
