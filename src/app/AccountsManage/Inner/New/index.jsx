import React from 'react';
import {
    Typography,
    Form,
    Input,
    Button,
    Row,
    Col,
    message,
    Skeleton,
} from 'antd';
import { OneSelect } from 'bnq-sys-react-component';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { searchOptionsCommon } from '../optionsCommon';

const { Title } = Typography;
const FormItem = Form.Item;
class New extends React.Component {
    static propTypes = {
        form: Proptypes.object,
        checkInner: Proptypes.func,
        getClassAll: Proptypes.func,
        classAll: Proptypes.array,
        addInner: Proptypes.func,
        innerDetail: Proptypes.object,
        setInner: Proptypes.func,
        clearInnerDetail: Proptypes.func,
        getInnerDetail: Proptypes.func,
        loading: Proptypes.bool,
        getSysAllDictItems: Proptypes.func,
        sysAllDictItems: Proptypes.object,
    }

    static defaultProps = {
        form: null,
        checkInner: () => { },
        getClassAll: () => { },
        classAll: [],
        addInner: () => { },
        innerDetail: {},
        setInner: () => { },
        clearInnerDetail: () => { },
        getInnerDetail: () => { },
        loading: true,
        getSysAllDictItems: () => { },
        sysAllDictItems: {},
    }

    constructor(props) {
        super(props);
        this.state = {
            // eslint-disable-next-line react/prop-types
            innerNo: this.props.match.params.id,
        };
    }

    componentDidMount() {
        const {
            classAll,
            getClassAll,
            getInnerDetail,
            getSysAllDictItems,
        } = this.props;
        const { innerNo } = this.state;
        getSysAllDictItems();
        if (classAll.length === 0) {
            getClassAll();
        }
        if (innerNo) {
            getInnerDetail({
                no: innerNo,
            });
        }
    }

    componentWillUnmount() {
        const { clearInnerDetail } = this.props;
        clearInnerDetail();
    }

    handleSubmit = () => {
        const {
            checkInner,
            addInner,
            setInner,
            innerDetail,
        } = this.props;
        const { validateFieldsAndScroll } = this.props.form;
        const { innerNo } = this.state;
        validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }

