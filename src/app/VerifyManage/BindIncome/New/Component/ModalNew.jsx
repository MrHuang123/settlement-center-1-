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
    Checkbox,
    Icon,
} from 'antd';
import { OneSelect } from 'bnq-sys-react-component';
import { searchOptionsCommon } from '../commonOptions';

@withRouter
class ModalNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectIncomeType: false,
            typeIncome: searchOptionsCommon('billType')[0].id,
            id: this.props.match.params.id,
            // 用来查看的detail
            detail: {},
            // 用来传入组件，并修改的数据
            initDetail: {},
            fileList: [],
            selectedCollectionName: '',
        };
    }

    componentWillReceiveProps(nextProps) {
        const { showModal, modalType, selectValue } = nextProps;
        if (showModal) {
            if (modalType === 'new') {

            } else if (modalType === 'detail') {
                // http 获取原来的数据
                // 查看详情，直接从redux中取出来
                this.setState({
                    detail: selectValue[0],
                });
            }
        }
    }

    handCheckBoxChange = (e) => {
        this.setState({
            selectIncomeType: e.target.checked,
        })
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

    handleClick = () => {
        const { validateFieldsAndScroll } = this.props.form;
        const {
            selectIncomeType
        } = this.state;
        const {
            asyncNewIncome,
            photoList,
            paymentInfo,
            collectionInfo,
            toggle,
            asyncGetList,
        } = this.props;
        validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }
            if (selectIncomeType) {
                // 新增付款账号,删除选择历史
                let obj = values;
                collectionInfo.forEach((element, index) => {
                    if (index === values.historyCollection) {
                        obj.collectionAccount = element.account;
                        // obj.paymentOrg=element.org;
                        obj.collectionName = element.text;
                    }
                });
                obj.imageUrl = photoList[0].response.message;
                obj.checkBatchNo = this.state.id;
                delete obj.historyCollection;
                asyncNewIncome(obj).then((data) => {
                    if (data.success) {
                        message.success('添加成功');
                        asyncGetList({
                            checkBatchNo: this.state.id,
                        })
                        toggle();
                    } else {
                        message.error(data.message);
                    }
                });
            } else {
                let obj = values;
                // 付款信息
                paymentInfo.forEach((element, index) => {
                    if (index === values.historyPayment) {
                        obj.paymentAccount = element.account;
                        obj.paymentOrg = element.org;
                        obj.paymentName = element.text;
                    }
                });
                // 收款信息
                collectionInfo.forEach((element, index) => {
                    if (index === values.historyCollection) {
                        obj.collectionAccount = element.account;
                        // obj.paymentOrg=element.org;
                        obj.collectionName = element.text;
                    }
                });
                // 图片
                obj.imageUrl = photoList[0].response.message;
                obj.checkBatchNo = this.state.id;
                delete obj.historyCollection;
                delete obj.historyPayment;
                asyncNewIncome(obj).then((data) => {
                    if (data.success) {
                        message.success('添加成功');
                        asyncGetList({
                            checkBatchNo: this.state.id,
                        })
                        toggle();
                    } else {
                        message.error(data.message);
                    }
                });
            }
        });
    }

    render() {
        const formProps = {
            labelAlign: 'left',
            labelCol: {
                span: 5,
            },
            wrapperCol: {
                span: 12,
            },
        }
        const {
            form,
            showModal,
            toggle,
            modalType,
            paymentInfo,
            collectionInfo,
            photoList,
            sysAllDictItems,
            setPhotolist,
        } = this.props;
        const { getFieldDecorator } = form;
        const { selectIncomeType, typeIncome, detail, initDetail, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传</div>
            </div>
        );
        const whichTitle = (type) => {
            if (type === 'new') {
                return '绑定进账单';
            } else if (type === 'detail') {
                return '进账单详情';
            } else {
                return '';
            }
        }
        const uploadProps = {
            name: 'file',
            accept: '.jpeg, .png, .jpg',
            action: '/accm-web/ACCMCommon/upload',
            onChange: (info) => {
                // const { setPhotolist } = this.props;
                // if (info.file.status == 'done' || info.file.status == 'removed') {
                //     let result = info.fileList.map((item) => {
                //         return {
                //             url: item.response.message,
                //             uid: item.uid
                //         };
                //     });
                //     setPhotolist(result);
                // }
                setPhotolist(info.fileList);
                // this.setState({ fileList: info.fileList });
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
                    visible={showModal}
                    forceRender={true}
                    width={780}
                    onCancel={() => {
                        toggle();
                        setPhotolist([]);
                    }}
                    title={whichTitle(modalType)}
                    // onOk={this.handleClick}
                    footer={
                        <React.Fragment>
                            <Button onClick={() => {
                                toggle();
                                setPhotolist([]);
                            }}>取消</Button>
                            {
                                modalType === 'detail' ? null : <Button type='primary' onClick={this.handleClick}>确定</Button>
                            }
                        </React.Fragment>
                    }
                >
                    {
                        modalType === 'detail' ?
                            <React.Fragment>
                                <Row gutter={[0, 20]}>
                                    <Col span={6}>
                                        <span>进账单类型:</span>
                                    </Col>
                                    <Col span={16}>
                                        <span>{this.showDict(sysAllDictItems.bill_type, detail.billType)}</span>
                                    </Col>
                                    <Col span={6}>
                                        <span>进账单编号:</span>
                                    </Col>
                                    <Col span={16}>
                                        <span>{detail.billCode}</span>
                                    </Col>
                                    <Col span={6}>
                                        <span>账单金额:</span>
                                    </Col>
                                    <Col span={16}>
                                        <span>{detail.incomeAmount}</span>
                                    </Col>
                                    <Col span={6}>
                                        <span>付款账号:</span>
                                    </Col>
                                    <Col span={16}>
                                        <span>{detail.paymentAccount}</span>
                                    </Col>
                                    <Col span={6}>
                                        <span>付款户名:</span>
                                    </Col>
                                    <Col span={16}>
                                        <span>{detail.paymentName}</span>
                                    </Col>
                                    <Col span={6}>
                                        <span>收款账号:</span>
                                    </Col>
                                    <Col span={16}>
                                        <span>{detail.collectionAccount}</span>
                                    </Col>
                                    <Col span={6}>
                                        <span>收款户名:</span>
                                    </Col>
                                    <Col span={16}>
                                        <span>{detail.collectionName}</span>
                                    </Col>

                                    {detail.imageUrl ?
                                        <React.Fragment>
                                            <Col span={6}>
                                                <span>单据影印件:</span>
                                            </Col>
                                            <Col span={16}>
                                                {/* 只是作为展示 */}
                                                <Upload
                                                    style={{ verticalAlign: 'middle' }}
                                                    listType='picture-card'
                                                    fileList={
                                                        [
                                                            {
                                                                uid: '-1',
                                                                name: 'image.png',
                                                                status: 'done',
                                                                url: detail.imageUrl,
                                                            }
                                                        ]
                                                    }
                                                    disabled={true}
                                                ></Upload>
                                            </Col></React.Fragment> : null}
                                </Row>
                            </React.Fragment> :
                            <React.Fragment>
                                <Form {...formProps}>
                                    <Form.Item label='选择进账单类型'>
                                        {
                                            getFieldDecorator('billType', {
                                                initialValue: typeIncome || '',
                                                rules: [
                                                    { required: true, message: '进账单类型不能为空' },
                                                ],
                                            })(
                                                <OneSelect
                                                    selfOptions={searchOptionsCommon('billType')}
                                                    style={{ width: '100%' }}
                                                    onChange={(v, o) => {
                                                        this.setState({
                                                            typeIncome: v,
                                                            selectIncomeType: false,
                                                        })
                                                    }}
                                                />,
                                            )
                                        }
                                    </Form.Item>

                                    <Form.Item label='进账单编号'>
                                        {
                                            getFieldDecorator('billCode', {
                                                initialValue: modalType === 'new' ? '' : initDetail.billCode,
                                                rules: [
                                                    { required: true, message: '进账单编号不能为空', },
                                                    {
                                                        message: '请输入正确的进账单编号',
                                                        pattern: /^[0-9]*$/,
                                                    },
                                                    {
                                                        max:20,
                                                        message: '超过最大长度限度',

                                                    },
                                                ],
                                            })(
                                                <Input />,
                                            )
                                        }
                                    </Form.Item>
                                    <Form.Item label='进账金额'>
                                        {
                                            getFieldDecorator('incomeAmount', {
                                                initialValue: modalType === 'new' ? '' : initDetail.incomeAmount,
                                                rules: [
                                                    { required: true, message: '进账金额不能为空' },
                                                    {
                                                        message: '请输入正确的进账金额',
                                                        pattern: /^[0-9]+(.[0-9]{1,2})?$/,
                                                    },
                                                    {
                                                        max:20,
                                                        message: '超过最大长度限度',

                                                    },
                                                ],
                                            })(
                                                <Input />,
                                            )
                                        }
                                    </Form.Item>
                                    {(typeIncome === searchOptionsCommon('billType')[0].id) && modalType === 'new' ? <Row>
                                        <Col offset={5}>
                                            <Checkbox onChange={this.handCheckBoxChange}>新增付款账号</Checkbox>
                                        </Col>
                                    </Row> : null}
                                    {((typeIncome !== searchOptionsCommon('billType')[0].id) || (!selectIncomeType) && modalType === 'new') ? <Form.Item label='选择历史付款账户号'>
                                        {
                                            getFieldDecorator('historyPayment', {
                                                initialValue: '',
                                                rules: [
                                                    { required: true, message: '历史付款账户号不能为空' },
                                                ],
                                            })(
                                                <OneSelect
                                                    selfOptions={paymentInfo}
                                                    style={{ width: '100%' }}
                                                    disabled={selectIncomeType}
                                                // selfMaps={{id:'account',name:'account'}}
                                                />,
                                            )
                                        }
                                    </Form.Item> : null}
                                    {(typeIncome === searchOptionsCommon('billType')[0].id) && selectIncomeType && modalType === 'new' ? <React.Fragment><Form.Item label='付款账户号'>
                                        <Row>
                                            <Col span={24}>
                                                {
                                                    getFieldDecorator('paymentAccount', {
                                                        initialValue: initDetail.paymentAccount || '',
                                                        rules: [
                                                            { required: true, message: '付款账户号不能为空' },
                                                            {
                                                                max:18,
                                                                message: '超过最大长度限度',
        
                                                            },
                                                        ],
                                                    })(
                                                        <Input disabled={!selectIncomeType} />,
                                                    )
                                                }
                                            </Col>
                                        </Row>
                                    </Form.Item>
                                        <Form.Item label='开户银行'>
                                            {
                                                getFieldDecorator('paymentOrg', {
                                                    initialValue: initDetail.paymentOrg || '',
                                                    rules: [
                                                        { required: true, message: '开户银行不能为空' },,
                                                        {
                                                            max:50,
                                                            message: '超过最大长度限度',
    
                                                        },
                                                    ],
                                                })(
                                                    <Input disabled={!selectIncomeType} />,
                                                )
                                            }
                                        </Form.Item>
                                        <Form.Item label='付款户名'>
                                            {
                                                getFieldDecorator('paymentName', {
                                                    initialValue: initDetail.paymentName || '',
                                                    rules: [
                                                        { required: true, message: '付款户名不能为空' },,
                                                        {
                                                            max:32,
                                                            message: '超过最大长度限度',
    
                                                        },
                                                    ],
                                                })(
                                                    <Input disabled={!selectIncomeType} />,
                                                )
                                            }
                                        </Form.Item>

                                    </React.Fragment> : null}

                                    <Form.Item label='收款账户号'>
                                        {
                                            getFieldDecorator('historyCollection', {
                                                initialValue: modalType === 'new' ? '' : initDetail.collectionAccount,
                                                rules: [
                                                    { required: true, message: '收款账户号不能为空' },
                                                ],
                                            })(
                                                modalType === 'new' ? <OneSelect
                                                    selfOptions={collectionInfo}
                                                    style={{ width: '100%' }}
                                                    onChange={(e,o)=>{
                                                        let result='';
                                                        collectionInfo.forEach(item=>{
                                                            if(item.id==e){
                                                                result=item.text;
                                                            }
                                                        });
                                                        this.setState({
                                                            selectedCollectionName:result,
                                                        })
                                                    }}
                                                /> : <Input disabled />,
                                            )
                                        }
                                    </Form.Item>
                                    <Form.Item label='收款户名'>
                                        {
                                            getFieldDecorator('collectionName', {
                                                initialValue: modalType === 'new' ? this.state.selectedCollectionName : initDetail.collectionName,
                                                rules: [
                                                    { required: true, message: '收款户名不能为空' },
                                                    {
                                                        max:50,
                                                        message: '超过最大长度限度',
                                                    },
                                                ],
                                            })(
                                                <Input disabled />,
                                            )
                                        }
                                    </Form.Item>

                                    <Form.Item label='上传影印件'>
                                        {
                                            getFieldDecorator('imageUrl', {
                                                initialValue: '',
                                                rules: [
                                                    { required: true, message: '影印件不能为空' },
                                                ],
                                            })(
                                                <Upload
                                                    {...uploadProps}
                                                    listType='picture-card'
                                                    fileList={photoList}
                                                >
                                                    {photoList.length > 0 ? null : uploadButton}
                                                </Upload>,
                                            )
                                        }

                                    </Form.Item>
                                </Form>
                            </React.Fragment>
                    }
                </Modal>
            </div>
        )
    }
}
const mapState = (state) => {
    return {
        showModal: state.modal.showModal,
        modalType: state.modal.modalType,
        photoList: state.bindIncomeNew.photoList,
        paymentInfo: state.bindIncomeNew.paymentInfo,
        collectionInfo: state.bindIncomeNew.collectionInfo,
        selectValue: state.modal.selectValue,
        sysAllDictItems: state.login.sysAllDictItems,
    }
}
const mapDisptach = (dispatch) => {
    return {
        toggle: dispatch.modal.toggle,
        asyncNewIncome: dispatch.bindIncomeNew.asyncNewIncome,
        asyncUpload: dispatch.common.asyncUpload,
        setPhotolist: dispatch.bindIncomeNew.setPhotolist,
        asyncGetList: dispatch.bindIncomeNew.asyncGetList,
    }
}
export default connect(mapState, mapDisptach)(Form.create()(ModalNew));