/*
 * @Author: zhou.ying
 * @Date: 2021-03-26 15:37:20
 * @Last Modified by: zhou.ying
 * @Last Modified time: 2021-03-30 14:01:29
 */
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Table, Typography, Button, Descriptions,
} from 'antd';
// eslint-disable-next-line import/extensions
import { columns } from './option.jsx';
import '../index.less';

const { Title } = Typography;

function Index(props) {
    const {
        asyncGetDetail, initData, location,
    } = props;
    const {
        shopCode, reportDate, shopName, totalShouldRecieve,
    } = location.state;
    useEffect(() => {
        asyncGetDetail({ shopCode, reportDate });
    }, []);
    const tables = [];
    if (initData.length) {
        for (let j = 0; j < initData.length; j++) {
            const data = initData[j].exchequernShopReportDetails;
            const max = initData[j].exchequernShopReportDetails.length;
            data.push({
                psid: max + 1,
                psname: '合计',
                posShouldRecieve: initData[j].totalShouldRecieve,
                handedAmount: initData[j].totalHanded,
                contraError: initData[j].totalErrorMoney,
                fillingAmount: initData[j].totalOwnMoney,
                appropriateAmount: initData[j].totalPickUpMoney,
                balence: initData[j].totalBanlence,
                otherMoney: initData[j].totalOtherMoney,
                channelMoney: initData[j].totalChannelMoney,
                errorMoney: initData[j].totalThirdBalenceMoney,
            });
            data.push({ psid: max + 2, psname: '金库交款总额', posShouldRecieve: initData[j].totalHanded });
            data.push({
                psid: max + 3,
                psname: '直连应收总额（不含手续费）',
                posShouldRecieve: initData[j].totalOtherMoney,
            });
            data.push({ psid: max + 4, psname: '汇总差额', posShouldRecieve: initData[j].totalBanlence });
            data.push({ psid: max + 5, psname: '当日应收总额', posShouldRecieve: initData[j].totalShouldRecieveToday });
            tables.push({ data, max });
        }
    }
    return (
        <Fragment>
            <Title level={4}>门店日报详情</Title>
            <hr />
            <Descriptions>
                <Descriptions.Item label="报表时间">{reportDate}</Descriptions.Item>
                <Descriptions.Item label="门店">{shopName}</Descriptions.Item>
                <Descriptions.Item label="应收总金额">{totalShouldRecieve}</Descriptions.Item>
            </Descriptions>
            <hr />
            {tables.map((v) => {
                return <Table
                    columns={columns({ max: v.max })}
                    dataSource={v.data}
                    pagination={false}
                    bordered
                />;
            })}
            <div className="bottom-btn-div">
                <Button
                    className="btn back"
                    onClick={() => {
                        window.history.back();
                    }}
                >返回</Button>
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
        initData: state.storeDaily.initData,
        searchData: state.storeDaily.searchData,
        page: state.storeDaily.page,
        loading: state.loading.effects.storeDaily.asyncGetList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetDetail: dispatch.storeDaily.asyncGetDetail,
        clearData: dispatch.storeDaily.clearData,
    };
};

export default connect(mapState, mapDispatch)(withRouter(Index));
