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
    Modal,
    message,
} from 'antd';
import { columnsOptions } from './columns';
import { Tools } from '../../../../util/index';
import './index.less';
import ModalNew from './Component/ModalNew';

@withRouter
class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.match.params.type,
            id: this.props.match.params.id,
            selectValue: [],
            showModal:false,
            modalType:'',
        }
    }

    componentDidMount(){
        const {
            id,
        }=this.state;
        const {
            asyncGetBankInfo,
            asyncGetList,
            getSysAllDictItems,
        }=this.props;
        getSysAllDictItems();
        asyncGetList({
            checkBatchNo:id,
        })
        asyncGetBankInfo({
            checkBatchNo:id,
        });
    }

    componentWillUnmount(){
        const {
            clearData,
        }=this.props;
        clearData();
    }

    handleChange = (key, value) => {
        this.setState({
            selectValue: value,
        });
    }

    handleModal = (type) => {
        const { selectValue } = this.state;
        const {
            toggle,
            setModalType,
            asyncDelIncome,
            asyncGetList,
        }=this.props;
        if(type==='new'){
            toggle();
            setModalType('new',selectValue);
        }else if(type==='del'){
            // 删除
            Modal.confirm({
                title:'删除进账单',
                content: `您正在删除进账单，请确认。`,
                onOk:()=>{
                    asyncDelIncome({
                        billCode:selectValue[0].billCode,
                    }).then(data=>{
                        if(data.success){
                            asyncGetList({
                                checkBatchNo:this.state.id,
                            });
                        }else{
                            message.error(data.message);
                        }
                    });
                }
            })
        } else{
            // 必须有选择
            if (selectValue.length < 1) {
                message.error('请选择需要查看的进账单');
                return;
            }else{
                toggle();
                setModalType(type,selectValue);
            }
        }
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
        const { type } = this.state;
        const {
            initData,
            detail,
            loading,
            sysAllDictItems,
        } = this.props;
        const columns = Tools.genTableOptions(columnsOptions(sysAllDictItems));
        let width = 0;
        columns.forEach((item) => {
            if (item.width) {
                width += item.width;
            } else {
                width += 120;
            }
        });
        const btnStyle = {
            marginRight: '20px'
        }
        let total=0;
        initData.forEach((element)=>{
            total+=element.incomeAmount;
        })
        return (
            <div>
                <ModalNew />
                <Typography.Title level={4}>绑定进账单</Typography.Title>
                <Descriptions>
                    <Descriptions.Item label="交易日期">{detail.checkDate}</Descriptions.Item>
                    <Descriptions.Item label="合作机构">{this.showDict(sysAllDictItems.business_brchno,detail.businessBrchno)}</Descriptions.Item>

                    <Descriptions.Item label="合作业务">{this.showDict(sysAllDictItems.cooper_business_code,detail.cooperBusinessCode)}</Descriptions.Item>
                    <Descriptions.Item label="应结算金额">{detail.settleMoney}</Descriptions.Item>
                </Descriptions>
                <div className="count" style={{ marginTop: '20px' }}>
                    <div>
                        <Button
                            style={btnStyle}
                            onClick={()=>{this.handleModal('new')}}
                        >添加进账单</Button>
                        <Button
                            style={btnStyle}
                            onClick={()=>{this.handleModal('del')}}
                        >删除进账单</Button>
                        <Button
                            style={btnStyle}
                            onClick={()=>{this.handleModal('detail')}}
                        >查看</Button>
                    </div>
                    <div>
                        <span>已绑定进账单金额：<span style={{ color: 'red' }}>{total}</span> 元</span>
                    </div>
                </div>
                <Table
                    dataSource={initData}
                    rowKey={(record) => {
                        return `${record.id}`;
                    }}
                    rowSelection={{ type: 'radio', onChange: this.handleChange }}
                    columns={columns}
                    // width={width}
                    scroll={{ x: width }}
                    loading={loading}
                    pagination={false}
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
            </div>
        )
    }
}
const mapState=(state)=>{
    return {
        initData:state.bindIncomeNew.initData,
        detail:state.bindIncomeNew.detail,
        sysAllDictItems: state.login.sysAllDictItems,
        loading:state.loading.effects.bindIncomeNew.asyncGetList || state.loading.effects.bindIncomeNew.asyncGetBankInfo,
    }
}
const mapDispatch=(dispatch)=>{
    return {
        toggle:dispatch.modal.toggle,
        setModalType:dispatch.modal.setModalType,
        asyncGetBankInfo:dispatch.bindIncomeNew.asyncGetBankInfo,
        asyncGetList:dispatch.bindIncomeNew.asyncGetList,
        asyncDelIncome:dispatch.bindIncomeNew.asyncDelIncome,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
        clearData:dispatch.bindIncomeNew.clearData,
    }
}
export default connect(mapState, mapDispatch)(Form.create()(Detail));