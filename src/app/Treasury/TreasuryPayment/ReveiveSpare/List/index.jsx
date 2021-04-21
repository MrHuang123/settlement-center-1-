/*
 * @Author: zhou.ying
 * @Date: 2021-03-26 15:37:41
 * @Last Modified by: zhou.ying
 * @Last Modified time: 2021-03-30 11:16:51
 */
import React, { Fragment, useEffect, useState } from 'react';
import { MakeCommonPage } from 'bnq-sys-react-component';
import { connect } from 'react-redux';
import { Form, Modal, Select } from 'antd';
import Proptypes from 'prop-types';
import { columnsOptions, searchOptions } from './options';
import { Tools } from '@/util/index';
import SingleTime from '@/components/SingleTime';

function List(props) {
    const {
        searchData,
        page,
        asyncGetList,
        loading,
        form,
        history,
        list,
        asyncGetShopList,
        asyncGetEmployees,
        asyncGetShopEmployees,
        shopList,
        employees,
        shopEmployees,
    } = props;
    const { getFieldDecorator, validateFieldsAndScroll, resetFields } = form;
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        asyncGetShopList();
        asyncGetShopEmployees();
        asyncGetList({ pageNo: 1, pageSize: 10 });
    }, []);
    const handleClick = (values) => {
        const {
            printDate, printShopCode, receiveDate, ...reset
        } = values;
        asyncGetList({
            ...reset,
            startDate: receiveDate && receiveDate[0] && receiveDate[0].format('YYYY-MM-DD'),
            endDate: receiveDate && receiveDate[1] && receiveDate[1].format('YYYY-MM-DD'),
            pageNo: 1,
            pageSize: 10,
        });
    };
    const onShopChange = (v) => {
        asyncGetEmployees({ shopCode: v });
    };
    const handleClickDate = () => {
        validateFieldsAndScroll((err, values) => {
            if (!err) {
                const item = shopList.find((v) => { return v.shopCode === values.printShopCode; });
                history.push({
                    pathname: '/treasury/payment/receivenew/print',
                    state: { ...values, shopName: item.shopName },
                });
            }
        });
    };
    const columns = Tools.genTableOptions(columnsOptions());
    const pagination = {
        showSizeChanger: true,
        onShowSizeChange: (current, pageSize) => {
            asyncGetList({
                ...searchData,
                pageNo: 1,
                pageSize,
            });
        },
        current: searchData.pageNo,
        total: page.total,
        pageSize: page.size,
        onChange: (nextPage) => {
            asyncGetList({
                ...searchData,
                pageNo: nextPage,
            });
        },
    };
    return (
        <Fragment>
            <Modal
                visible={visible}
                title="选择领取备用金日期"
                onOk={handleClickDate}
                onCancel={() => {
                    setVisible(false);
                }}
            >
                <Form labelCol={{ span: 8 }} wrapperCol={{ span: 12 }}>
                    <Form.Item label="选择打印日期">
                        {getFieldDecorator('printDate', {
                            initialValue: null,
                            rules: [{ required: visible, message: '打印日期不能为空' }],
                        })(<SingleTime />)}
                    </Form.Item>
                    <Form.Item label="选择门店">
                        {getFieldDecorator('printShopCode', {
                            initialValue: null,
                            rules: [{ required: visible, message: '门店不能为空' }],
                        })(<Select>
                            {shopList.map((v) => { return <Select.Option value={v.shopCode} key={v.shopCode}>{v.shopName}</Select.Option>; })}
                        </Select>)}
                    </Form.Item>
                </Form>
            </Modal>
            <MakeCommonPage
                form={form}
                tableLayout="fixed"
                selfSearchOptions={{
                    components: searchOptions({
                        shopList, onShopChange, employees, shopEmployees,
                    }),
                    btns: [
                        {
                            selfTypeName: 'search',
                        },
                        {
                            selfTypeName: 'reset',
                        },
                    ],
                    selfReset: () => {
                        resetFields();
                    },
                    selfSearch: handleClick,
                }}
                selfControlBtns={[
                    {
                        name: '收银员领取备用金',
                        handleClick: () => {
                            return history.push('/treasury/payment/receivenew');
                        },
                        type: 'primary',
                    },
                    {
                        name: '打印领款确认单',
                        handleClick: () => {
                            return setVisible(true);
                        },
                        type: 'primary',
                        style: { marginLeft: '12px' },
                    },
                ]}
                columns={columns}
                rowKey={(record) => {
                    return record.index;
                }}
                scroll={{ x: 'scroll' }}
                dataSource={list.map((item, index) => {
                    return {
                        ...item,
                        index: index + 1,
                    };
                })}
                pagination={pagination}
                loading={loading}
            />
        </Fragment>
    );
}
List.propTypes = {
    asyncGetList: Proptypes.func,
    page: Proptypes.object,
    list: Proptypes.array,
    form: Proptypes.object,
    searchData: Proptypes.object,
    loading: Proptypes.bool,
    history: Proptypes.object,
    asyncGetShopList: Proptypes.func,
    asyncGetEmployees: Proptypes.func,
    shopList: Proptypes.array,
    employees: Proptypes.array,
    asyncGetShopEmployees: Proptypes.func,
    shopEmployees: Proptypes.array,
};

List.defaultProps = {
    asyncGetList: () => {},
    page: {},
    list: [],
    form: {},
    searchData: {},
    loading: true,
    history: {},
    asyncGetShopList: () => {},
    asyncGetEmployees: () => {},
    shopList: [],
    employees: [],
    asyncGetShopEmployees: () => {},
    shopEmployees: [],
};
const mapState = (state) => {
    return {
        list: state.treasuryReceiveSpare.list,
        searchData: state.treasuryReceiveSpare.searchData,
        page: state.treasuryReceiveSpare.page,
        loading: state.loading.effects.treasuryReceiveSpare.asyncGetList,
        shopList: state.common.shopList,
        employees: state.treasuryStaffManage.employees,
        shopEmployees: state.treasuryStaffManage.shopEmployees,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetList: dispatch.treasuryReceiveSpare.asyncGetList,
        clearData: dispatch.treasuryReceiveSpare.clearData,
        asyncGetEmployees: dispatch.treasuryStaffManage.asyncGetEmployees,
        asyncGetShopList: dispatch.common.asyncGetShopList,
        asyncGetShopEmployees: dispatch.treasuryStaffManage.asyncGetShopEmployees,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
