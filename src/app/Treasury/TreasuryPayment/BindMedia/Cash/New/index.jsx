import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    Form,
    Descriptions,
    Typography,
    Button,
    Row,
    Col,
    Table,
    Modal,
    message,
} from 'antd';
import { Tools } from '@/util/index';
import Proptypes from 'prop-types';
import './index.less';
import ModalReset from './Component/ModalReset';
import ModalNew from './Component/ModalNew';
import ModalDetail from './Component/ModalDetail';

@withRouter
class Detail extends React.Component {
    static propTypes = {
        clearData: Proptypes.func,
        loading: Proptypes.bool,
        asyncGetDetailList: Proptypes.func,
        asyncQueryAccountByShopCode: Proptypes.func,
        match: Proptypes.object,
        asyncDelIncome: Proptypes.func,
        setData: Proptypes.func,
        asyncGetUrl: Proptypes.func,
        detailList: Proptypes.array,
    }

    static defaultProps = {
        clearData: () => { },
        loading: true,
        asyncGetDetailList: () => { },
        asyncQueryAccountByShopCode: () => { },
        match: {},
        asyncDelIncome: () => { },
        setData: () => { },
        asyncGetUrl: () => { },
        detailList: [],
    }

    constructor(props) {
        super(props);
        this.state = {
            selectValue: [],
            selectkey: [],
            showModalReset: false,
            showModalNew: false,
            showModalDetail: false,
            // eslint-disable-next-line react/no-unused-state
            data: {
                imageUrl: [],
            },
        };
    }

    componentDidMount() {
        const {
            // getSysAllDictItems,
            asyncGetDetailList,
            asyncQueryAccountByShopCode,
        } = this.props;
        asyncGetDetailList({
            receiptId: this.props.match.params.id,
        });
        asyncQueryAccountByShopCode({
            shopCode: this.props.match.params.shopCode,
        });
    }

    componentWillUnmount() {
        const {
            clearData,
        } = this.props;
        clearData();
    }

    handleChange = (key, value) => {
        this.setState({
            selectValue: value,
            selectkey: key,
        });
    }

    handleModal = (type) => {
        const { selectValue } = this.state;
        const {
            asyncDelIncome,
            asyncGetDetailList,
            setData,
        } = this.props;
        if (type === 'new') {
            this.setState({
                showModalNew: true,
            });
            setData({
                imageUrl: [],
            });
        } else if (type === 'del') {
            // ??????
            Modal.confirm({
                title: '???????????????',
                content: `???????????????????????????????????????`,
                onOk: () => {
                    asyncDelIncome({
                        id: selectValue[0].id,
                    }).then((data) => {
                        if (data.success) {
                            asyncGetDetailList({
                                receiptId: this.props.match.params.id,
                            });
                        } else {
                            message.error(data.message);
                        }
                    });
                },
            });
        } else if (type === 'reset') {
            new Promise((res, rej) => {
                const {
                    asyncGetUrl,
                } = this.props;
                let result = '';
                asyncGetUrl({ fileName: this.state.selectValue[0].imageUrl }).then((data) => {
                    if (data.success) {
                        result = data.message;
                        res(result);
                    }
                    rej('');
                });
            }).then((result) => {
                setData({
                    ...this.state.selectValue[0],
                    imageUrl: [{
                        // ????????????url??????????????????
                        url: result,
                        uid: '888',
                    }],
                });
                this.setState({
                    showModalReset: true,
                });
            });
        } else if (type === 'detail') {
            new Promise((res, rej) => {
                const {
                    asyncGetUrl,
                } = this.props;
                let result = '';
                asyncGetUrl({ fileName: this.state.selectValue[0].imageUrl }).then((data) => {
                    if (data.success) {
                        result = data.message;
                        res(result);
                    }
                    rej('');
                });
            }).then((data) => {
                setData({
                    ...this.state.selectValue[0],
                    imageUrl: [{
                        // ????????????url??????????????????
                        url: data,
                        uid: '888',
                    }],
                });
                this.setState({
                    showModalDetail: true,
                });
            });
        }
    }

    showDict = (arr, code) => {
        if (arr) {
            // eslint-disable-next-line no-restricted-syntax
            for (const v of arr) {
                // eslint-disable-next-line eqeqeq
                if (v.value == code) {
                    return v.title;
                }
            }
        } else {
            return '';
        }
        return '';
    }

