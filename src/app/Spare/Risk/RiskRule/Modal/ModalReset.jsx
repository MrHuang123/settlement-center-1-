/* eslint-disable  */
import React from 'react';
import { connect } from 'react-redux';
import {
    Form,
    Select,
    Modal,
    InputNumber,
    message,
    Spin,
} from 'antd';

const FormItem = Form.Item;
class ModalNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmLoading:false,
        };
    }

    render() {
        const {
            form,
            accountList,
            that,
            asyncAddOrReset,
        } = this.props;
        const { getFieldDecorator }=form;
        const col={
            labelCol:{
                span:5,
            },
            wrapperCol:{
                span:18
            }
        }
        
        return (
            <React.Fragment>
                <Modal
                    {...this.props.domProps}
                    confirmLoading={this.state.confirmLoading}
                    onOk={()=>{
                        const { validateFieldsAndScroll } = form;
                        validateFieldsAndScroll((err, values) => {
                            if (err) {
                                return;
                            }
                            this.setState({
                                confirmLoading:true,
                            })
                            asyncAddOrReset({
                                ...that.state.selectValue[0],
                                ...values,
                            }).then(result=>{
                                this.setState({
                                    confirmLoading:false,
                                },()=>{
                                    if(result.success){
                                        message.success(result.message);
                                        that.setState({
                                            resetModal:false,
                                            selectValue: [],
                                            selectKey: [],
                                        });
                                        that.props.asyncGetList({
                                            ...this.props.searchData,
                                        });
                                    }
                                })
                            });
                        });
                    }}
                >
                    <Spin spinning={this.props.loading}>
                        <Form>
                            <FormItem label="?????????????????????" {...col}>
                                {
                                    getFieldDecorator('virtAccount', {
                                        initialValue: accountList.length?accountList[0].pettyCashAccount:'',
                                        rules: [
                                            { required: true, message: '???????????????????????????' },
                                        ],
                                    })(
                                        <Select>
                                            {
                                                accountList.map((item)=>{
                                                    return <Select.Option value={item.pettyCashAccount} key={item.pettyCashAccount}>{`${item.pettyCashAccount}--${item.pettyCashAccountname}`}</Select.Option>
                                                })
                                            }
                                        </Select>
                                    )
                                }
                            </FormItem>
                            <FormItem label="?????????????????????" {...col}>
                                {
                                    getFieldDecorator('amountLimit', {
                                        initialValue: that.state.selectValue.length?that.state.selectValue[0].amountLimit:'',
                                        rules: [
                                            { required: true, message: '????????????????????????' },
                                            { pattern:/^\d+$/, message: '?????????????????????'}
                                        ],
                                    })(
                                        <InputNumber style={{width:'80%'}} maxLength={20} min={0}/>,
                                    )
                                }
                            </FormItem>
                            <FormItem label="??????????????????" {...col}>
                                {
                                    getFieldDecorator('numLimit', {
                                        initialValue: that.state.selectValue.length?that.state.selectValue[0].numLimit:'',
                                        rules: [
                                            { required: true, message: '??????????????????????????????' },
                                            { pattern:/^\d+$/, message: '?????????????????????'}
                                        ],
                                    })(
                                        <InputNumber style={{width:'80%'}} maxLength={20} min={0}/>,
                                    )
                                }
                            </FormItem>
                        </Form>
                    </Spin>
                </Modal>
            </React.Fragment>
        );
    }
}
const mapState = (state=>{
    return {
        searchData: state.spareAccount.searchData,
        accountList: state.spareAccount.initData,
        loading: state.loading.effects.spareAccount.asyncGetList,
    }
})
const mapDispatch = (dispatch) => {
    return {
        asyncAddOrReset: dispatch.riskRule.asyncAddOrReset,
        asyncGetAccountList: dispatch.riskRule.asyncGetAccountList,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(ModalNew));
