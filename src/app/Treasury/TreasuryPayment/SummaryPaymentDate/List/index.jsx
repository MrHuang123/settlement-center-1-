/*
 * @Author: zhou.ying
 * @Date: 2021-03-26 15:36:58
 * @Last Modified by: zhou.ying
 * @Last Modified time: 2021-03-30 10:47:12
 */
import React, { useEffect } from 'react';
import { MakeCommonPage } from 'bnq-sys-react-component';
import { connect } from 'react-redux';
import { Form } from 'antd';
import Proptypes from 'prop-types';
import { columnsOptions, searchOptions } from './options';
import { Tools } from '@/util/index';

function List(props) {
    const {
        searchData, page, asyncGetList, loading, form, list, asyncGetShopList, shopList,
    } = props;
    useEffect(() => {
        asyncGetShopList();
        asyncGetList({ pageNo: 1, pageSize: 10 });
    }, []);

    const handleClick = (values) => {
        const { saleDate } = values;
        asyncGetList({
            ...values,
            saleStartDate: saleDate && saleDate[0] && saleDate[0].format('YYYY-MM-DD'),
            saleEndDate: saleDate && saleDate[1] && saleDate[1].format('YYYY-MM-DD'),
            saleDate: undefined,
            pageNo: 1,
            pageSize: 10,
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
        <MakeCommonPage
            form={form}
            tableLayout="fixed"
            selfSearchOptions={{
                components: searchOptions({ shopList }),
                btns: [{
                    selfTypeName: 'search',
                }, {
                    selfTypeName: 'reset',
                }],
                selfReset: () => {
                    form.resetFields();
                },
                selfSearch: handleClick,
            }}
            columns={columns}
            size="small"
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
    );
}
List.propTypes = {
    asyncGetList: Proptypes.func,
    page: Proptypes.object,
    form: Proptypes.object,
    list: Proptypes.array,
    searchData: Proptypes.object,
    loading: Proptypes.bool,
    asyncGetShopList: Proptypes.func,
    shopList: Proptypes.array,
};

List.defaultProps = {
    asyncGetList: () => {},
    page: {},
    form: {},
    list: [],
    searchData: {},
    loading: true,
    asyncGetShopList: () => {},
    shopList: [],
};
const mapState = (state) => {
    return {
        list: state.summaryPaymentDate.list,
        searchData: state.summaryPaymentDate.searchData,
        page: state.summaryPaymentDate.page,
        loading: state.loading.effects.summaryPaymentDate.asyncGetList,
        shopList: state.common.shopList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetList: dispatch.summaryPaymentDate.asyncGetList,
        asyncGetShopList: dispatch.common.asyncGetShopList,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
