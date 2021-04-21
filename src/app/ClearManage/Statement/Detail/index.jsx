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
import { Tools } from '../../../../util/index';

const { Title } = Typography;

class VarifyDetail extends Component {
    static propTypes = {
        loading: Proptypes.bool,
        getInnerDetail: Proptypes.func,
        innerDetail: Proptypes.object,
        classAll: Proptypes.array,
        getSysAllDictItems: Proptypes.func,
        sysAllDictItems: Proptypes.object,
    }

    static defaultProps = {
        loading: true,
        getInnerDetail: () => { },
        innerDetail: {},
        classAll: [],
        getSysAllDictItems: () => { },
        sysAllDictItems: {},
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
            saId:id,
        });
    }

    render() {
        const {
            loading,
            detail,
        } = this.props;
        const columnsList =[
            {
                name:'序号',
                dataindex: 'index',
                render:(text)=>{
                    return (<span>{text+1}</span>)
                }
            }, {
                name:'付款日期',
                dataindex: 'payDate',
                width: 180,
            }, {
                name:'交易日期',
                dataindex: 'tradeTime',
                width: 180,
            }, {
                name:'原业务订单号',
                dataindex: 'primaryOrder',
                width: 180,
            }, {
                name:'商户号/客户编号',
                dataindex: 'customerCode',
                width: 180,
            }, {
                name:'商户/客户名称',
                dataindex: 'customerName',
                width: 240,
            }, {
                name:'账务类型',
                dataindex: 'billTypeName',
                width: 240,
                render:(text,record)=>{
                    return (<span>{`${record.billType}-${text}`}</span>)
                }
            }, {
                name:'交易类型',
                dataindex: 'tradeTypeName',
                width: 240,
                render:(text,record)=>{
                    return (<span>{`${record.tradeType}-${text}`}</span>)
                }
            }, {
                name:'业务名称',
                dataindex: 'busTypeName',
                width: 240,
                render:(text,record)=>{
                    return (<span>{`${record.busType}-${text}`}</span>)
                }
            }, {
                name: '订单实收金额',
                dataindex: 'orderAmount',
            }, {
                name: '平台服务费',
                dataindex: 'platFee',
            }, {
                name: '渠道手续费',
                dataindex: 'channelFee',
            }, {
                name:'结算金额',
                dataindex: 'amount',
            },{
                name:'付款机构名称',
                dataindex:'payOrgName',
            }
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
                <Title level={4}>结算单明细</Title>
                <hr />
                <Skeleton loading={loading} active paragraph={{ rows: 15 }}>
                    <Table
                        columns={columns}
                        scroll={{x:width}}
                        align='center'
                        rowClassName={()=>{return 'tableStyle'}}
                        dataSource={detail.map((item,index)=>{
                            return {
                                ...item,
                                index,
                            }
                        })}
                        rowKey={(record) => {
                            return record.id;
                        }}
                    >
                    </Table>

                    <Row gutter={[16, 8]} style={{marginTop:'20px'}}>
                        <Col>
                            <p>记录总数：<span>{detail.length}</span></p>
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
        detail: state.statement.detail,
        classList: state.accountManageRule.classList,
        loading: state.loading.effects.statement.asyncGetDetail,
        sysAllDictItems: state.login.sysAllDictItems,
    };
};

const mapDispatch = (dispatch) => {
    return {
        asyncGetDetail: dispatch.statement.asyncGetDetail,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
        getClassList: dispatch.accountManageRule.asyncGetClassList,
    };
};

export default connect(mapState, mapDispatch)(Form.create()(VarifyDetail));
