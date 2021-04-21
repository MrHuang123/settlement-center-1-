import React from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import {
    Form,
    Spin,
    Descriptions,
    Table,
    Button,
} from 'antd';
import { Tools } from '../../../../util';
import { columnsOptions } from './columns';

class Detail extends React.Component {
    static propTypes = {
        getDetail: Proptypes.func,
        detail: Proptypes.object,
        loading: Proptypes.bool,
    }

    static defaultProps = {
        getDetail: () => { },
        detail: {},
        loading: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            // eslint-disable-next-line react/prop-types
            id: this.props.match.params.id,
        };
    }

    componentDidMount() {
        const { getDetail } = this.props;
        getDetail({
            id: this.state.id,
        });
    }

    handleExport = () => {

    };

    handleClick() {

    }

    render() {
        const {
            detail,
            loading,
        } = this.props;
        let width = 0;
        columnsOptions.forEach((item) => {
            if (item.width) {
                width += item.width;
            } else {
                width += 120;
            }
        });
        return (
            <div>
                <Spin spinning={loading}>
                    <div className="divBorder" style={{ padding: '8px' }}>
                        <Descriptions>
                            <Descriptions.Item label="记账流水号">{detail.sequenceNum}</Descriptions.Item>
                            <Descriptions.Item label="业务订单号">{detail.orderNum}</Descriptions.Item>
                            <Descriptions.Item label="业务订单类型">{detail.orderTypeName}</Descriptions.Item>
                            <Descriptions.Item label="记账日期">{detail.recordDay}</Descriptions.Item>
                            <Descriptions.Item label="记账时间">{detail.recordHMS}</Descriptions.Item>
                            <Descriptions.Item label="订单金额">{detail.entryMoney}</Descriptions.Item>
                            <Descriptions.Item label="系统日期">{detail.systemDay}</Descriptions.Item>
                            <Descriptions.Item label="系统时间">{detail.systemHMS}</Descriptions.Item>
                            <Descriptions.Item label="账务所属机构">{detail.orgCode}</Descriptions.Item>
                            <Descriptions.Item label="账务类型">{detail.billType}</Descriptions.Item>
                            <Descriptions.Item label="交易类型">{detail.tradeType}</Descriptions.Item>
                            <Descriptions.Item label="业务名称">{detail.businessCode}</Descriptions.Item>
                            <Descriptions.Item label="特征码">{detail.featureCode}</Descriptions.Item>
                            <Descriptions.Item label="资金种类">{detail.moneyType}</Descriptions.Item>
                            <Descriptions.Item label="币种">{detail.currencyType}</Descriptions.Item>
                            <Descriptions.Item label="渠道订单号">{detail.channelOrderNum}</Descriptions.Item>
                            <Descriptions.Item label="业务流水号">{detail.businessSerialNumber}</Descriptions.Item>
                        </Descriptions>
                    </div>
                    <div className="divBorder"><Table
                        columns={Tools.genTableOptions(columnsOptions)}
                        dataSource={[{
                            entryNum: detail.entryNum,
                            accountNum: detail.accountNum,
                            accountName: detail.accountName,
                            accountTypeName: detail.accountTypeName,
                            dcFlagName: detail.dcFlagName,
                            entryMoney: detail.entryMoney,
                            description: detail.description,
                        }]}
                        scroll={{ x: width }}
                        pagination={false}
                    />
                    </div>
                    <div className="divBorder">
                        <Descriptions>
                            <Descriptions.Item label="SAP凭证推送">{detail.sapCertStatusName}</Descriptions.Item>
                            <Descriptions.Item label="凭证编号">{detail.sapCertNum}</Descriptions.Item>
                            <Descriptions.Item label="凭证日期">{detail.sapCertTime}</Descriptions.Item>
                            <Descriptions.Item label="凭证类型">{detail.voucherType}</Descriptions.Item>
                            <Descriptions.Item label="会计年度">{detail.accountYear}</Descriptions.Item>
                            <Descriptions.Item label="期间">{detail.accountMonth}</Descriptions.Item>
                            <Descriptions.Item label="公司代码">{detail.comCode}</Descriptions.Item>
                            <Descriptions.Item label="参考凭证">{detail.refVoucher}</Descriptions.Item>
                            <Descriptions.Item label="凭证抬头摘要">{detail.voucherTitle}</Descriptions.Item>
                            <Descriptions.Item label="计算税收项">{detail.calcTax}</Descriptions.Item>
                            <Descriptions.Item label="税">{detail.tax}</Descriptions.Item>
                            <Descriptions.Item label="PK">{detail.pk}</Descriptions.Item>
                            <Descriptions.Item label="RCd">{detail.rcd}</Descriptions.Item>
                            <Descriptions.Item label="科目号">{detail.subjectNo}</Descriptions.Item>
                            <Descriptions.Item label="科目名称">{detail.subjectName}</Descriptions.Item>
                            <Descriptions.Item label="分配">{detail.distribution}</Descriptions.Item>
                            <Descriptions.Item label="利润中心">{detail.profitCenter}</Descriptions.Item>
                            <Descriptions.Item label="成本中心">{detail.costCenter}</Descriptions.Item>
                            <Descriptions.Item label="文本">{detail.text}</Descriptions.Item>
                        </Descriptions>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            style={{ margin: '0 auto' }}
                            onClick={() => {
                                window.history.back();
                            }}
                        >返回</Button>
                    </div>
                </Spin>

            </div>
        );
    }
}
const mapState = (state) => {
    return {
        detail: state.flowList.detail,
        loading: state.loading.effects.flowList.asyncGetDetail,
    };
};
const mapDispatch = (dispatch) => {
    return {
        getDetail: dispatch.flowList.asyncGetDetail,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(Detail));
