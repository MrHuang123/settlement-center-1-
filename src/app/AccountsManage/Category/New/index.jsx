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
import _padStart from 'lodash.padstart';
import { searchOptionsCommon } from '../optionsCommon';

const { Title } = Typography;
const FormItem = Form.Item;
class New extends React.Component {
    static propTypes = {
        form: Proptypes.object,
        // setCategoryLevel: Proptypes.func,
        // categoryLevel: Proptypes.string,
        addCategory: Proptypes.func,
        // getClassList: Proptypes.object,
        // classAllList: Proptypes.array,
        checkCategory: Proptypes.func,
    }

    static defaultProps = {
        form: null,
        // setCategoryLevel: () => { },
        addCategory: () => { },
        // getClassList: () => { },
        // classAllList: [],
        checkCategory: () => { },
    }

    constructor(props) {
        super(props);
        this.state = {
            // select1Value: '',
            // eslint-disable-next-line react/no-unused-state
            // select2Value: '',
        };
    }

    componentDidMount() {
        // const { getClassList } = this.props;
        // getClassList();
    }

    // levelChange = (value) => {
    //     const { setCategoryLevel } = this.props;
    //     switch (categoryLevel) {
    //         case '02':
    //             this.props.form.setFieldsValue({
    //                 accountType: '',
    //             });
    //             break;
    //         case '03':
    //             this.props.form.setFieldsValue({
    //                 accountType: '',
    //                 bussinessType: '',
    //             });
    //             break;
    //         default:
    //             break;
    //     }
    //     setCategoryLevel({
    //         categoryLevel: value,
    //     });
    // }

