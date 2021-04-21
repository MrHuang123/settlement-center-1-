/* eslint-disable  */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    Form,
    Descriptions,
    Typography,
    Button,
    Row,
    Col,
    Table,
    message,
    Skeleton,
} from 'antd';
import { columnsOptions } from './columns';
import ModalNew from '../New/Component/ModalNew';
import { Tools } from '../../../../util/index';
import './index.less';

@withRouter
class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.match.params.type,
            selectValue: [],
            showModal:false,
            id:this.props.match.params.id,
        }
    }

    componentDidMount(){
        const {
            asyncGetList,
            getSysAllDictItems,
        }=this.props;
        getSysAllDictItems();
        asyncGetList({
            checkBatchNo:this.state.id,
        });
    }

    handleChange = (key, value) => {
        this.setState({
            selectValue: value,
        });
    }

    handleModal = () => {
        const { selectValue }=this.state;
        const {
            toggle,
            setModalType,
        }=this.props;
        if(selectValue.length<1){
            message.error('请选择需要查看的进账单');
            return;
        }
        toggle();
        setModalType('detail',selectValue);
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
            initData,
            sysAllDictItems,
            detail,
            loading,
        } = this.props;
        const columns = Tools.genTableOptions(columnsOptions(sysAllDictItems));
        let width = 0;
        let total=0;
        columns.forEach((item) => {
            if (item.width) {
                width += item.width;
            } else {
                width += 120;
            }
        });
        initData.forEach((element,index)=>{
            total+=element.incomeAmount
        });
        
        return (
            <div>
                <ModalNew />
                <Skeleton loading={loading}>
                    <Typography.Title level={4}>查看进账单详情</Typography.Title>
                    <Descriptions>
                        <Descriptions.Item label="对账批次号">{detail.checkBatchNo}</Descriptions.Item>
                        <Descriptions.Item label="销售日期">{detail.checkDate}</Descriptions.Item>
                        <Descriptions.Item label="合作机构">{this.showDict(sysAllDictItems.business_brchno,detail.businessBrchno)}</Descriptions.Item>

                        <Descriptions.Item label="应结算金额">{detail.settleMoney}</Descriptions.Item>
                        <Descriptions.Item label="账务所属机构">{this.showDict(sysAllDictItems.org_no,detail.accountBrchno)}</Descriptions.Item>
                        <Descriptions.Item label="合作业务">{this.showDict(sysAllDictItems.cooper_business_code,detail.cooperBusinessCode)}</Descriptions.Item>
                    </Descriptions>
                    <div className="count" style={{ marginTop: '20px' }}>
                        <div>
                            <Button
                                style={{ margin: '0 auto' }}
                                onClick={this.handleModal}
                            >查看</Button>
                        </div>
                        <div>
                            <span>已绑定进账单金额：<span style={{color:'red'}}>{total}</span> 元</span>
                        </div>
                    </div>
                    <Table
                        dataSource={initData}
                        rowKey={(record) => {
                            return `${record.id}`;
                        }}
                        columns={columns}
                        width={width}
                        pagination={false}
                        scroll={{x:width}}
                        rowSelection={{ type: 'radio', onChange: this.handleChange }}
                    >
                    </Table>
                    <Row gutter={30}>
                        <Col span={12}>
                            <div className="bottom-btn-div" style={{ marginTop: '20px' }}>
                                <Button
                                    style={{ margin: '0 auto' }}
                                    onClick={() => {
                                        window.history.back();
                                    }}
                                >返回</Button>
                            </div>
                        </Col>
                    </Row>
                </Skeleton>
            </div>
        )
    }
}
const mapState=(state)=>{
    return {
        initData:state.bindIncomeNew.initData,
        detail:state.bindIncomeNew.detail,
        sysAllDictItems: state.login.sysAllDictItems,
        loading:state.loading.effects.bindIncomeNew.asyncGetList,
    }
}
const mapDispatch=(dispatch)=>{
    return{
        toggle:dispatch.modal.toggle,
        asyncGetList:dispatch.bindIncomeNew.asyncGetList,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
        setModalType:dispatch.modal.setModalType,
    }
}
export default connect(mapState, mapDispatch)(Form.create()(Detail));