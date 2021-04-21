/*
 * @Author: zhou.ying
 * @Date: 2021-03-26 15:37:50
 * @Last Modified by: zhou.ying
 * @Last Modified time: 2021-03-30 16:10:12
 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import {
    Form,
    Input,
    Typography,
    Row,
    Col,
    Button,
    InputNumber,
    Select,
} from 'antd';

const { Title } = Typography;
const FormItem = Form.Item;
const { Option } = Select;

function Index(props) {
    const {
        asyncGetEmployees, form, employees, asyncAdd, asyncGetShopList, shopList,
    } = props;
    const { getFieldDecorator, validateFieldsAndScroll } = form;
    const date = new Date();
    const name = JSON.parse(localStorage.getItem('userInfo')).username;
    useEffect(() => {
        asyncGetShopList();
    }, []);

    const onShopChange = (v) => {
        asyncGetEmployees({ shopCode: v });
    };

    const submit = () => {
        validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                const item1 = shopList.find((v) => { return v.shopCode === values.shopCode; });
                const item2 = employees.find((v) => { return v.jobNo === values.jobNo; });
                await asyncAdd({
                    ...values, shopName: item1.shopName, employeeName: item2.employeeName, operatorName: name,
                });
                window.history.back();
            }
        });
    };
    return (
        <div>
            <Title level={4}>收银员领取备用金</Title>
            <hr />
            <Form
                labelCol={
                    { span: 5 }
                }
                wrapperCol={
                    { span: 8 }
                }
            >
                <FormItem label="备用金领用日期">
                    {
                        getFieldDecorator('receiveDate', {
                            initialValue: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
                        })(
                            <Input disabled />,
                        )
                    }
                </FormItem>
                <FormItem label="金库操作员">
                    {
                        getFieldDecorator('operatorNo', {
                            initialValue: name,
                        })(
                            <Input disabled />,
                        )
                    }
                </FormItem>
                <FormItem label="门店">
                    {
                        getFieldDecorator('shopCode', {
                            initialValue: '',
                            rules: [
                                { required: true, message: '门店不能为空' },
                            ],
                        })(
                            <Select onChange={onShopChange}>
                                {shopList.map((v) => { return <Select.Option value={v.shopCode} key={v.shopCode}>{v.shopName}</Select.Option>; })}
                            </Select>,
                        )
                    }
                </FormItem>
                <FormItem label="收银员">
                    {
                        getFieldDecorator('jobNo', {
                            initialValue: '',
                            rules: [
                                { required: true, message: '收银员不能为空' },
                            ],
                        })(
                            <Select>
                                {employees.map((item) => {
                                    return <Option key={item.jobNo}>{item.employeeName}</Option>;
                                })}
                            </Select>,
                        )
                    }
                </FormItem>
                <FormItem label="领取金额">
                    {
                        getFieldDecorator('receiveAmount', {
                            rules: [
                                { required: true, message: '领取金额不能为空' },
                            ],
                        })(
                            <InputNumber />,
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
                            onClick={submit}
                        >确认领款</Button>
                        <Button
                            className="btn back"
                            onClick={() => {
                                window.history.back();
                            }}
                        >返回</Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
Index.propTypes = {
    asyncAdd: Proptypes.func,
    asyncGetEmployees: Proptypes.func,
    form: Proptypes.object,
    employees: Proptypes.array,
    asyncGetShopList: Proptypes.func,
    shopList: Proptypes.array,
};

Index.defaultProps = {
    asyncAdd: () => {},
    asyncGetEmployees: () => {},
    form: {},
    employees: [],
    asyncGetShopList: () => {},
    shopList: [],
};
const mapState = (state) => {
    return {
        initData: state.treasuryReceiveSpare.initData,
        searchData: state.treasuryReceiveSpare.searchData,
        page: state.treasuryReceiveSpare.page,
        loading: state.loading.effects.treasuryReceiveSpare.asyncAdd,
        shopList: state.common.shopList,
        employees: state.treasuryReceiveSpare.employees,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncAdd: dispatch.treasuryReceiveSpare.asyncAdd,
        clearData: dispatch.treasuryReceiveSpare.clearData,
        asyncGetEmployees: dispatch.treasuryReceiveSpare.asyncGetEmployees,
        asyncGetShopList: dispatch.common.asyncGetShopList,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(Index));
