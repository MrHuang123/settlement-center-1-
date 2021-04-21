/* eslint-disable */
import React, { Component } from 'react';
import {
    Form,
    Button,
    Skeleton,
    Typography,
    Input,
    Row,
    Col,
    message,
} from 'antd';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { OneSelect } from 'bnq-sys-react-component';
import { companyType } from '../List/columns';
// import { searchOptionsCommon } from '../optionsCommon';

const { Title } = Typography;
const FormItem = Form.Item;
class Reset extends Component {
    static propTypes = {
        loading: Proptypes.bool,
        getSysAllDictItems: Proptypes.func,
        sysAllDictItems: Proptypes.object,
    }

    static defaultProps = {
        loading: false,
        getSysAllDictItems: () => { },
        sysAllDictItems: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentDidMount() {
        const {
            asyncGetDetail,
        }=this.props;
        asyncGetDetail({
            id:this.props.match.params.id
        });
    }

    componentWillUnmount() {
        const {
            clearData,
        }=this.props;
        clearData();
    }

    showEnum = (arr, code) => {
        if (arr) {
            // eslint-disable-next-line no-restricted-syntax
            for (const v of arr) {
                // eslint-disable-next-line eqeqeq
                if (v.code == code) {
                    return v.description;
                }
            }
        } else {
            return '';
        }
        return '';
    }

    showDict = (arr, code) => {
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

    submit = () =>{
        const {
            detail,
            asyncEdit,
        }=this.props;
        const { validateFieldsAndScroll } = this.props.form;
        validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }
            let obj={
                ...detail,
                ...values,
            }
            asyncEdit(obj).then(data=>{
                if(data.success){
                    message.success(data.message,1,()=>{
                        window.close();
                    });
                }else{
                    message.error(data.message);
                }
            });
        });
    }

    render() {
        const {
            detail,
            form,
            loading,
        } = this.props;
        const {
            getFieldDecorator,
        }=form;
        const col={
            labelCol:{
                span: 3,
            },
            wrapperCol:{
                span: 9,
            }
        };
        return (
            <div>
                <Skeleton loading={loading} active paragraph={{ rows: 8 }}>
                    <Title level={4}>修改</Title>
                    <hr />
                    <Form>
                        <FormItem {...col} label="代付批次号">
                            {
                                getFieldDecorator('batpayNo', {
                                    initialValue: detail.batpayNo || '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '代付批次号不能为空',
                                        },
                                    ],
                                })(
                                    <Input disabled={true}/>
                                )
                            }
                        </FormItem>
                        <FormItem {...col} label="打款上传时间">
                            {
                                getFieldDecorator('batpayUptime', {
                                    initialValue: detail.batpayUptime || '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '打款上传时间不能为空',
                                        },
                                    ],
                                })(
                                    <Input disabled={true}/>
                                )
                            }
                        </FormItem>
                        <FormItem {...col} label="对公/对私">
                            {
                                getFieldDecorator('companyType', {
                                    initialValue: detail.companyType || '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '对公/对私不能为空',
                                        },
                                    ],
                                })(
                                    <OneSelect
                                        selfOptions={companyType}
                                        selfFieldOptions={{
                                            initialValue: '',
                                        }}
                                        selfHasAll={{ value: '', text: '请选择' }}
                                        style={{ width: 240 }}
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem {...col} label="收款账户名称">
                            {
                                getFieldDecorator('receviName', {
                                    initialValue: detail.receviName || '',
                                    rules: [
                                        {
                                            required: this.props.form.getFieldValue('companyType')=='0'?true:false,
                                            message: '收款账户名称不能为空',
                                        },
                                    ],
                                })(
                                    <Input/>
                                )
                            }
                        </FormItem>
                        <FormItem {...col} label="收款账户号">
                            {
                                getFieldDecorator('receCardno', {
                                    initialValue: detail.receCardno || '',
                                    rules: [
                                        {
                                            required: this.props.form.getFieldValue('companyType')=='0'?true:false,
                                            message: '收款账户号不能为空',
                                        },
                                    ],
                                })(
                                    <Input/>
                                )
                            }
                        </FormItem>
                        <FormItem {...col} label="收款开户行名称">
                            {
                                getFieldDecorator('receBankname', {
                                    initialValue: detail.receBankname || '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '收款开户行名称不能为空',
                                        },
                                    ],
                                })(
                                    <Input/>
                                )
                            }
                        </FormItem>
                        <FormItem {...col} label="收款开户行行号">
                            {
                                getFieldDecorator('reveBankno', {
                                    initialValue: detail.reveBankno || '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '收款开户行行号不能为空',
                                        },
                                    ],
                                })(
                                    <Input/>
                                )
                            }
                        </FormItem>
                        <FormItem {...col} label="付款金额">
                            {
                                getFieldDecorator('amout', {
                                    initialValue: detail.amout || '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '付款金额不能为空',
                                        },
                                    ],
                                })(
                                    <Input disabled={true}/>
                                )
                            }
                        </FormItem>
                    </Form>
                    <Row type='flex' justify='center' gutter={[16,0]}>
                        <Col>
                            <Button
                                style={{ margin: '0 auto' }}
                                onClick={() => {
                                    this.submit();
                                }}
                            >提交保存</Button>
                        </Col>
                        <Col>
                            <Button
                                style={{ margin: '0 auto' }}
                                onClick={() => {
                                    window.close();
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
        loading: state.loading.effects.payment.asyncGetDetail,
        sysAllDictItems: state.login.sysAllDictItems,
        detail:state.payment.detail,
    };
};
const mapDispatch = (dispatch) => {
    return {
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
        asyncGetDetail:dispatch.payment.asyncGetDetail,
        clearData:dispatch.payment.clearData,
        asyncEdit:dispatch.payment.asyncEdit,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(Reset));
