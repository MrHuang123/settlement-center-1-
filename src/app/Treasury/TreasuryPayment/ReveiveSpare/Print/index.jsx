/*
 * @Author: zhou.ying
 * @Date: 2021-03-26 15:37:55
 * @Last Modified by: zhou.ying
 * @Last Modified time: 2021-03-29 17:52:22
 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import {
    Descriptions,
    Typography,
    Row,
    Col,
    Button,
    Table,
} from 'antd';
import { Tools } from '@/util/index';
import { columnsOptions } from './columns';

const { Title } = Typography;
function Print(props) {
    const {
        asyncGetList, location, list,
    } = props;
    useEffect(() => {
        asyncGetList(location.state);
    }, []);
    const { printDate, shopName } = location.state;
    const name = JSON.parse(localStorage.getItem('userInfo')).username;
    return (
        <div>
            <section className="printcontent">
                <Title level={4}>打印备用金领取确认单</Title>
                <hr />
                <Descriptions>
                    <Descriptions.Item label="备用金日期">{printDate}</Descriptions.Item>
                    <Descriptions.Item label="门店">{shopName}</Descriptions.Item>
                    <Descriptions.Item label="金库操作员">{name}</Descriptions.Item>
                </Descriptions>
                <Row>
                    <Col span={24}>
                        <Table
                            columns={Tools.genTableOptions(columnsOptions())}
                            dataSource={list.map((item, index) => {
                                return {
                                    ...item,
                                    index: index + 1,
                                };
                            })}
                            scroll={{ x: 'max-content' }}
                            pagination={false}
                        />
                    </Col>
                </Row>
            </section>
            <Row gutter={[20, 30]}>
                <Col span={12}>
                    <div className="bottom-btn-div">
                        <Button
                            className="btn save"
                            type="primary"
                            onClick={() => { return Tools.print('printcontent'); }}
                        >打印</Button>
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
Print.propTypes = {
    asyncGetList: Proptypes.func,
    asyncGetEmployees: Proptypes.func,
    location: Proptypes.object,
    employees: Proptypes.array,
    asyncGetShopList: Proptypes.func,
    list: Proptypes.array,
};

Print.defaultProps = {
    asyncGetList: () => {},
    asyncGetEmployees: () => {},
    location: {},
    employees: [],
    asyncGetShopList: () => {},
    list: [],
};
const mapState = (state) => {
    return {
        list: state.treasuryReceiveSpare.list,
        searchData: state.treasuryReceiveSpare.searchData,
        page: state.treasuryReceiveSpare.page,
        loading: state.loading.effects.treasuryReceiveSpare.asyncGetList,
        employees: state.treasuryReceiveSpare.employees,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetList: dispatch.treasuryReceiveSpare.asyncGetList,
        clearData: dispatch.treasuryReceiveSpare.clearData,
        asyncGetEmployees: dispatch.treasuryReceiveSpare.asyncGetEmployees,
        asyncGetShopList: dispatch.common.asyncGetShopList,
    };
};
export default connect(mapState, mapDispatch)(Print);
