import React from 'react';
import { MakeCommonPage } from 'bnq-sys-react-component';
import { connect } from 'react-redux';
import {
    Form,
    Modal,
    message,
    Row,
    Col,
    Input,
} from 'antd';
import Proptypes from 'prop-types';
import { columnsOptions } from './columns';
import { Tools } from '../../../../../util/index';

class List extends React.Component {
    static propTypes = {
        initData: Proptypes.array,
        // sysAllDictItems: Proptypes.object,
        loading: Proptypes.bool,
        // getSysAllDictItems: Proptypes.func,
        searchData: Proptypes.object,
        page: Proptypes.object,
        form: Proptypes.object,
        asyncReset: Proptypes.func,
        asyncGetList: Proptypes.func,
        clearData: Proptypes.func,
    }

    static defaultProps = {
        initData: [],
        // sysAllDictItems: {},
        loading: true,
        // getSysAllDictItems: () => { },
        searchData: {},
        page: {},
        form: null,
        asyncReset: () => { },
        asyncGetList: () => { },
        clearData: () => { },
    }

    constructor(props) {
        super(props);
        this.state = {
            selectValue: [],
            selectKey: [],
        };
    }

    componentDidMount() {
        const {
            asyncGetList,
            // getSysAllDictItems,
        } = this.props;
        // getSysAllDictItems();
        asyncGetList({
            pageNo: 1,
            pageSize: 10,
        });
    }

    componentWillUnmount() {
        const {
            clearData,
        } = this.props;
        clearData();
    }

    handleClick = (values) => {
        const { asyncGetList } = this.props;
        // const send = {
        // ...values,
        // payDateStart: values.dateCreated && values.dateCreated[0] && values.dateCreated[0].format('YYYY-MM-DD'),
        // payDateEnd: values.dateCreated && values.dateCreated[1] && values.dateCreated[1].format('YYYY-MM-DD'),
        // };
        // delete send.dateCreated;
        asyncGetList({
            ...values,
            pageNo: 1,
            pageSize: 10,
        });
    }

    handleChange = (key, value) => {
        this.setState({
            selectValue: value,
            selectKey: key,
        });
    }

    handleRet = () => {
        const {
            selectValue,
        } = this.state;
        const {
            asyncGetList,
        } = this.props;
        if (selectValue.length === 0) {
            message.error('请选择参数');
        } else {
            // 重要
            this.setState({
                param: selectValue[0].fee,
            });
            Modal.confirm({
                title: '修改参数',
                width: '35%',
                content: <React.Fragment>
                    <hr />
                    <Row gutter={[0, 20]}>
                        <Col span={6}>
                            <span>特征码:</span>
                        </Col>
                        <Col span={14}>
                            <span>{selectValue[0].signCode}</span>
                        </Col>
                        <Col span={6}>
                            <span>参数名称:</span>
                        </Col>
                        <Col span={14}>
                            <span>{selectValue[0].feeName}</span>
                        </Col>
                        <Col span={6}>
                            <span>参数值:</span>
                        </Col>
                        <Col span={14}>
                            <Input
                                onChange={(e) => {
                                    this.setState({
                                        param: e.target.value,
                                    });
                                }}
                                defaultValue={selectValue[0].fee}
                            />
                        </Col>
                    </Row>
                </React.Fragment>,
                okText: '提交保存',
                onOk: () => {
                    const {
                        asyncReset,
                    } = this.props;
                    // eslint-disable-next-line no-useless-escape
                    const reg = /^[0-9]*([\.][0-9]{1,3})?$/;
                    return new Promise((resolve, reject) => {
                        if (reg.test(this.state.param)) {
                            asyncReset({
                                id: selectValue[0].id,
                                fee: this.state.param,
                                signCode: selectValue[0].signCode,
                            }).then((data) => {
                                if (data.success) {
                                    message.success('修改参数成功');
                                    resolve();
                                    asyncGetList({
                                        pageNo: 1,
                                        pageSize: 10,
                                    });
                                    this.setState({
                                        selectValue: [],
                                        selectKey: [],
                                    });
                                } else {
                                    reject();
                                    message.error(data.message);
                                }
                            });
                        } else {
                            reject();
                            message.error('请输入正确的参数值', 1);
                        }
                    });
                },
            });
        }
    }

    render() {
        const {
            searchData,
            page,
            asyncGetList,
            loading,
            form,
            initData,
        } = this.props;
        const searchOptions = () => {
            return [{
                selfname: '特征码',
                selfid: 'signCode',
                selftype: 'text',
            }];
        };

        const columns = Tools.genTableOptions(columnsOptions());
        // eslint-disable-next-line no-unused-vars
        let width = 0;
        columns.forEach((item) => {
            if (item.width) {
                width += item.width;
            } else {
                width += 120;
            }
        });
        const pagination = {
            showSizeChanger: true,
            onShowSizeChange: (current, pageSize) => {
                asyncGetList({
                    ...searchData,
                    pageNo: 1,
                    pageSize,
                });
                this.setState({
                    selectValue: [],
                    selectKey: [],
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
                this.setState({
                    selectValue: [],
                    selectKey: [],
                });
            },
        };
        return (
            <div>
                <MakeCommonPage
                    divider="hr"
                    form={form}
                    tableLayout="fixed"
                    selfSearchOptions={{
                        components: searchOptions(),
                        btns: [{
                            selfTypeName: 'search',
                        }, {
                            selfTypeName: 'reset',
                        }],
                        selfReset: () => {
                            form.resetFields();
                        },
                        selfSearch: this.handleClick,
                        selfExport: this.handleExport,
                    }}
                    selfControlBtns={[{
                        name: '修改',
                        handleClick: this.handleRet,
                        type: 'primary',
                        style: { margin: '10px 12px 0 0' },
                    }]}
                    columns={columns}
                    size="small"
                    rowKey={(record) => {
                        return `${record.id}`;
                    }}
                    scroll={{ x: 'scroll' }}
                    dataSource={initData.map((item, index) => {
                        return {
                            ...item,
                            index: index + 1,
                        };
                    })}
                    pagination={pagination}
                    loading={loading}
                    rowSelection={{
                        type: 'radio',
                        onChange: this.handleChange,
                        selectedRowKeys: this.state.selectKey,
                    }}
                />
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        initData: state.param.initData,
        // sysAllDictItems: state.login.sysAllDictItems,
        searchData: state.param.searchData,
        page: state.param.page,
        loading: state.loading.effects.param.asyncGetList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetList: dispatch.param.asyncGetList,
        // getSysAllDictItems: dispatch.login.getSysAllDictItems,
        asyncReset: dispatch.param.asyncReset,
        clearData: dispatch.param.clearData,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