            if (innerNo) {
                // 修改
                setInner({
                    ...values,
                    id: innerDetail.id,
                }).then(() => {
                    message.success('编辑成功', 1, () => {
                        window.history.back();
                    });
                });
            } else {
                new Promise(async (resolve) => {
                    const result = await checkInner([{
                        fieldName: 'internal_account_no',
                        fieldVal: values.internalAccountNo,
                    }]);
                    resolve(result);
                    // eslint-disable-next-line consistent-return
                }).then(async (q) => {
                    if (q.success) {
                        const cache = await addInner(values);
                        return cache;
                        // eslint-disable-next-line no-else-return
                    } else {
                        message.error('内部账户号已经存在');
                    }
                }, () => { }).then((cache) => {
                    if (cache.success) {
                        message.success('新增成功', 1, () => {
                            window.history.back();
                        });
                    } else {
                        message.error(cache.message);
                    }
                });
            }
        });
    }

    render() {
        const { innerNo } = this.state;
        const {
            form,
            classAll,
            innerDetail,
            loading,
            sysAllDictItems,
        } = this.props;
        const { getFieldDecorator } = form;
        return (
            <div>
                <Title level={4}>{innerNo ? '内部账户修改' : '内部账户开户'}</Title>
                <hr />
                <Skeleton loading={loading}>
                    <Form
                        labelCol={
                            { span: 3 }
                        }
                        wrapperCol={
                            { span: 8 }
                        }
                    >
                        <FormItem label="内部账户号">
                            {
                                getFieldDecorator('internalAccountNo', {
                                    initialValue: innerDetail.internalAccountNo || '',
                                    rules: [
                                        { required: true, message: '内部账户号不能为空' },
                                        {
                                            message: '请输入正确的类编号',
                                            pattern: /^\d*?$/,
                                        },
                                    ],
                                })(
                                    innerNo ? (<Input disabled />) : (<Input />),
                                )
                            }
                        </FormItem>
                        <FormItem label="内部账户名称">
                            {
                                getFieldDecorator('internalAccountName', {
                                    initialValue: innerDetail.internalAccountName || '',
                                    rules: [
                                        { required: true, message: '内部账户名称不能为空' },
                                    ],
                                })(
                                    innerNo ? (<Input disabled />) : (<Input />),
                                )
                            }
                        </FormItem>
                        <FormItem label="对应科目号">
                            {
                                getFieldDecorator('subjectNo', {
                                    initialValue: innerDetail.subjectNo || '',
                                    rules: [
                                        { required: true, message: '对应科目号不能为空' },
                                    ],
                                })(
                                    <OneSelect
                                        selfOptions={classAll.map((item) => {
                                            return {
                                                id: item.subjectNo,
                                                name: `${item.subjectNo}--${item.subjectName}`,
                                            };
                                        })}
                                        style={{ width: '100%' }}
                                    />,
                                )
                            }
                        </FormItem>
                        <FormItem label="帐户所属机构">
                            {
                                getFieldDecorator('orgNo', {
                                    initialValue: innerDetail.orgNo || '',
                                    rules: [
                                        { required: true, message: '帐户所属机构不能为空' },
                                    ],
                                })(
                                    <OneSelect
                                        // eslint-disable-next-line no-unneeded-ternary
                                        // disabled={innerNo ? true : false}
                                        selfOptions={sysAllDictItems.org_no}
                                        selfMaps={{ id: ['value'], name: ['text'] }}
                                        style={{ width: '100%' }}
                                    />,
                                )
                            }
                        </FormItem>
                        <FormItem label="账户状态">
                            {
                                getFieldDecorator('internalAccountStatus', {
                                    initialValue: innerDetail.internalAccountStatus,
                                    rules: [
                                        { required: true, message: '账户状态不能为空' },
                                    ],
                                })(
                                    <OneSelect
                                        // eslint-disable-next-line no-unneeded-ternary
                                        // disabled={innerNo ? true : false}
                                        selfOptions={searchOptionsCommon('innerStatus')}
                                        style={{ width: '100%' }}
                                    />,
                                )
                            }
                        </FormItem>
                        <FormItem label="是否允许透支">
                            {
                                getFieldDecorator('allowOverdrawFlag', {
                                    initialValue: innerDetail.allowOverdrawFlag,
                                    rules: [
                                        { required: true, message: '是否允许透支不能为空' },
                                    ],
                                })(
                                    <OneSelect
                                        selfOptions={searchOptionsCommon('innerOver')}
                                        style={{ width: '100%' }}
                                    />,
                                )
                            }
                        </FormItem>
                        <FormItem label="特征码">
                            {
                                getFieldDecorator('featureCode', {
                                    initialValue: innerDetail.featureCode || '',
                                })(
                                    <Input />,
                                )
                            }
                        </FormItem>
                    </Form>
                    <Row gutter={30}>
                        <Col span={12}>
                            <div className="bottom-btn-div">
                                <Button
                                    className="btn save"
                                    type="primary"
                                    onClick={this.handleSubmit}
                                >提交</Button>
                                <Button
                                    className="btn back"
                                    onClick={() => {
                                        window.history.back();
                                    }}
                                >返回</Button>
                            </div>
                        </Col>
                    </Row>
                </Skeleton>
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        classAll: state.accountManageInner.classAll,
        innerDetail: state.accountManageInner.innerDetail,
        loading: state.loading.effects.accountManageInner.asyncGetInnerDetail,
        sysAllDictItems: state.login.sysAllDictItems,
    };
};
const mapDispatch = (dispatch) => {
    return {
        checkInner: dispatch.innerNew.asyncCheckInner,
        getClassAll: dispatch.accountManageInner.asyncGetClassAll,
        addInner: dispatch.innerNew.asyncInnerAdd,
        getInnerDetail: dispatch.accountManageInner.asyncGetInnerDetail,
        setInner: dispatch.accountManageInner.asyncSetInner,
        clearInnerDetail: dispatch.accountManageInner.clearInnerDetail,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(New));
