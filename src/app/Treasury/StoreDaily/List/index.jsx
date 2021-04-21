/*
 * @Author: zhou.ying
 * @Date: 2021-03-26 15:36:58
 * @Last Modified by: zhou.ying
 * @Last Modified time: 2021-03-30 16:19:34
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
        asyncGetList({
            ...values,
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
        list: state.storeDaily.list,
        searchData: state.storeDaily.searchData,
        page: state.storeDaily.page,
        loading: state.loading.effects.storeDaily.asyncGetList,
        shopList: state.common.shopList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetList: dispatch.storeDaily.asyncGetList,
        asyncGetShopList: dispatch.common.asyncGetShopList,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
