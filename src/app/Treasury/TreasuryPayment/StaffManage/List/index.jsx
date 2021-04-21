/*
 * @Author: zhou.ying
 * @Date: 2021-03-26 15:38:04
 * @Last Modified by: zhou.ying
 * @Last Modified time: 2021-03-30 10:29:37
 */
import React, { Fragment, useState, useEffect } from 'react';
import { MakeCommonPage } from 'bnq-sys-react-component';
import { connect } from 'react-redux';
import { Form } from 'antd';
import Proptypes from 'prop-types';
import { columnsOptions, searchOptions } from './options';
import { Tools } from '@/util/index';
// eslint-disable-next-line import/extensions
import Modal from './modal.jsx';

function List(props) {
    const {
        searchData,
        page,
        asyncGetList,
        asyncGetShopList,
        asyncGetEmployees,
        loading,
        form,
        list,
        shopList,
        employees,
    } = props;
    const [type, setType] = useState({});
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        asyncGetShopList();
        asyncGetList({ pageNo: 1, pageSize: 10 });
    }, []);
    const handleClick = (values) => {
        const { jobNo, shopCode } = values;
        asyncGetList({
            jobNo,
            shopCode,
            pageNo: 1,
            pageSize: 10,
        });
    };
    const onShopChange = (v) => {
        asyncGetEmployees({ shopCode: v });
    };

    const columns = Tools.genTableOptions(columnsOptions({ setVisible, setType }));
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
            <MakeCommonPage
                divider="hr"
                form={form}
                tableLayout="fixed"
                selfSearchOptions={{
                    components: searchOptions({ shopList, onShopChange, employees }),
                    btns: [
                        {
                            selfTypeName: 'search',
                        },
                        {
                            selfTypeName: 'reset',
                        },
                    ],
                    selfReset: () => {
                        form.resetFields();
                    },
                    selfSearch: handleClick,
                }}
                selfControlBtns={[
                    {
                        name: '配置员工所属门店',
                        handleClick: () => {
                            setVisible(true);
                            setType('新增');
                        },
                        type: 'primary',
                    },
                ]}
                columns={columns}
                rowKey={(record) => { return record.index; }}
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
            <Modal
                visible={visible}
                setVisible={setVisible}
                type={type}
            />
        </Fragment>
    );
}

List.propTypes = {
    asyncGetList: Proptypes.func,
    asyncGetShopList: Proptypes.func,
    asyncGetEmployees: Proptypes.func,
    page: Proptypes.object,
    list: Proptypes.array,
    form: Proptypes.object,
    searchData: Proptypes.object,
    loading: Proptypes.bool,
    shopList: Proptypes.array,
    employees: Proptypes.array,
};

List.defaultProps = {
    asyncGetList: () => {},
    asyncGetShopList: () => {},
    asyncGetEmployees: () => {},
    page: {},
    list: [],
    form: {},
    searchData: {},
    loading: true,
    shopList: [],
    employees: [],
};
const mapState = (state) => {
    return {
        list: state.treasuryStaffManage.list,
        searchData: state.treasuryStaffManage.searchData,
        page: state.treasuryStaffManage.page,
        loading: state.loading.effects.treasuryStaffManage.asyncGetList,
        shopList: state.common.shopList,
        employees: state.treasuryStaffManage.employees,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetList: dispatch.treasuryStaffManage.asyncGetList,
        asyncGetEmployees: dispatch.treasuryStaffManage.asyncGetEmployees,
        asyncGetShopList: dispatch.common.asyncGetShopList,
        clearData: dispatch.treasuryStaffManage.clearData,
        asyncSaveShopConfig: dispatch.treasuryStaffManage.asyncSaveShopConfig,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
