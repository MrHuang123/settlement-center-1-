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
                    <Title level={4}>??????</Title>
                    <hr />
                    <Form>
                        <FormItem {...col} label="???????????????">
                            {
                                getFieldDecorator('batpayNo', {
                                    initialValue: detail.batpayNo || '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '???????????????????????????',
                                        },
                                    ],
                                })(
                                    <Input disabled={true}/>
                                )
                            }
                        </FormItem>
                        <FormItem {...col} label="??????????????????">
                            {
                                getFieldDecorator('batpayUptime', {
                                    initialValue: detail.batpayUptime || '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '??????????????????????????????',
                                        },
                                    ],
                                })(
                                    <Input disabled={true}/>
                                )
                            }
                        </FormItem>
                        <FormItem {...col} label="??????/??????">
                            {
                                getFieldDecorator('companyType', {
                                    initialValue: detail.companyType || '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '??????/??????????????????',
                                        },
                                    ],
                                })(
                                    <OneSelect
                                        selfOptions={companyType}
                                        selfFieldOptions={{
                                            initialValue: '',
                                        }}
                                        selfHasAll={{ value: '', text: '?????????' }}
                                        style={{ width: 240 }}
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem {...col} label="??????????????????">
                            {
                                getFieldDecorator('receviName', {
                                    initialValue: detail.receviName || '',
                                    rules: [
                                        {
                                            required: this.props.form.getFieldValue('companyType')=='0'?true:false,
                                            message: '??????????????????????????????',
                                        },
                                    ],
                                })(
                                    <Input/>
                                )
                            }
                        </FormItem>
                        <FormItem {...col} label="???????????????">
                            {
                                getFieldDecorator('receCardno', {
                                    initialValue: detail.receCardno || '',
                                    rules: [
                                        {
                                            required: this.props.form.getFieldValue('companyType')=='0'?true:false,
                                            message: '???????????????????????????',
                                        },
                                    ],
                                })(
                                    <Input/>
                                )
                            }
                        </FormItem>
                        <FormItem {...col} label="?????????????????????">
                            {
                                getFieldDecorator('receBankname', {
                                    initialValue: detail.receBankname || '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '?????????????????????????????????',
                                        },
                                    ],
                                })(
                                    <Input/>
                                )
                            }
                        </FormItem>
                        <FormItem {...col} label="?????????????????????">
                            {
                                getFieldDecorator('reveBankno', {
                                    initialValue: detail.reveBankno || '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '?????????????????????????????????',
                                        },
                                    ],
                                })(
                                    <Input/>
                                )
                            }
                        </FormItem>
                        <FormItem {...col} label="????????????">
                            {
                                getFieldDecorator('amout', {
                                    initialValue: detail.amout || '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '????????????????????????',
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
                            >????????????</Button>
                        </Col>
                        <Col>
                            <Button
                                style={{ margin: '0 auto' }}
                                onClick={() => {
                                    window.close();
                                }}
                            >??????</Button>
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
