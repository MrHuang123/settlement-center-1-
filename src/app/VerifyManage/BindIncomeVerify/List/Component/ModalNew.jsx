/* eslint-disable  */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    Form,
    Button,
    Row,
    Col,
    Modal,
    Upload,
    message,
    Input,
    Skeleton,
} from 'antd';

@withRouter
class ModalNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectIncomeType: '',
            modalType: '',
        }
    }

    componentWillReceiveProps(nextProps) {
        const {
            showModal,
            selectValue,
            asyncGetDetail,
            detail,
            clearDetail,
        } = nextProps;
        if (showModal) {
            // http 获取原来的数据
            if(detail.billCode!==selectValue[0].billCode){
                asyncGetDetail({
                    billCode:selectValue[0].billCode
                });
            }else{
                
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

    handleClick=(examineStatus)=>{
        const {
            asyncCheck,
            form,
            detail,
            asyncGetList,
            toggle,
            clearDetail,
        }=this.props;
        const {
            validateFieldsAndScroll,
        }=form;
        validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }
            asyncCheck({
                billCode: detail.billCode,
                bindMoney: detail.incomeAmount || '0',
                examineDesc: values.examineDesc,
                examineStatus: examineStatus,
            }).then(data => {
                if (data.success) {
                    message.success('审核完毕');
                    asyncGetList({
                        pageNo: 1,
                        pageSize: 10,
                    });
                    // 关闭modal
                    toggle();
                    clearDetail();
                    this.props.clear();
                }else{
                    message.error(data.message);
                }
            });
        });
    }

    render() {
        const {
            form,
            showModal,
            toggle,
            modalType,
            sysAllDictItems,
            detail,
            clearDetail,
            loading,
        } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={showModal}
                onCancel={()=>{
                    toggle();
                    clearDetail();
                }}
                title={modalType === 'check' ? '审核进账单' : '查看进账单'}
                onOk={this.handleClick}
                footer={
                    <React.Fragment>
                        {
                            modalType === 'detail' ? null :
                            <React.Fragment>
                                <Button type='primary' onClick={()=>this.handleClick('3')}>审核通过</Button>
                                <Button type='danger' onClick={()=>this.handleClick('2')}>审核拒绝</Button>
                            </React.Fragment>
                        }
                        <Button onClick={toggle}>取消</Button>
                    </React.Fragment>
                }
            >
                <div className="clearfix">
                    <Skeleton loading={loading}>
                    <Row gutter={[0, 20]}>
                        <Col span={6}>
                            <span>进账单类型:</span>
                        </Col>
                        <Col span={16}>
                            <span>{this.showDict(sysAllDictItems.bill_type,detail.billType)||'无'}</span>
                        </Col>
                        <Col span={6}>
                            <span>进账单编号:</span>
                        </Col>
                        <Col span={16}>
                            <span>{detail.billCode||'无'}</span>
                        </Col>
                        <Col span={6}>
                            <span>账单金额:</span>
                        </Col>
                        <Col span={16}>
                            <span>{detail.incomeAmount||0}</span>
                        </Col>
                        <Col span={6}>
                            <span>付款账号:</span>
                        </Col>
                        <Col span={16}>
                            <span>{detail.paymentAccount||'无'}</span>
                        </Col>
                        <Col span={6}>
                            <span>付款户名:</span>
                        </Col>
                        <Col span={16}>
                            <span>{detail.paymentName||'无'}</span>
                        </Col>
                        <Col span={6}>
                            <span>收款账号:</span>
                        </Col>
                        <Col span={16}>
                            <span>{detail.collectionAccount||'无'}</span>
                        </Col>
                        <Col span={6}>
                            <span>收款户名:</span>
                        </Col>
                        <Col span={16}>
                            <span>{detail.collectionName||'无'}</span>
                        </Col>
                        <Col span={6}>
                            <span>单据影印件:</span>
                        </Col>
                        <Col span={16}>
                            {detail.imageUrl?<Upload
                                style={{ verticalAlign: 'middle' }}
                                listType='picture-card'
                                fileList={[
                                    {
                                        uid: '-1',
                                        name: 'image.png',
                                        status: 'done',
                                        url: detail.imageUrl,
                                    }
                                ]}
                                disabled={true}
                            ></Upload>:'无'}
                        </Col>
                        <Col span={6}>
                            <span>审核说明:</span>
                        </Col>
                        <Col span={16}>
                            {modalType === 'detail' ? <span>{detail.examineDesc}</span> :<Form>
                                <Form.Item>
                                    {
                                        getFieldDecorator('examineDesc', {
                                            initialValue: '',
                                        })(
                                            <Input.TextArea disabled={modalType==='detail'} ></Input.TextArea>
                                        )
                                    }
                                </Form.Item>
                            </Form>}
                        </Col>
                    </Row>
                    </Skeleton>
                </div>
            </Modal>
        )
    }
}
const mapState = (state) => {
    return {
        showModal: state.modal.showModal,
        modalType: state.modal.modalType,
        selectValue: state.modal.selectValue,
        sysAllDictItems: state.login.sysAllDictItems,
        detail:state.incomeVerify.detail,
        loading:state.loading.effects.incomeVerify.asyncGetDetail,
    }
}
const mapDisptach = (dispatch) => {
    return {
        toggle: dispatch.modal.toggle,
        setModalType: dispatch.modal.setModalType,
        asyncGetDetail: dispatch.incomeVerify.asyncGetDetail,
        asyncSetDetail:dispatch.incomeVerify.asyncSetDetail,
        asyncCheck:dispatch.incomeVerify.asyncCheck,
        clearDetail:dispatch.incomeVerify.clearDetail,
        asyncGetList: dispatch.incomeVerify.asyncGetList,
    }
}
export default connect(mapState, mapDisptach)(Form.create()(ModalNew));