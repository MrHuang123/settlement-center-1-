/* eslint-disable  */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    Form,
    Descriptions,
    Typography,
    Table,
    Button,
    Row,
    Col,
    Spin,
} from 'antd';
const { Column, ColumnGroup } = Table;
import './index.less';

@withRouter
class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id:this.props.match.params.id,
        }
    }
    componentDidMount(){
        const {
            asyncGetDetail,
            getSysAllDictItems
        }=this.props;
        getSysAllDictItems();
        asyncGetDetail({
            checkBatchNo:this.state.id,
        });
    }
    showDict=(arr,code)=>{
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
            sysAllDictItems,
            loading,
        } = this.props;
        return (
            <div>
                <Spin spinning={loading}>
                    <Typography.Title level={4}>对账汇总结果详情</Typography.Title>
                    <Descriptions>
                        <Descriptions.Item label="对账批次号">{detail.length>0?detail[0].checkBatchNo:''}</Descriptions.Item>
                        <Descriptions.Item label="对账日期">{detail.length>0?detail[0].origiTrandt:''}</Descriptions.Item>
                        <Descriptions.Item label="账务所属机构">{this.showDict(sysAllDictItems.org_no,detail.length>0?detail[0].accountBrchno:'')}</Descriptions.Item>

                        <Descriptions.Item label="合作机构">{this.showDict(sysAllDictItems.business_brchno,detail.length>0?detail[0].businessBrchno:'')}</Descriptions.Item>
                        <Descriptions.Item label="合作业务">{this.showDict(sysAllDictItems.cooper_business_code,detail.length>0?detail[0].cooperBusinessCode:'')}</Descriptions.Item>
                    </Descriptions>
                    <Table
                        bordered
                        dataSource={detail}
                        rowKey={(record) => {
                            return `${record.resultId}`;
                        }}
                        pagination={false}
                    >
                        <Column title="交易类型" dataIndex="tradeType" key="tradeType"
                            render={(text)=>{
                                return (
                                    <span>{this.showDict(sysAllDictItems.trade_type,text)}</span>
                                )
                            }}
                        />
                        <Column title="我方总笔数" dataIndex="nostroNum" key="nostroNum" />
                        <Column title="对方总笔数" dataIndex="reciprNum" key="reciprNum" />
                        <Column title="差错笔数" dataIndex="errorNum" key="errorNum" />
                        <Column title="差错处理笔数" dataIndex="errorOperateNum" key="errorOperateNum" />
                        <ColumnGroup title="平账">
                            <Column title="笔数" dataIndex="balanceNum" key="balanceNum" />
                            <Column title="金额（元）" dataIndex="balanceMoney" key="balanceMoney" />
                        </ColumnGroup>
                    </Table>
                    <Row gutter={30}>
                        <Col span={12}>
                            <div className="bottom-btn-div" style={{margin:'20px auto'}}>
                                <Button
                                    onClick={() => {
                                        window.close();
                                    }}
                                >关闭</Button>
                            </div>
                        </Col>
                    </Row>
                </Spin>
            </div>
        )
    }
}
const mapState=(state)=>{
    return {
        detail:state.gatherResult.detail,
        sysAllDictItems: state.login.sysAllDictItems,
        loading: state.loading.effects.gatherResult.asyncGetDetail,
    }
}
const mapDispatch=(dispatch)=>{
    return {
        asyncGetDetail:dispatch.gatherResult.asyncGetDetail,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
    }
}
export default connect(mapState, mapDispatch)(Form.create()(Detail));