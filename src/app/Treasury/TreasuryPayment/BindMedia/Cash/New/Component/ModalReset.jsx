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
    Icon,
} from 'antd';
import { OneSelect } from 'bnq-sys-react-component';
import { searchOptionsCommon } from '../commonOptions';

@withRouter
class ModalNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            typeIncome: searchOptionsCommon('billType')[0].id,
            id: this.props.match.params.id,
            // 用来查看的detail
            detail: {},
            // 用来传入组件，并修改的数据
            initDetail: {},
            confirmLoading: false,
        };
    }

    render() {
        const formProps = {
            labelAlign: 'left',
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 12,
            },
        }
        const {
            form,
            asyncGetDetailList,
            asyncEdit,
            accountList,
            data,
            setData,
        } = this.props;
        const { getFieldDecorator } = form;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传</div>
            </div>
        );
        const uploadProps = {
            name: 'file',
            accept: '.jpeg, .png, .jpg',
            action: '/accm-web/ACCMCommon/upload',
            onChange: (info) => {
                setData({
                    ...data,
                    imageUrl: [...info.fileList],
                });
            },
            beforeUpload: (file, fileList) => {
                const isLtM = file.size / 1024 < 500;
                const isLtL = file.name.length < 50;
                if (!isLtM) {
                    message.error('图片大小限制为500KB以下');
                    fileList.pop();
                    return false;
                }
                if (!isLtL) {
                    message.error('名称长度限制为50');
                    return false;
                }
                file.isLtM = isLtM;
                file.isLtL = isLtL;
                return isLtM && isLtL;
            },
        };
        return (
            <div>
                <Modal
                    {...this.props.domProps}
                    title={data.imageUrl ? '修改进账单' : '添加进账单'}
                    confirmLoading={this.state.confirmLoading}
                    onOk={() => {
                        this.setState({
                            confirmLoading: true,
                        });
                        
                        const { validateFieldsAndScroll } = this.props.form;
                        validateFieldsAndScroll((err, values) => {
                            if (err) {
                                this.setState({
                                    confirmLoading: false,
                                })
                                return;
                            }
                            
                            let result = {
                                ...values,
                                imageUrl: data.imageUrl[0].url?data.imageUrl[0].url:data.imageUrl[0].response.message,
                            };
                            if(result.imageUrl){
                                asyncEdit({
                                    ...result,
                                    id: data.id,
                                }).then(data => {
                                    if (data.success) {
                                        message.success(data.message);
                                        this.setState({
                                            confirmLoading: false,
                                        });
                                        this.props.that.setState({
                                            showModalReset: false,
                                            selectValue: [],
                                            selectkey: [],
                                        });
                                        asyncGetDetailList({
                                            receiptId: this.props.match.params.id,
                                        });
                                    } else {
                                        message.error(data.message);
                                    };
                                });
                            }else{
                                message.error('请上传影印件');
                            }
                            
                        });
                    }}
                >
                    <React.Fragment>
                        <Form {...formProps}>
                            {/* <Form.Item label='选择进账单类型'>
                                {
                                    getFieldDecorator('billType', {
                                        initialValue: '',
                                        rules: [
                                            { required: true, message: '进账单类型不能为空' },
                                        ],
                                    })(
                                        <OneSelect
                                            selfOptions={searchOptionsCommon('billType')}
                                            style={{ width: '100%' }}
                                        />,
                                    )
                                }
                            </Form.Item> */}
                            <Form.Item label='进账单编号'>
                                {
                                    getFieldDecorator('depositCode', {
                                        initialValue: data.depositCode ? data.depositCode : '',
                                        rules: [
                                            { required: true, message: '进账单编号不能为空', },
                                        ],
                                    })(
                                        <Input maxLength={30} />,
                                    )
                                }
                            </Form.Item>
                            <Form.Item label='进账金额'>
                                {
                                    getFieldDecorator('depositAmount', {
                                        initialValue: data.depositAmount ? data.depositAmount : '',
                                        rules: [
                                            { required: true, message: '进账金额不能为空' },
                                            {
                                                message: '请输入正确的进账金额',
                                                pattern: /^[0-9]+(.[0-9]{1,2})?$/,
                                            },
                                        ],
                                    })(
                                        <Input maxLength={30} />,
                                    )
                                }
                            </Form.Item>
                            <Form.Item label='收款账户号'>
                                {
                                    getFieldDecorator('accountNo', {
                                        initialValue: data.accountNo ? data.accountNo : '',
                                        rules: [
                                            { required: true, message: '收款账户号不能为空' },
                                        ],
                                    })(
                                        <OneSelect
                                            style={{ width: '100%' }}
                                            selfOptions={accountList.map(item => {
                                                return {
                                                    id: item.id,
                                                    name: `${item.accountNo}/${item.accountBank}`,
                                                }
                                            })}
                                            onChange={e => {
                                                let accountName = '';
                                                accountList.forEach(item => {
                                                    if (item.id === e) {
                                                        accountName = item.accountName;
                                                    }
                                                });
                                                form.setFieldsValue({
                                                    accountName,
                                                })
                                            }}
                                        />
                                    )
                                }
                            </Form.Item>
                            <Form.Item label='收款户名'>
                                {
                                    getFieldDecorator('accountName', {
                                        initialValue: data.accountName ? data.accountName : '',
                                        rules: [
                                            { required: true, message: '收款户名不能为空' },
                                            {
                                                max: 50,
                                                message: '超过最大长度限度',
                                            },
                                        ],
                                    })(
                                        <Input maxLength={50} disabled />,
                                    )
                                }
                            </Form.Item>
                            <Form.Item label='上传影印件'>
                                {
                                    getFieldDecorator('imageUrl', {
                                        initialValue: [],
                                    })(
                                        <Upload
                                            {...uploadProps}
                                            listType='picture-card'
                                            fileList={data.imageUrl}
                                        >
                                            {data.imageUrl.length > 0 ? null : uploadButton}
                                        </Upload>,
                                    )
                                }
                            </Form.Item>
                        </Form>
                    </React.Fragment>
                </Modal>
            </div>
        )
    }
}
const mapState = (state) => {
    return {
        sysAllDictItems: state.login.sysAllDictItems,
        accountList: state.BindIncomeVerifyNew.accountList,
        data: state.BindIncomeVerifyNew.data,
    }
}
const mapDisptach = (dispatch) => {
    return {
        asyncEdit: dispatch.BindIncomeVerifyNew.asyncEdit,
        asyncGetDetailList: dispatch.bindMediaCashList.asyncGetDetailList,
        setData: dispatch.BindIncomeVerifyNew.setData,
    }
}
export default connect(mapState, mapDisptach)(Form.create()(ModalNew));