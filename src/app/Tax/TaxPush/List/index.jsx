/* eslint-disable  */
import React from 'react';
import {
    MakeCommonPage,
} from 'bnq-sys-react-component';
import { connect } from 'react-redux';
import moment from 'moment';
import {
    Form,
    Button,
    Upload,
    message,
} from 'antd';
import Proptypes from 'prop-types';
import { columnsOptions } from './columns';
import { Tools } from '../../../../util/index';

class List extends React.Component {
    static propTypes = {
        initData: Proptypes.array,
        sysAllDictItems: Proptypes.object,
        loading: Proptypes.bool,
        getSysAllDictItems: Proptypes.func,
        searchData: Proptypes.object,
        page: Proptypes.object,
        form: Proptypes.object,
        asyncGetList: Proptypes.func,
    }

    static defaultProps = {
        initData: [],
        sysAllDictItems: {},
        loading: true,
        getSysAllDictItems: () => { },
        searchData: {},
        page: {},
        form: null,
        asyncGetList: () => { },
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
            getSysAllDictItems,
        } = this.props;
        getSysAllDictItems();
        asyncGetList({
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

    handleClick = (values) => {
        const { asyncGetList } = this.props;
        const send = {
            ...values,
            taxMonth:values.taxMonth?moment(values.taxMonth).format('YYYYMM'):'',
        };
        
        asyncGetList({
            ...send,
            pageNo: 1,
            pageSize: 10,
        });
    }

    handlePush = () => {
        const {
            selectKey,
            selectValue,
        }=this.state;
        const {
            asyncPush,
        }=this.props;
        let ids=selectKey.join();
        asyncPush({
            ids,
        }).then(data=>{
            if(data.success){
                message.success(data.message);
            }
        });
    }

    render() {
        const {
            searchData,
            page,
            asyncGetList,
            loading,
            form,
            initData,
            sysAllDictItems,
            asyncDown,
        } = this.props;
        const searchOptions = () => {
            return [
                {
                    selfname: '公司编码',
                    selfid: 'companyCode',
                    selftype: 'text',
                }, {
                    selfname: '纳税月份',
                    selfid: 'taxMonth',
                    selftype: 'datepicker',
                    selfDatePickerType: 'monthpicker',
                    format: 'YYYY/MM',
                    placeholder: '选择月份',
                }, {
                    selfname: '报表类型',
                    selfid: 'reportType',
                    selftype: 'searchSelect',
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfHasAll: { value: '', text: '请选择' },
                    selfOptions: sysAllDictItems.tax_type.map((item) => {
                        return {
                            id: item.value,
                            name: item.text,
                        };
                    }),
                }, {
                    selfname: '推送神州云状态',
                    selfid: 'pushFlag',
                    selftype: 'searchSelect',
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfHasAll: { value: '', text: '请选择' },
                    selfOptions: sysAllDictItems.declare_push_flag.map((item) => {
                        return {
                            id: item.value,
                            name: item.text,
                        };
                    }),
                },
            ];
        };

        const columns = Tools.genTableOptions(columnsOptions(sysAllDictItems));
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
        const uploadProps={
            name:'file',
            showUploadList:false,
            accept:'.zip,.xlsx',
            action: '/accm-web/tax/upload/zip',
            headers:{
                'X-Access-Token':localStorage.getItem('token'),
            },
            beforeUpload:(file)=>{
                const isJpgOrPng = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/x-zip-compressed';
                if (!isJpgOrPng) {
                    message.error('只能上传.xlsx或.zip文件类型');
                }
                return isJpgOrPng;
            },
            onChange: (e) => {
                if(e.file.response){
                    if(e.file.response.success){
                        message.success(e.file.response.message);
                    }else{
                        message.error(e.file.response.message);
                    }
                };
            },
        }
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
                        }, {
                            selfBtnNode:<React.Fragment>
                                <Upload {...uploadProps}>
                                    <Button>上传手工报表</Button>
                                </Upload>
                            </React.Fragment>
                        }, {
                            selfBtnName:'下载报表模板',
                            selfBtnCallback:()=>{
                                // 下载
                                asyncDown().then(data=>{
                                    if(data.success){
                                        // window.open(data.message,"_blank");
                                        let a = document.createElement('a');
                                        a.href = data.message;
                                        a.click();
                                    }
                                });
                            }
                        }],
                        selfReset: () => {
                            form.resetFields();
                        },
                        selfSearch: this.handleClick,
                        selfExport: this.handleExport,
                    }}
                    selfControlBtns={[{
                        name: '推送神州云',
                        handleClick: () => { this.handlePush(); },
                        type: 'primary',
                        style: { margin: '10px 12px 0 0' },
                        },
                    ]}
                    columns={columns}
                    size="small"
                    rowKey={(record) => {
                        return record.id;
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
                        type: 'checkbox',
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
        initData: state.taxPush.initData,
        sysAllDictItems: state.login.sysAllDictItems,
        searchData: state.taxPush.searchData,
        page: state.taxPush.page,
        loading: state.loading.effects.taxPush.asyncGetList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetList: dispatch.taxPush.asyncGetList,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
        asyncPush:dispatch.taxPush.asyncPush,
        asyncDown:dispatch.taxPush.asyncDown,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(List));
