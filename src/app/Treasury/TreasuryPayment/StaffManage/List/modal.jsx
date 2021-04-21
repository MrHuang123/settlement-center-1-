import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
    Form, Modal, Select,
} from 'antd';
import Proptypes from 'prop-types';

function Index(props) {
    const {
        visible, setVisible, form, data, asyncSaveShopConfig, shopList, shopEmployees, type, asyncGetShopEmployees, asyncGetList,
    } = props;
    const { getFieldDecorator, validateFields } = form;
    useEffect(() => {
        asyncGetShopEmployees();
    }, []);
    const save = () => {
        validateFields(async (error, values) => {
            if (!error) {
                const item = shopList.find((v) => { return v.shopCode === values.shopCode; });
                const option = {
                    ...data, employeeId: type.employeeId, ...values, shopName: item.shopName,
                };
                if (type.id) {
                    option.id = type.id;
                }
                await asyncSaveShopConfig(option);
                setVisible(false);
                asyncGetList({ pageNo: 1, pageSize: 10 });
            }
        });
    };
    const col = {
        labelCol: {
            span: 7,
        },
        wrapperCol: {
            span: 9,
        },
    };
    return (
        <Modal
            visible={visible}
            title={`${type.employeeId ? '修改' : '新增'}金库人员`}
            onCancel={() => {
                setVisible(false);
            }}
            onOk={save}
        >
            <Form>
                {type.employeeId && <Form.Item {...col} label="配置对应金库人员">{shopEmployees.find((v) => { return v.employeeId === type.employeeId; }).employeeName}</Form.Item>}
                {!type.employeeId && <Form.Item {...col} label="配置对应金库人员">
                    {
                        getFieldDecorator('employeeId', {
                            initialValue: '',
                            rules: [
                                {
                                    required: true,
                                    message: '配置对应金库人员不能为空',
                                },
                            ],
                        })(
                            <Select>
                                {shopEmployees.map((v) => { return <Select.Option value={v.employeeId} key={v.employeeId}>{v.employeeName}</Select.Option>; })}
                            </Select>,
                        )
                    }
                </Form.Item>}
                <Form.Item {...col} label="请选择门店">
                    {
                        getFieldDecorator('shopCode', {
                            initialValue: '',
                            rules: [
                                {
                                    required: true,
                                    message: '所属门店不能为空',
                                },
                            ],
                        })(
                            <Select>
                                {shopList.map((v) => { return <Select.Option value={v.shopCode} key={v.shopCode}>{v.shopName}</Select.Option>; })}
                            </Select>,
                        )
                    }
                </Form.Item>
                <Form.Item {...col} label="生效标志">
                    {
                        getFieldDecorator('status', {
                            initialValue: '',
                            rules: [
                                {
                                    required: true,
                                    message: '生效标志不能为空',
                                },
                            ],
                        })(
                            <Select>
                                <Select.Option value={1} key="1">有效</Select.Option>
                                <Select.Option value={0} key="0">无效</Select.Option>
                            </Select>,
                        )
                    }
                </Form.Item>
            </Form>
        </Modal>
    );
}
Index.propTypes = {
    type: Proptypes.object,
    asyncGetShopEmployees: Proptypes.func,
    asyncSaveShopConfig: Proptypes.func,
    visible: Proptypes.bool,
    form: Proptypes.object,
    data: Proptypes.object,
    shopList: Proptypes.array,
    setVisible: Proptypes.func,
    shopEmployees: Proptypes.array,
    asyncGetList: Proptypes.func,
};

Index.defaultProps = {
    type: {},
    asyncGetShopEmployees: () => {},
    asyncSaveShopConfig: () => {},
    visible: false,
    form: {},
    data: {},
    shopList: [],
    setVisible: () => {},
    shopEmployees: [],
    asyncGetList: () => {},
};
const mapState = (state) => {
    return {
        shopList: state.common.shopList,
        shopEmployees: state.treasuryStaffManage.shopEmployees,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetShopEmployees: dispatch.treasuryStaffManage.asyncGetShopEmployees,
        asyncSaveShopConfig: dispatch.treasuryStaffManage.asyncSaveShopConfig,
        asyncGetList: dispatch.treasuryStaffManage.asyncGetList,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(Index));
