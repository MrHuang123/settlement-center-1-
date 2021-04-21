/*
 * @Author: zhou.ying
 * @Date: 2021-03-30 10:42:24
 * @Last Modified by: zhou.ying
 * @Last Modified time: 2021-03-30 14:03:29
 */

import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Table, Typography, Descriptions, Button,
} from 'antd';
import { columnsOptions } from './options';
import { Tools } from '@/util/index';

const { Title } = Typography;

function Index(props) {
    const {
        asyncGetDetail, initData, location,
    } = props;
    const {
        shopCode, saleDate, shopName, shopBalenceAmount, shopShouldRecieve, shopHandedAmount,
    } = location.state;
    useEffect(() => {
        asyncGetDetail({ shopCode, saleDate });
    }, []);
    return (
        <Fragment>
            <Title level={4}>门店交款日汇总明细</Title>
            <hr />
            <Descriptions>
                <Descriptions.Item label="门店">{shopName}</Descriptions.Item>
                <Descriptions.Item label="销售日期">{saleDate}</Descriptions.Item>
                <Descriptions.Item label="汇总差额">{shopBalenceAmount}</Descriptions.Item>

                <Descriptions.Item label="已交总额">{shopHandedAmount}</Descriptions.Item>
                <Descriptions.Item label="应收总金额">{shopShouldRecieve}</Descriptions.Item>
            </Descriptions>
            <hr />
            <Table
                columns={columnsOptions()}
                dataSource={initData.exchequernShopDeliveryDetailVOS
                    && initData.exchequernShopDeliveryDetailVOS.map((item, index) => {
                        return {
                            ...item,
                            index: index + 1,
                        };
                    })}
                pagination={false}
                bordered
            />
            <div className="bottom-btn-div">
                <Button
                    className="btn back"
                    onClick={() => {
                        window.history.back();
                    }}
                >返回</Button>
                <Button
                    className="btn save"
                    type="primary"
                    onClick={() => { return Tools.print('ant-layout-content'); }}
                >打印</Button>
            </div>
        </Fragment>
    );
}

Index.propTypes = {
    initData: PropTypes.object,
    asyncGetDetail: PropTypes.func,
    location: PropTypes.object,
};
Index.defaultProps = {
    initData: {},
    asyncGetDetail: () => {},
    location: {},
};

const mapState = (state) => {
    return {
        initData: state.summaryPaymentDate.initData,
        searchData: state.summaryPaymentDate.searchData,
        page: state.summaryPaymentDate.page,
        loading: state.loading.effects.summaryPaymentDate.asyncGetList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetDetail: dispatch.summaryPaymentDate.asyncGetDetail,
        clearData: dispatch.summaryPaymentDate.clearData,
    };
};

export default connect(mapState, mapDispatch)(withRouter(Index));
