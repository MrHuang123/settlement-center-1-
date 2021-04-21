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
        classEnum: Proptypes.object,
        getClassEnum: Proptypes.func,
        checkClass: Proptypes.func,
        addClass: Proptypes.func,
        getClassDetail: Proptypes.func,
        clearClassDetail: Proptypes.func,
        resetClass: Proptypes.func,
        classDetail: Proptypes.object,
        loading: Proptypes.bool,
        getSysAllDictItems: Proptypes.func,
        sysAllDictItems: Proptypes.object,
    }

    static defaultProps = {
        form: null,
        classEnum: {},
        getClassEnum: () => { },
        checkClass: () => { },
        addClass: () => { },
        getClassDetail: () => { },
        clearClassDetail: () => { },
        resetClass: () => { },
        classDetail: {},
        loading: true,
        getSysAllDictItems: () => { },
        sysAllDictItems: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            // eslint-disable-next-line react/prop-types
            subjectNo: this.props.match.params.id,
            isTopLevel: true,
        };
    }

    componentDidMount() {
        const {
            getClassEnum,
            getClassDetail,
            classEnum,
            getSysAllDictItems,
        } = this.props;
        const { subjectNo } = this.state;
        // 优化
        getSysAllDictItems();
        if (classEnum.subjectLevelEnum === undefined) {
            getClassEnum();
        }
        if (subjectNo) {
            getClassDetail({
                subjectNo,
            }).then((data) => {
                this.setState({
                    isTopLevel: data.result.subjectLevel === 1,
                });
            });
        }
    }

    componentWillUnmount() {
        const { clearClassDetail } = this.props;
        clearClassDetail();
    }

    handleLevelChange = (v) => {
        this.setState({
            // eslint-disable-next-line eqeqeq
            isTopLevel: v == 1,
        });
    }

    handleSubmit = () => {
        const { validateFieldsAndScroll } = this.props.form;
        const {
            checkClass,
            addClass,
            resetClass,
            classDetail,
        } = this.props;
        const { subjectNo } = this.state;
        validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }
            if (subjectNo) {
                // 修改
                resetClass({
                    ...values,
                    id: classDetail.id,
                }).then(() => {
                    message.success('编辑成功', 1, () => {
                        window.history.back();
                    });
                });
            } else {
                new Promise(async (resolve) => {
                    const result = await checkClass([{
                        fieldName: 'subject_no',
                        fieldVal: values.subjectNo,
                    }, {
                        fieldName: 'subject_name',
                        fieldVal: values.subjectName,
                    }]);
                    resolve(result);
                    // eslint-disable-next-line consistent-return
                }).then(async (q) => {
                    if (q.success) {
                        const cache = await addClass(values);
                        if (cache.success) {
                            return cache;
                            // eslint-disable-next-line no-else-return
                        } else {
                            message.error(cache.message);
                        }
                    } else {
                        message.error('科目号或科目名称已经存在');
                    }
                }, () => {

                }).then(() => {
                    message.success('新增成功', 1, () => {
                        window.history.back();
                    });
                });
            }
        });
    }

    render() {
        const { subjectNo, isTopLevel } = this.state;
        const {
            form,
            classEnum,
            classDetail,
            loading,
            sysAllDictItems,
        } = this.props;
        const { getFieldDecorator } = form;
        return (
            <div>
                <Skeleton active loading={loading}>
                    <Title level={4}>{subjectNo ? '修改会计科目' : '新增会计科目'}</Title>
                    <hr />
                    <Form
                        labelCol={
                            { span: 3 }
                        }
                        wrapperCol={
                            { span: 8 }
                        }
                    >
                        <FormItem label="科目号">
                            {
                                getFieldDecorator('subjectNo', {
                                    initialValue: classDetail.subjectNo || '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '科目号不能为空',
                                        }, {
                                            message: '请输入正确的科目号',
                                            pattern: /^[0-9]+$/,
                                        },
                                    ],
                                })(
                                    subjectNo ? (<Input disabled />) : (<Input maxLength={18} />),
                                )
                            }
                        </FormItem>
                        <FormItem label="科目名称">
                            {
                                getFieldDecorator('subjectName', {
                                    initialValue: classDetail.subjectName || '',
                                    rules: [
                                        { required: true, message: '科目名称不能为空' },
                                    ],
                                })(
                                    subjectNo ? (<Input disabled />) : (<Input maxLength={60} />),
                                )
                            }
                        </FormItem>
                        <FormItem label="科目状态">
                            {
                                getFieldDecorator('subjectStatus', {
                                    // eslint-disable-next-line eqeqeq
                                    initialValue: classDetail.subjectStatus == 0 ? 0 : classDetail.subjectStatus,
                                    rules: [
                                        {
                                            required: true,
                                            message: '科目状态不能为空',
                                        },
                                    ],
                                })(
                                    <OneSelect
                                        selfOptions={searchOptionsCommon('classStatus')}
                                        selfHasAll={false}
                                    // eslint-disable-next-line no-unneeded-ternary
                                    // disabled={subjectNo ? true : false}
                                    />,
                                )
                            }
                        </FormItem>
                        <FormItem label="科目级别">
                            {
                                getFieldDecorator('subjectLevel', {
                                    initialValue: classDetail.subjectLevel || '',
                                })(
                                    <OneSelect
                                        selfOptions={classEnum.subjectLevelEnum}
                                        selfMaps={{ id: ['code', 'id'], name: 'description' }}
                                        selfHasAll={false}
                                        // eslint-disable-next-line no-unneeded-ternary
                                        disabled={subjectNo ? true : false}
                                        onChange={this.handleLevelChange}
                                    />,
                                )
                            }
                        </FormItem>
                        {
                            isTopLevel ? null : <FormItem label="上级科目号">
                                {
                                    getFieldDecorator('parentSubjectNo', {
                                        initialValue: classDetail.parentSubjectNo || '',
                                        rules: [
                                            // {
                                            //     required: true,
                                            //     message: '上级科目号不能为空',
                                            // }
                                            {
                                                message: '请输入正确的上级科目号',
                                                pattern: /^[0-9a-zA-Z]+$/,
                                            },
                                        ],
                                    })(
                                        subjectNo ? <Input disabled /> : <Input maxLength={18} />,
                                    )
                                }
                            </FormItem>
                        }
                        <FormItem label="科目类别">
                            {
                                getFieldDecorator('subjectType', {
                                    initialValue: classDetail.subjectType || '',
                                })(
                                    <OneSelect
                                        selfOptions={classEnum.subjectCategoryEnum}
                                        selfMaps={{ id: ['code', 'id'], name: 'description' }}
                                        selfHasAll={false}
                                    />,
                                )
                            }
                        </FormItem>
                        <FormItem label="余额方向">
                            {
                                getFieldDecorator('balanceDirection', {
                                    initialValue: classDetail.balanceDirection ? String(classDetail.balanceDirection) : '',
                                    rules: [
                                        { required: true, message: '余额方向不能为空' },
                                    ],
                                })(
                                    <OneSelect
                                        selfOptions={sysAllDictItems.balance_direction}
                                        selfMaps={{ id: ['value'], name: 'title' }}
                                        selfHasAll={false}
                                    />,
                                )
                            }
                        </FormItem>
                        <FormItem label="损益结转标识">
                            {
                                getFieldDecorator('profitLossFlag', {
                                    // initialValue: classDetail.profitLossFlag || '',
                                    initialValue: classDetail.profitLossFlag ? String(classDetail.profitLossFlag) : '',
                                    rules: [
                                        { required: true, message: '余额方向不能为空' },
                                    ],
                                })(
                                    <OneSelect
                                        selfOptions={sysAllDictItems.profit_loss_flag}
                                        selfMaps={{ id: ['value'], name: 'title' }}
                                        selfHasAll={false}
                                    />,
                                )
                            }
                        </FormItem>
                        <FormItem label="说明">
                            {
                                getFieldDecorator('memo', {
                                    initialValue: classDetail.memo || '',
                                })(
                                    <Input.TextArea rows={4} />,
                                )
                            }
                        </FormItem>
                    </Form>
                    <Row gutter={30}>
                        <Col span={12}>
                            <div className="bottom-btn-div">
                                {
                                    <Button
                                        className="btn save"
                                        type="primary"
                                        onClick={this.handleSubmit}
                                    >提交</Button>
                                }

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
        classEnum: state.accountManageClass.classEnum,
        classDetail: state.accountManageClass.classDetail,
        loading: state.loading.effects.accountManageClass.asyncGetClassEnum,
        sysAllDictItems: state.login.sysAllDictItems,
    };
};

const mapDispatch = (dispatch) => {
    return {
        getClassEnum: dispatch.accountManageClass.asyncGetClassEnum,
        checkClass: dispatch.classNew.asyncCheckClass,
        addClass: dispatch.classNew.asyncAddClass,
        getClassDetail: dispatch.accountManageClass.asyncGetClassDetail,
        clearClassDetail: dispatch.accountManageClass.clearClassDetail,
        resetClass: dispatch.classNew.asyncResetClass,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
    };
};

export default connect(mapState, mapDispatch)(Form.create()(New));
