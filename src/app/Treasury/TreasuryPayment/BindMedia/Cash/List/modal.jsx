import React from 'react';
import { connect } from 'react-redux';
import {
    Form, Modal, Select, InputNumber,
} from 'antd';
import Proptypes from 'prop-types';
import LabelValue from '../../../../../../components/LabelValue';

function Index(props) {
    const {
        visible, setVisible, form, data, asyncSave,
    } = props;
    const {
        saleDate, shopCode, shopName, withdrawType, withdrawAmount,
    } = data;
    const { getFieldDecorator, validateFields } = form;
    const col = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 9,
        },
    };
    const save = () => {
        validateFields((error, values) => {
            if (!error) {
                asyncSave({
                    saleDate, shopName, shopCode, ...values,
                });
            }
        });
    };
    return (
        <Modal
            visible={visible}
            title="投诉/提款处理"
            onCancel={() => {
                setVisible(false);
            }}
            onOk={save}
            okText="确认处理"
        >
            <Form>
                <Form.Item>
                    <LabelValue label="销售日期" value={saleDate} />
                    <LabelValue label="门店" value={shopName} />
                    <LabelValue label="已交现金金额" value={withdrawAmount} />
                    <LabelValue label="剩余可使用金额" value={withdrawType} />
                </Form.Item>
                <Form.Item {...col} label="业务类型">
                    {getFieldDecorator('withdrawType', {
                        rules: [
                            {
                                required: true,
                                message: '业务类型不能为空',
                            },
                        ],
                    })(
                        <Select>
                            <Select.Option value="1" key="1">
                                111
                            </Select.Option>
                        </Select>,
                    )}
                </Form.Item>
                <Form.Item {...col} label="所需现金金额">
                    {getFieldDecorator('withdrawAmount', {
                        rules: [
                            {
                                required: true,
                                message: '所需金额必须小于等于现金已交金额！',
                            },
                        ],
                    })(
                        <InputNumber />,
                    )}
                </Form.Item>
            </Form>
        </Modal>
    );
}
Index.propTypes = {
    asyncSave: Proptypes.func,
    visible: Proptypes.bool,
    form: Proptypes.object,
    data: Proptypes.object,
    searchData: Proptypes.object,
    setVisible: Proptypes.func,
};

Index.defaultProps = {
    asyncSave: () => {},
    visible: false,
    form: {},
    data: {},
    searchData: {},
    setVisible: () => {},
};
const mapState = (state) => {
    return {
        list: state.complaintWithdrawal.list,
        searchData: state.complaintWithdrawal.searchData,
        page: state.complaintWithdrawal.page,
        loading: state.loading.effects.complaintWithdrawal.asyncSave,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncSave: dispatch.complaintWithdrawal.asyncSave,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(Index));
