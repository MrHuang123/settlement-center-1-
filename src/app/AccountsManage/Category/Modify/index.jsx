import React from 'react';
import {
    Typography,
    Form,
    Input,
    Button,
    Row,
    Col,
    message,
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
        getDetail: Proptypes.func,
        justDetail: Proptypes.func,
        setCategory: Proptypes.func,
        detail: Proptypes.object,
    }

    static defaultProps = {
        form: null,
        getDetail: () => { },
        justDetail: () => { },
        setCategory: () => { },
        detail: {},
    }

    constructor(props) {
        super(props);
        this.state = {
            // eslint-disable-next-line react/prop-types
            id: this.props.match.params.id,
            // level2List: [],
            // level3List: [],
            initData: {
                accountType: '',
                bussinessType: '',
            },
        };
    }

    componentDidMount() {
        const { id } = this.state;
        const {
            getDetail,
            justDetail,
            // detail,
            // setCategory,
        } = this.props;
        getDetail({
            no: id,
            // eslint-disable-next-line react/prop-types
            level: this.props.match.params.level,
            // eslint-disable-next-line consistent-return
        }).then((data) => {
            if (data.classLevel === '02') {
                justDetail({
                    no: data.parentClassNo,
                }).then((accountObj) => {
                    this.setState({
                        initData: {
                            accountType: accountObj.className,
                        },
                    });
                    return false;
                });
            } else if (data.classLevel === '03') {
                const bussinessObj = justDetail({
                    no: data.parentClassNo,
                });
                return bussinessObj;
            }
        }).then((bussinessObj) => {
            if (bussinessObj) {
                justDetail({
                    no: bussinessObj.parentClassNo,
                }).then((accountObj) => {
                    this.setState({
                        initData: {
                            accountType: accountObj.className,
                            bussinessType: bussinessObj.className,
                        },
                    });
                });
            }
        });
    }

    handleSubmit = () => {
        const { setCategory } = this.props;
        const { validateFieldsAndScroll } = this.props.form;
        validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }
            delete values.accountType;
            delete values.bussinessType;
            setCategory(values).then((data) => {
                if (data.success) {
                    message.success(data.message, 1, () => {
                        window.history.back();
                    });
                }
            });
        });
    }

    render() {
        const { form, detail } = this.props;
        const { initData } = this.state;
        const { getFieldDecorator } = form;

        return (
            <div>
                <Title level={4}>修改账务分类</Title>
                <hr />
                <Form
                    labelCol={
                        { span: 3 }
                    }
                    wrapperCol={
                        { span: 8 }
                    }
                >
                    {/* 1级选项 */}
                    <FormItem label="分类等级">
                        {
                            getFieldDecorator('classLevel', {
                                initialValue: detail.classLevel || '',
                            })(
                                <OneSelect
                                    selfOptions={searchOptionsCommon('categoryLevel')}
                                    selfHasAll={false}
                                    onChange={this.levelChange}
                                    disabled
                                />,
                            )
                        }
                    </FormItem>
                    {/* 2级选项 */}
                    {
                        (detail.classLevel === '02' || detail.classLevel === '03') ? (
                            <FormItem label="账务类型">
                                {
                                    getFieldDecorator('accountType', {
                                        initialValue: initData.accountType,
                                    })(
                                        <Input disabled />,
                                    )
                                }
                            </FormItem>
                        ) : null
                    }
                    {/* 3级选项 */}
                    {
                        (detail.classLevel === '03') ? (
                            <FormItem label="交易类型">
                                {
                                    getFieldDecorator('bussinessType', {
                                        initialValue: initData.bussinessType,
                                    })(
                                        <Input disabled />,
                                    )
                                }
                            </FormItem>
                        ) : null
                    }

                    <FormItem label="类名称">
                        {
                            getFieldDecorator('className', {
                                initialValue: detail.className,
                            })(
                                <Input disabled />,
                            )
                        }
                    </FormItem>
                    <FormItem label="类编号">
                        {
                            getFieldDecorator('classNo', {
                                initialValue: detail.classNo,
                            })(
                                <Input disabled />,
                            )
                        }
                    </FormItem>
                    <FormItem label="排列序号">
                        {
                            getFieldDecorator('sortNo', {
                                initialValue: detail.sortNo || '',
                                rules: [
                                    { required: true, message: '排列序号不能为空' },
                                ],
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
                            >取消</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
const mapDispatch = (dispatch) => {
    return {
        getDetail: dispatch.categoryNew.asyncGetDetail,
        justDetail: dispatch.categoryNew.asyncJustDetail,
        setCategory: dispatch.categoryNew.asyncSetCategory,
    };
};
const mapState = (state) => {
    return {
        detail: state.categoryNew.detail,
        loading: state.loading.effects.categoryNew.justDetail,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(New));