    handleSubmit = () => {
        const { addCategory, checkCategory } = this.props;
        const { validateFieldsAndScroll } = this.props.form;
        validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }
            const send = values;
            // if (categoryLevel === '02') {
            //     // parentClassNo???accountType
            //     const cache = {
            //         ...values,
            //         parentClassNo: values.accountType,
            //     };
            //     delete cache.accountType;
            //     send = cache;
            // } else if (categoryLevel === '03') {
            //     // parentClassNo???bussinessType
            //     const cache = {
            //         ...values,
            //         parentClassNo: values.bussinessType,
            //     };
            //     delete cache.accountType;
            //     delete cache.bussinessType;
            //     send = cache;
            // } else {
            //     send = values;
            // }
            switch (send.classLevel) {
                case '01':
                case '02':
                    send.classNo = _padStart(send.classNo, 3, '0');
                    break;
                case '03':
                    send.classNo = _padStart(send.classNo, 4, '0');
                    break;
                default:
                    break;
            }
            new Promise(async (res) => {
                const result = await checkCategory([{
                    fieldName: 'class_no',
                    fieldVal: send.classNo,
                }, {
                    fieldName: 'class_level',
                    fieldVal: send.classLevel,
                }]);
                if (result.success) {
                    res();
                } else {
                    message.error(result.message);
                }
            }).then(() => {
                addCategory(send).then((data) => {
                    if (data.success) {
                        message.success(data.message, 1, () => {
                            window.history.back();
                        });
                    } else {
                        message.error(data.message);
                    }
                });
            });
        });
    }

    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <div>
                <Title level={4}>??????????????????</Title>
                <hr />
                <Form
                    labelCol={
                        { span: 3 }
                    }
                    wrapperCol={
                        { span: 8 }
                    }
                >
                    {/* 1????????? */}
                    <FormItem label="????????????">
                        {
                            getFieldDecorator('classLevel', {
                                initialValue: '',
                                rules: [
                                    { required: true, message: '????????????????????????' },
                                ],
                            })(
                                <OneSelect
                                    selfOptions={searchOptionsCommon('categoryLevel')}
                                    // onChange={this.levelChange}
                                    selfFieldOptions={{
                                        initialValue: '',
                                    }}
                                    selfHasAll={{ value: '', text: '?????????' }}
                                    style={{ width: 240 }}
                                />,
                            )
                        }
                    </FormItem>
                    {/* 2????????? */}
                    {
                        // (categoryLevel === '02' || categoryLevel === '03') ? (
                        //     <FormItem label="????????????">
                        //         {
                        //             getFieldDecorator('accountType', {
                        //                 initialValue: '',
                        //                 rules: [
                        //                     { required: true, message: '????????????????????????' },
                        //                 ],
                        //             })(
                        //                 <OneSelect
                        //                     selfOptions={classAllList.filter((item) => {
                        //                         return item.classLevel === '01';
                        //                     })}
                        //                     selfMaps={{ id: ['classNo'], name: ['className'] }}
                        //                     selfFieldOptions={{
                        //                         initialValue: '',
                        //                     }}
                        //                     selfHasAll={{ value: '', text: '?????????' }}
                        //                     onChange={(select1Value) => {
                        //                         this.setState({
                        //                             select1Value,
                        //                         });
                        //                         if (categoryLevel === '03') {
                        //                             this.props.form.setFieldsValue({
                        //                                 bussinessType: '',
                        //                             });
                        //                         }
                        //                     }}
                        //                     style={{ width: 240 }}
                        //                 />,
                        //             )
                        //         }
                        //     </FormItem>
                        // ) : null
                    }

                    {/* 3????????? */}
                    {
                        // (categoryLevel === '03') ? (
                        //     <FormItem label="????????????">
                        //         {
                        //             getFieldDecorator('bussinessType', {
                        //                 initialValue: '',
                        //                 rules: [
                        //                     { required: true, message: '????????????????????????' },
                        //                 ],
                        //             })(
                        //                 <OneSelect
                        //                     selfOptions={classAllList.filter((item) => {
                        //                         return item.classLevel === '02' && item.parentClassNo === this.state.select1Value;
                        //                     })}
                        //                     selfHasAll={{ value: '', text: '?????????' }}
                        //                     selfFieldOptions={{
                        //                         initialValue: '',
                        //                     }}
                        //                     selfMaps={{ id: ['classNo'], name: ['className'] }}
                        //                     onChange={(select2Value) => {
                        //                         this.setState({
                        //                             // eslint-disable-next-line react/no-unused-state
                        //                             select2Value,
                        //                         });
                        //                     }}
                        //                     style={{ width: 240 }}
                        //                 />,
                        //             )
                        //         }
                        //     </FormItem>
                        // ) : null
                    }
                    <FormItem label="?????????">
                        {
                            getFieldDecorator('className', {
                                initialValue: '',
                                rules: [
                                    { required: true, message: '?????????????????????' },
                                ],
                            })(
                                <Input />,
                            )
                        }
                    </FormItem>
                    <FormItem label="?????????">
                        {
                            getFieldDecorator('classNo', {
                                initialValue: '',
                                rules: [
                                    { required: true, message: '?????????????????????' },
                                    {
                                        message: '???????????????????????????',
                                        pattern: /^\d*?$/,
                                    },
                                ],
                            })(
                                <Input maxLength={4} />,
                            )
                        }
                    </FormItem>
                    <FormItem label="????????????">
                        {
                            getFieldDecorator('sortNo', {
                                initialValue: '',
                                rules: [
                                    { required: true, message: '????????????????????????' },
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
                            >??????</Button>
                            <Button
                                className="btn back"
                                onClick={() => {
                                    window.history.back();
                                }}
                            >??????</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        // categoryLevel: state.categoryNew.categoryLevel,
        initData: state.categoryList.initData,
        // classAllList: state.accountManageRule.classList,
    };
};

const mapDispatch = (dispatch) => {
    return {
        // setCategoryLevel: dispatch.categoryNew.setCategoryLevel,
        addCategory: dispatch.categoryNew.asyncAddCategory,
        checkCategory: dispatch.categoryNew.asyncCheckCategory,
        // getClassList: dispatch.accountManageRule.asyncGetClassList,
    };
};

export default connect(mapState, mapDispatch)(Form.create()(New));
