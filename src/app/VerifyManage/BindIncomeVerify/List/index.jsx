/* eslint-disable */
import React from 'react';
import { MakeCommonPage } from 'bnq-sys-react-component';
import { connect } from 'react-redux';
import {
    Form,
    message,
} from 'antd';
import Proptypes from 'prop-types';
import { columnsOptions } from './columns';
import { Tools } from '../../../../util';
import './index.less';
import ModalNew from './Component/ModalNew';

class Process extends React.Component {
    static propTypes = {
        initData: Proptypes.array,
        asyncGetList: Proptypes.func,
        sysAllDictItems: Proptypes.object,
        loading: Proptypes.bool,
        getSysAllDictItems: Proptypes.func,
        searchData: Proptypes.object,
        page: Proptypes.object,
        form: Proptypes.object,
    }

    static defaultProps = {
        initData: [],
        asyncGetList: () => { },
        sysAllDictItems: {},
        loading: true,
        getSysAllDictItems: () => { },
        searchData: {},
        page: {},
        form: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            selectValue:[],
            selectKey:[],
            showModal:false,
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

    handleClick = (values) => {
        const { asyncGetList } = this.props;
        const send = {
            ...values,
            startRecordTime: values.dateCreated && values.dateCreated[0] && values.dateCreated[0].format('YYYY-MM-DD'),
            endRecordTime: values.dateCreated && values.dateCreated[1] && values.dateCreated[1].format('YYYY-MM-DD'),
        };
        delete send.dateCreated;
        asyncGetList({
            ...send,
            pageNo: 1,
            pageSize: 10,
        });
    }

    handleModal=(type,record)=>{
        const { toggle,setModalType }=this.props;
        const { selectValue } = this.state;
        if(type==='check'){
            if (selectValue.length < 1) {
                message.error('请选择需要查看的进账单');
                return;
            }else{
                setModalType(type,selectValue);
                toggle();
            }
        }else{
            setModalType(type,[record]);
            toggle();
        }
    };

    handleChange = (key, value) => {
        this.setState({
            selectValue: value,
            selectKey:key,
        });
    }

    clear = () => {
        const {
            asyncGetList,
        } = this.props;
        this.setState({
            selectKey: [],
            selectValue: [],
        });
        asyncGetList({
            pageNo: 1,
            pageSize: 10,
        });
    }

    render() {
        const {
            sysAllDictItems,
            searchData,
            page,
            asyncGetList,
            loading,
            form,
            initData,
        } = this.props;
        const searchOptions = () => {
            return [
                {
                    selfname: '提交审核日期',
                    selfid: 'dateCreated',
                    selftype: 'datepicker',
                    selfDatePickerType: 'rangepicker',
                    format: 'YYYY/MM/DD',
                }, {
                    selfname: '审核状态',
                    selftype: 'searchSelect',
                    selfid: 'examineStatus',
                    selfFieldOptions: {
                        initialValue: '',
                    },
                    selfHasAll: { value: '', text: '请选择' },
                    selfOptions: sysAllDictItems.check_status,
                    selfMaps: { id: ['value'], name: ['title'] },
                }
            ];
        };
        const columns = Tools.genTableOptions(columnsOptions(sysAllDictItems,this.handleModal));
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
                this.setState({
                    selectKey:[],
                    selectValue:[],
                });
            },
        };
        return (
            <div>
                <ModalNew clear={this.clear} />
                <MakeCommonPage
                    divider="true"
                    form={form}
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
                    columns={columns}
                    size="small"
                    rowKey={(record) => {
                        return `${record.billCode}`;
                    }}
                    scroll={{ x: width }}
                    dataSource={initData}
                    pagination={pagination}
                    loading={loading}
                    selfControlBtns={[{
                        name: '审核操作',
                        handleClick: () => {
                            const { selectValue } = this.state;
                            if(selectValue.length<1){
                                message.error('请先选择');
                                return;
                            }else{
                                if(selectValue[0].examineStatus===sysAllDictItems.check_status[0].value){
                                    this.handleModal('check');
                                }else{
                                    message.error('这一条已经审核过了');
                                }
                            }
                        },
                        type: 'primary',
                    }]}
                    rowSelection={{
                        type: 'radio',
                        onChange: this.handleChange,
                        selectedRowKeys:this.state.selectKey,
                    }}
                />
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        initData: state.incomeVerify.initData,
        sysAllDictItems: state.login.sysAllDictItems,
        searchData: state.incomeVerify.searchData,
        page: state.incomeVerify.page,
        loading: state.loading.effects.incomeVerify.asyncGetList,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetList: dispatch.incomeVerify.asyncGetList,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
        toggle:dispatch.modal.toggle,
        setModalType:dispatch.modal.setModalType,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(Process));
