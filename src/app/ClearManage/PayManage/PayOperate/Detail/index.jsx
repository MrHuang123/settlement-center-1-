/* eslint-disable */
import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Form,
    Skeleton,
    Table,
    Button,
    Typography,
    Row,
    Col,
} from 'antd';
import { Tools} from '../../../../../util/index';

const { Title } = Typography;
class Detail extends React.Component {
    static propTypes = {
        asyncGetDetail: Proptypes.func,
        detail: Proptypes.array,
    }

    static defaultProps = {
        asyncGetDetail: () => { },
        detail: [],
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
        } = this.props;
        getSysAllDictItems();
        asyncGetDetail({
            orderId: this.state.id,
        });
    }

    render() {
        const {
            detail,
            loading,
            sysAllDictItems,
        } = this.props;
        const columnsList =[
            {
                name:'序号',
                dataindex: 'index',
            },{
                name:'付款日期',
                dataindex: 'payDate',
                width: 180,
            },{
                name:'交易日期',
                dataindex: 'tradeTime',
                width: 180,
            },{
                name:'付款类型',
                dataindex: 'tradeTypeName',
                width: 240,
                render:(text,record)=>{
                    return (<span>{record.tradeType+'-'+record.tradeTypeName}</span>);
                },
            },{
                name:'付款机构名称',
                dataindex: 'orgName',
                width:180,
            },{
                name:'申请总金额',
                dataindex: 'amount',
            },{
                name:'商户/客户名称',
                dataindex:'customerName',
                width:240,
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
                <Skeleton loading={loading}>
                    <Title level={4}>查看付款明细</Title>
                    <hr />
                    <Table
                        columns={columns}
                        scroll={{x:width}}
                        align='center'
                        rowClassName={()=>{return 'tableStyle'}}
                        dataSource={detail.map((item,index)=>{
                            return {
                                ...item,
                                index:index+1,
                            }
                        })}
                        rowKey={(record) => {
                            return `${record.id}`;
                        }}
                        pagination={false}
                    >
                    </Table>
                    <Row gutter={[16, 8]} style={{marginTop:'20px'}}>
                        <Col>
                            <p>明细总数：<span>{detail.length}</span></p>
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
        detail: state.payOperate.detail,
        sysAllDictItems: state.login.sysAllDictItems,
        loading:state.loading.effects.payOperate.asyncGetDetail,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetDetail: dispatch.payOperate.asyncGetDetail,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(Detail));
