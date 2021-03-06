/* eslint-disable  */
import React from 'react';
import { connect } from 'react-redux';
import {
    Form,
    Select,
    Modal,
    InputNumber,
    message,
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
            asyncUpAndDown,
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
                        const that=this.props.that;
                        validateFieldsAndScroll((err, values) => {
                            if (err) {
                                return;
                            }
                            this.setState({
                                confirmLoading:true,
                            })
                            asyncUpAndDown({
                                ...values,
                                id:that.state.selectValue[0].id,
                            }).then(result=>{
                                this.setState({
                                    confirmLoading:false,
                                },()=>{
                                    if(result.success){
                                        message.success(result.message);
                                        that.setState({
                                            quotaModal:false,
                                            selectValue:[],
                                            selectKey:[],
                                        });
                                        that.props.asyncGetList({
                                            ...this.props.searchData,
                                        })
                                    }
                                })
                            });
                        });
                    }}
                >
                    <Form>
                        <FormItem label="??????/??????" {...col}>
                            {
                                getFieldDecorator('status', {
                                    initialValue: '',
                                    rules: [
                                        { required: true, message: '???????????????????????????' },
                                    ],
                                })(
                                    <Select>
                                        <Select.Option value={'03'}>??????</Select.Option>
                                        <Select.Option value={'04'}>??????</Select.Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="??????/?????????????????????" {...col}>
                            {
                                getFieldDecorator('amount', {
                                    initialValue: '',
                                    rules: [
                                        { required: true, message: '???????????????/????????????' },
                                    ],
                                })(
                                    <InputNumber style={{width:'50%'}} min={0}/>,
                                )
                            }
                        </FormItem>
                    </Form>
                </Modal>
            </React.Fragment>
        );
    }
}
const mapState = (state=>{
    return {
        searchData: state.spareAccount.searchData,
    }
})
const mapDispatch = (dispatch) => {
    return {
        asyncUpAndDown: dispatch.spareAccount.asyncUpAndDown,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(ModalNew));
