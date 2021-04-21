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
    Input,
} from 'antd';
import { Tools} from '../../../../../util/index';

const { Title } = Typography;
class Detail extends React.Component {
    static propTypes = {
        asyncGetDetail: Proptypes.func,
        detail: Proptypes.object,
    }

    static defaultProps = {
        asyncGetDetail: () => { },
        detail: {},
    }

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
        };
    }

    componentDidMount() {
        const {
            asyncGetDetail,
            getClassList,
        } = this.props;
        getClassList();
        asyncGetDetail({
            id: this.state.id,
        });
    }

    render() {
        const {
            detail,
            detailList,
            form,
            loading,
            classAllList,
        } = this.props;
        const columnsList =[
            {
                name:'序号',
                dataindex:'index',
                render:(text)=>{
                    return (
                        <span>{text+1}</span>
                    )
                }
            },{
                name:'付款日期',
                dataindex: 'payDate',
            },{
                name:'交易日期',
                dataindex: 'tradeTime',
            },{
                name:'付款类型',
                dataindex: 'tradeType',
                render:(text,record)=>{
                    let result='';
                    classAllList.forEach(element => {
                        if((element.classNo===text)&&(element.classLevel==='02')){
                            result=element.className;
                        }
                    });
                    return (<span>{record.tradeType+'-'+result}</span>)
                }
            },{
                name:'付款机构名称',
                dataindex: 'payOrgName',
            },{
                name:'申请总金额',
                dataindex: 'amount',
            },
        ];
        const columns = Tools.genTableOptions(columnsList);
        let width = 0;
        let num=0;
        let total=0;
        columns.forEach((item) => {
            if (item.width) {
                width += item.width;
            } else {
                width += 120;
            }
        });
        detailList.forEach((item) => {
            total+=item.amount;
            num+=1;
        });
        return (
            <div>
                <Skeleton loading={false}>
                    <Title level={4}>付款审核详情</Title>
                    <hr />
                    <Table
                        form={form}
                        columns={columns}
                        scroll={{x:width}}
                        align='center'
                        rowClassName={()=>{return 'tableStyle'}}
                        dataSource={detailList}
                        loading={loading}
                        rowKey={(r)=>{
                            return `${r.index}`
                        }}
                        pagination={false}
                    >
                    </Table>
                    <Row gutter={[16, 8]} style={{marginTop:'20px'}}>
                        <Col span={2}>
                            <p>审核状态:</p>
                        </Col>
                        <Col span={3}>
                            <p>{detail.auditState}</p>
                        </Col>
                        <Col span={2}>
                            <p>审核总笔数:</p>
                        </Col>
                        <Col span={1}>
                            <p>{num}</p>
                        </Col>
                        <Col span={2}>
                            <p>审核总金额:</p>
                        </Col>
                        <Col span={1}>
                            <p>{total}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2}>
                            <p>审核备注:</p>
                        </Col>
                        <Col span={6}>
                            <Input.TextArea value={detail.auditRemark} disabled rows={4} />
                        </Col>
                    </Row>
                    <Row gutter={[0,40]}>
                        <Col offset={2}>
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
        detail: state.payVerify.detail,
        detailList:state.payVerify.detailList,
        loading:state.loading.effects.payVerify.asyncGetDetail,
        classAllList: state.accountManageRule.classList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetDetail: dispatch.payVerify.asyncGetDetail,
        getClassList: dispatch.accountManageRule.asyncGetClassList,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(Detail));