    render() {
        const columnsOptions = () => {
            return [
                {
                    name: '??????',
                    dataindex: 'index',
                }, {
                    name: '?????????',
                    dataindex: 'imageUrl',
                    render: (text) => {
                        return <span
                            style={{ color: 'blue', cursor: 'pointer' }}
                            onClick={() => {
                                new Promise((res, rej) => {
                                    const {
                                        asyncGetUrl,
                                    } = this.props;
                                    let result = '';
                                    asyncGetUrl({ fileName: text }).then((data) => {
                                        if (data.success) {
                                            result = data.message;
                                            res(result);
                                        }
                                        rej('');
                                    });
                                }).then((result) => {
                                    window.open(result);
                                });
                            }}
                        >???????????????</span>;
                    },
                }, {
                    name: '???????????????',
                    dataindex: 'depositCode',
                    width: 180,
                }, {
                    name: '???????????????',
                    dataindex: 'default',
                    render: () => {
                        return (
                            <span>???????????????</span>
                        );
                    },
                }, {
                    name: '????????????',
                    width: 180,
                    dataindex: 'accountNo',
                }, {
                    name: '????????????',
                    dataindex: 'accountName',
                    width: 180,
                }, {
                    name: '????????????',
                    dataindex: 'depositAmount',
                },
            ];
        };
        const {
            detailList,
            loading,
            // sysAllDictItems,
        } = this.props;
        const columns = Tools.genTableOptions(columnsOptions());
        let width = 0;
        columns.forEach((item) => {
            if (item.width) {
                width += item.width;
            } else {
                width += 120;
            }
        });
        const btnStyle = {
            marginRight: '20px',
        };
        let total = 0;
        detailList.forEach((element) => {
            total += element.depositAmount;
        });
        return (
            <div>
                <ModalReset
                    domProps={{
                        visible: this.state.showModalReset,
                        onCancel: () => {
                            this.setState({
                                showModalReset: false,
                            });
                        },
                        width: '60%',
                        destroyOnClose: true,
                    }}
                    that={this}
                />
                <ModalDetail
                    domProps={{
                        visible: this.state.showModalDetail,
                        onCancel: () => {
                            this.setState({
                                showModalDetail: false,
                            });
                        },
                        width: '60%',
                        destroyOnClose: true,
                    }}
                    that={this}
                />
                <ModalNew
                    domProps={{
                        visible: this.state.showModalNew,
                        onCancel: () => {
                            this.setState({
                                showModalNew: false,
                            });
                        },
                        width: '60%',
                        destroyOnClose: true,
                    }}
                    that={this}
                />
                <Typography.Title level={4}>???????????????</Typography.Title>
                <Descriptions>
                    <Descriptions.Item label="????????????">??????</Descriptions.Item>
                    <Descriptions.Item label="????????????">{this.props.match.params.createDate}</Descriptions.Item>
                    <Descriptions.Item label="???????????????">{this.props.match.params.receivablesAmount}</Descriptions.Item>
                </Descriptions>
                <div className="count" style={{ marginTop: '20px' }}>
                    <div>
                        <Button
                            style={btnStyle}
                            onClick={() => { this.handleModal('new'); }}
                        >???????????????</Button>
                        <Button
                            style={btnStyle}
                            onClick={() => { this.handleModal('del'); }}
                        >???????????????</Button>
                        <Button
                            style={btnStyle}
                            onClick={() => {
                                if (this.state.selectValue.length === 1) {
                                    this.handleModal('reset');
                                } else {
                                    message.warning('?????????1????????????');
                                }
                            }}
                        >??????</Button>
                        <Button
                            style={btnStyle}
                            onClick={() => {
                                if (this.state.selectValue.length !== 1) {
                                    message.warning('?????????1????????????');
                                } else {
                                    this.handleModal('detail');
                                }
                            }}
                        >??????</Button>
                    </div>
                    <div>
                        <span>???????????????????????????<span style={{ color: 'red' }}>{total}</span> ???</span>
                    </div>
                </div>
                <Table
                    dataSource={detailList.map((item, index) => {
                        return {
                            ...item,
                            index: index + 1,
                        };
                    })}
                    rowKey={(record) => {
                        return `${record.id}`;
                    }}
                    rowSelection={{
                        type: 'radio',
                        onChange: this.handleChange,
                        selectedRowKeys: this.state.selectkey,
                    }}
                    columns={columns}
                    scroll={{ x: width }}
                    loading={loading}
                    pagination={false}
                />
                <Row gutter={30}>
                    <Col span={12}>
                        <div className="bottom-btn-div" style={{ marginTop: '20px' }}>
                            <Button
                                style={{ margin: '0 auto' }}
                                onClick={() => {
                                    window.close();
                                }}
                            >??????</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        detailList: state.bindMediaCashList.detailList,
        detail: state.BindIncomeVerifyNew.detail,
        sysAllDictItems: state.login.sysAllDictItems,
        data: state.BindIncomeVerifyNew.data,
        // eslint-disable-next-line max-len
        loading: state.loading.effects.BindIncomeVerifyNew.asyncGetUrl || state.loading.effects.BindIncomeVerifyNew.asyncGetDetailList || state.loading.effects.BindIncomeVerifyNew.asyncQueryAccountByShopCode,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncDelIncome: dispatch.BindIncomeVerifyNew.asyncDelIncome,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
        clearData: dispatch.BindIncomeVerifyNew.clearData,

        asyncGetDetailList: dispatch.bindMediaCashList.asyncGetDetailList,
        asyncQueryAccountByShopCode: dispatch.BindIncomeVerifyNew.asyncQueryAccountByShopCode,
        setData: dispatch.BindIncomeVerifyNew.setData,
        asyncGetUrl: dispatch.BindIncomeVerifyNew.asyncGetUrl,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(Detail));
