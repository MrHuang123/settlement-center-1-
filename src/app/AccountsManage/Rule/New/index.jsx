/* eslint-disable */
import React from 'react';
import {
    Form,
    Input,
    Button,
    Row,
    Col,
    Table,
    message,
    Skeleton,
} from 'antd';
import { OneSelect } from 'bnq-sys-react-component';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { Tools } from '../../../../util';
import './new.css';
import { searchOptionsCommon } from '../optionsCommon';

const FormItem = Form.Item;
class New extends React.Component {
    static propTypes = {
        form: Proptypes.object,
        getSysAllDictItems: Proptypes.func,
        sysAllDictItems: Proptypes.object,
        getSubject: Proptypes.func,
        subjectList: Proptypes.array,
        classAllList: Proptypes.array,
        check: Proptypes.func,
        addRule: Proptypes.func,
        getDetail: Proptypes.func,
        initData: Proptypes.object,
        resetRule: Proptypes.func,
    }

    static defaultProps = {
        form: null,
        getSysAllDictItems: () => { },
        sysAllDictItems: {},
        getSubject: () => { },
        subjectList: [],
        classAllList: [],
        check: () => { },
        addRule: () => { },
        getDetail: () => { },
        initData: {},
        resetRule: () => { },
    }

    constructor(props) {
        super(props);
        this.state = {
            pageType: this.props.match.params.type,//revise new detail
            id: this.props.match.params.id,
            checkedKey: -1,
            count: 0,
            select1Value: '',
            select2Value: '',
        };
    }

    componentDidMount() {
        const {
            getSysAllDictItems,
            getSubject,
            getClassList,
            getDetail,
        } = this.props;
        const { id } = this.state;
        getSysAllDictItems();//获取到所有的enum
        getClassList();
        getSubject();
        if (id!=0) {
            //修改或者详情
            getDetail({
                id
            }).then((res) => {
                this.setState({
                    count: res.length - 1
                })
            });
        } else {
            //新增
        }
    }

    componentWillUnmount() {
        const { clearData } = this.props;
        clearData();
    }

    handleAdd = () => {
        const {
            setDataSourceList,
            dataSourceList
        } = this.props;
        this.setState({
            count: this.state.count + 1
        }, () => {
            let result = dataSourceList.concat({
                key: this.state.count,
            });
            setDataSourceList(result);
        });
    }

    handleDel = () => {
        const {
            setDataSourceList,
            dataSourceList,
        } = this.props;
        const { checkedKey } = this.state;
        setDataSourceList(dataSourceList.filter((value) => {
            return value.key !== checkedKey;
        }));
    }
    handleSubmit = () => {
        const { id, pageType } = this.state;
        const { validateFieldsAndScroll } = this.props.form;
        const { check, addRule, remoteList, initData, resetRule } = this.props;
        validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }

            let middleTable = [];
            let otherObj = {};
            // 新增是remoteList为空
            // let entryNoRemote = remoteList.map((item) => {
            //     return item.entryNo
            // });
            for (let key in values) {
                if (key.includes('_')) {
                    let [i, k] = key.split('_');
                    middleTable[i] = {
                        ...middleTable[i],
                        [k]: values[key],
                    }
                } else {
                    otherObj[key] = values[key];
                }
            };
            
            // middleTable就是中间的数据
            // middleTable.forEach((item) => {
            //     item.entryNo = Number(item.entryNo)
            //     item.inOutType = Number(item.inOutType)
            // });
            middleTable=middleTable.filter((item)=>{
                return item;
            });
            let set = new Set();
            middleTable.forEach((item)=>{
                if(middleTable.length>=item.entryNo>=1){
                    set.add(item.entryNo);
                }
            });
            
            if(set.size!=middleTable.length){
                message.error('分录序号需为从1开始的连续输字');
                return;
            };
            new Promise(async (resolve) => {
                if (pageType === 'new') {
                    // 需要先检查 是否是已经录入的 merge
                    // result.push();
                    check([{
                        fieldName:'class_no_merge',
                        fieldVal:`${otherObj.classNoOne}-${otherObj.classNoTwo}-${otherObj.classNoThree}`,
                    },{
                        fieldName:'org_no',
                        fieldVal:`100001`,
                    }]).then((data) => {
                        if (data.success) {
                            resolve();
                        } else {
                            message.error(data.message);
                        }
                    });
                } else {
                    // 修改
                    resolve();
                }
            }).then(() => {
                let dcnt = 0;
                let ccnt = 0;
                middleTable.forEach((item) => {
                    if (item.dcFlag === 0) {
                        //借方
                        dcnt++;
                    } else if (item.dcFlag === 1) {
                        //贷方
                        ccnt++;
                    }
                });
                otherObj.dcnt = dcnt;
                otherObj.ccnt = ccnt;
                otherObj.classNoMerge = `${otherObj.classNoOne}-${otherObj.classNoTwo}-${otherObj.classNoThree}`;
                if (pageType === 'new') {
                    addRule({
                        accountingEntry: otherObj,
                        list: middleTable.filter(function(e){
                            return e;
                        })
                    }).then((data) => {
                        if (data.success) {
                            message.success(data.message);
                            window.history.back();
                        } else {
                            message.error(data.message);
                        }
                    });
                } else {
                    // 修改
                    //往other里面放入entryId和Id
                    otherObj.id = initData.id;
                    middleTable.forEach((item, index) => {
                        // for (let i of remoteList) {
                            middleTable[index].entryId = initData.id;
                            // if (item.entryNo == i.entryNo) {
                            //     //之前存在的项目
                            //     middleTable[index].id = i.id;
                            // }
                        // }
                    });
                    resetRule({
                        accountingEntry: otherObj,
                        list: middleTable
                    }).then((data) => {
                        if (data.success) {
                            message.success(data.message);
                            window.history.back();
                        } else {
                            message.error(data.message);
                        }
                    });
                }
            })
        })
    }

    render() {
        const { pageType } = this.state;
        const isDetail = pageType === 'detail';
        const isRevise = pageType === 'modify';
        const isNew = pageType === 'new';
        const {
            form,
            dataSourceList,
            sysAllDictItems,
            subjectList,
            classAllList,
            initData,
            loading
        } = this.props;
        const { getFieldDecorator } = form;
        const showWhichClass = (list, [text, no, name]) => {
            for (let i of list) {
                if (i[no] == text) {
                    return `${i[name]}`;
                }
            }
            return ''
        }
        const renderClass=(text,level) => {
            let result;
            classAllList.forEach((element) => {
                if ((element.classNo === text) && (element.classLevel === level)) {
                    result = `${text}-${element.className}`;
                }
            });
            return result;
        };
        const columnsOptions = [{
            name: '分录序号',
            dataindex: 'entryNo',
            width:120,
            render: (text, record) => {
                return (
                    <Form.Item labelCol={{ span: 0 }} style={{ margin: 0, display: 'flex', justifyContent: 'center' }}>
                        {form.getFieldDecorator(`${record.key}_entryNo`, {
                            rules: [
                                {
                                    required: true,
                                    message: `不能为空`,
                                },
                            ],
                            initialValue: record['entryNo'],
                        })(isDetail ? <span>{record['entryNo']}</span> : <Input maxLength={2} />)}
                    </Form.Item>
                )
            }
        }, {
            name: '科目号-科目名称',
            dataindex: 'subjectNo',
            width: 300,
            render: (text, record) => {
                return (
                    <Form.Item style={{ margin: 0}}>
                        {form.getFieldDecorator(`${record.key}_subjectNo`, {
                            rules: [
                                {
                                    required: true,
                                    message: `不能为空`,
                                },
                            ],
                            initialValue: record['subjectNo'],
                        })(
                            <OneSelect
                                selfOptions={subjectList.map((item) => {
                                    return {
                                        ...item,
                                        des: `${item.subjectNo}--${item.subjectName}`
                                    }
                                })}
                                selfHasAll={false}
                                selfMaps={{ id: 'subjectNo', name: 'des' }}
                                disabled={isDetail}
                                style={{width:'300px'}}
                            />
                        )}
                    </Form.Item>
                )
            }
        }, {
            name: '借贷标志',
            dataindex: 'dcFlag',
            width:120,
            render: (text, record) => {
                return (
                    <Form.Item style={{ margin: 0 }}>
                        {form.getFieldDecorator(`${record.key}_dcFlag`, {
                            rules: [
                                {
                                    required: true,
                                    message: `不能为空`,
                                },
                            ],
                            initialValue: record['dcFlag'],
                        })(
                            <OneSelect
                                selfOptions={searchOptionsCommon('ruleLoanSide')}
                                selfHasAll={false}
                                style={{ width: '120px' }}
                                disabled={isDetail}
                            />
                        )}
                    </Form.Item>
                )
            }
        }, {
            name: '账户种类',
            dataindex: 'inOutType',
            width: 240,
            render: (text, record) => {
                return (
                    <Form.Item style={{ margin: 0 }}>
                        {form.getFieldDecorator(`${record.key}_inOutType`, {
                            rules: [
                                {
                                    required: true,
                                    message: `不能为空`,
                                },
                            ],
                            initialValue: record['inOutType']?String(record['inOutType']):'',
                        })(
                            <OneSelect
                                selfOptions={sysAllDictItems.in_out_type}
                                selfHasAll={false}
                                selfMaps={{ id: ['value'], name: ['text'] }}
                                disabled={isDetail}
                            />
                        )}
                    </Form.Item>
                )
            }
        },{
            name: 'SAP推送类型',
            dataindex: 'sapType',
            width: 240,
            render: (text, record) => {
                return (
                    <Form.Item style={{ margin: 0 }}>
                        {form.getFieldDecorator(`${record.key}_sapType`, {
                            rules: [
                                {
                                    required: true,
                                    message: `不能为空`,
                                },
                            ],
                            initialValue: record['sapType']?String(record['sapType']):'',
                        })(
                            <OneSelect
                                selfOptions={sysAllDictItems.SAP_type}
                                selfHasAll={false}
                                selfMaps={{ id: ['value'], name: ['text'] }}
                                disabled={isDetail}
                            />
                        )}
                    </Form.Item>
                )
            }
        },{
            name: 'SAP科目名称',
            dataindex: 'sapSubjectName',
            width:240,
            render:(text,record)=>{
                return (
                    <Form.Item style={{ margin: 0 }}>
                        {form.getFieldDecorator(`${record.key}_sapSubjectName`, {
                            rules: [
                                {
                                    required: true,
                                    message: `不能为空`,
                                },
                            ],
                            initialValue: record['sapSubjectName']?String(record['sapSubjectName']):'',
                        })(
                            <Input maxLength={64} disabled={isDetail} />
                        )}
                    </Form.Item>
                )
            }
        },{
            name: '科目状态',
            dataindex: 'status',
            width:120,
            render: (text, record) => {
                return (
                    <FormItem style={{ margin: 0, display: 'flex', justifyContent: 'center' }}>
                        <span>生效</span>
                    </FormItem>
                )
            }
        }, {
            name: '资金种类',
            dataindex: 'cashType',
            width:120,
            render: (text, record) => {
                return (
                    <Form.Item style={{ margin: 0 }}>
                        {form.getFieldDecorator(`${record.key}_cashType`, {
                            rules: [
                                {
                                    required: true,
                                    message: `不能为空`,
                                },
                            ],
                            initialValue: record['cashType'],
                        })(
                            <OneSelect
                                selfOptions={sysAllDictItems.cash_type}
                                selfMaps={{ id: 'value', name: 'text' }}
                                selfHasAll={false}
                                style={{ width: '120px' }}
                                disabled={isDetail}
                            />
                        )}
                    </Form.Item>
                )
            }
        }, {
            name: 'RCd',
            dataindex: 'rcd',
            render: (text, record) => {
                return (
                    <Form.Item style={{ margin: 0 }}>
                        {form.getFieldDecorator(`${record.key}_rcd`, {
                            initialValue: record['rcd'] || '',
                        })(
                            isDetail ? <span>{record['rcd']}</span> : <Input maxLength={8} disabled={isDetail} />
                        )}
                    </Form.Item>
                )
            }
        }, {
            name: 'PK',
            dataindex: 'pk',
            render: (text, record) => {
                return (
                    <Form.Item style={{ margin: 0 }}>
                        {form.getFieldDecorator(`${record.key}_pk`, {
                            initialValue: record['pk'] || '',
                        })(
                            isDetail ? <span>{record['pk']}</span> : <Input maxLength={8} disabled={isDetail} />
                        )}
                    </Form.Item>
                )
            }
        }, {
            name: '成本中心',
            dataindex: 'costCenter',
            render: (text, record) => {
                return (
                    <Form.Item style={{ margin: 0, display: 'flex', justifyContent: 'center' }}>
                        {form.getFieldDecorator(`${record.key}_costCenter`, {
                            initialValue: record['costCenter'] || '',
                        })(
                            isDetail ? <span>{record['costCenter']}</span> : <Input maxLength={18} disabled={isDetail} />
                        )}
                    </Form.Item>
                )
            }
        }, {
            name: '利润中心',
            dataindex: 'profitCenter',
            render: (text, record) => {
                return (
                    <Form.Item style={{ margin: 0, display: 'flex', justifyContent: 'center' }}>
                        {form.getFieldDecorator(`${record.key}_profitCenter`, {
                            initialValue: record['profitCenter'] || '',
                        })(
                            isDetail ? <span>{record['profitCenter']}</span> : <Input maxLength={18} style={{ width: '100%' }} />
                        )}
                    </Form.Item>
                )
            }
        }, {
            name: '税',
            dataindex: 'tax',
            render: (text, record) => {
                return (
                    <Form.Item style={{ margin: 0, display: 'flex', justifyContent: 'center' }}>
                        {form.getFieldDecorator(`${record.key}_tax`, {
                            initialValue: record['tax'] || '',
                        })(
                            isDetail ? <span>{record['tax']}</span> : <Input maxLength={18} style={{ width: '100%' }} />
                        )}
                    </Form.Item>
                )
            }
        }, {
            name: '文本',
            dataindex: 'text',
            render: (text, record) => {
                return (
                    <Form.Item style={{ margin: 0, display: 'flex', justifyContent: 'center' }}>
                        {form.getFieldDecorator(`${record.key}_text`, {
                            initialValue: record['text'] || '',
                        })(
                            isDetail ? <span>{record['text']}</span> : <Input maxLength={18} style={{ width: '100%' }} />
                        )}
                    </Form.Item>
                )
            }
        }, {
            name: '分配',
            dataindex: 'distribution',
            render: (text, record) => {
                return (
                    <Form.Item style={{ margin: 0, display: 'flex', justifyContent: 'center' }}>
                        {form.getFieldDecorator(`${record.key}_distribution`, {
                            initialValue: record['distribution'] || '',
                        })(
                            isDetail ? <span>{record['distribution']}</span> : <Input maxLength={18} style={{ width: '100%' }} />
                        )}
                    </Form.Item>
                )
            }
        }];
        const rowSelectionOption = {
            type: 'radio',
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    checkedKey: selectedRows[0].key,//radio一定是单选
                })
            }
        }
        return (
            <div>
                <Skeleton paragraph={{ rows: 12 }} loading={loading}>
                    <Form
                        labelCol={
                            { span: 8 }
                        }
                        wrapperCol={
                            { span: 12 }
                        }
                    >
                        <div className='divBorder'>
                        <Row gutter={30}>
                            <Col span={8}>
                                <FormItem label="账务所属机构">
                                    {
                                        getFieldDecorator('orgNo', {
                                            initialValue: isNew ? '' : initData.orgNo,
                                            rules: [
                                                { required: true, message: '账务所属机构不能为空' },
                                            ],
                                        })(
                                            <OneSelect
                                                selfOptions={sysAllDictItems.org_no}
                                                selfMaps={{ id: ['value'], name: ['title'] }}
                                                selfHasAll={{ value: '', text: '请选择' }}
                                                disabled={isDetail}
                                            />
                                        )
                                    }
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label="币种">
                                    {
                                        getFieldDecorator('currency', {
                                            initialValue: 'RMB',
                                            rules: [
                                                { required: true },
                                            ],
                                        })(
                                            <Input disabled />
                                        )
                                    }
                                </FormItem>
                                
                            </Col>
                            <Col span={8}>
                                <FormItem label="账务类型">
                                    {
                                        isDetail ? <span>{renderClass(initData.classNoOne,'01')}</span> : getFieldDecorator('classNoOne', {
                                            initialValue: isNew ? '' : initData.classNoOne || '',
                                            rules: [
                                                { required: true, message: '账务类型不能为空' },
                                            ],
                                        })(
                                            isRevise ? <OneSelect
                                                selfOptions={classAllList.filter((item) => {
                                                    return item.classLevel === '01'
                                                }).map((item) => {
                                                    return {
                                                        id: item.classNo,
                                                        name: `${item.classNo}--${item.className}`,
                                                    };
                                                })}
                                                disabled={true}
                                            /> : <OneSelect
                                                    selfOptions={classAllList.filter((item) => {
                                                        return item.classLevel === '01'
                                                    }).map((item) => {
                                                        return {
                                                            id: item.classNo,
                                                            name: `${item.classNo}--${item.className}`,
                                                        };
                                                    })}
                                                    selfHasAll={{ value: '', text: '请选择' }}
                                                    onChange={(select1Value) => {
                                                        this.setState({
                                                            select1Value,
                                                            select2Value: '',
                                                        })
                                                    }}
                                                />
                                        )
                                    }
                                </FormItem>
                                
                            </Col>
                        </Row>
                        <Row gutter={30}>
                            <Col span={8}>
                                <FormItem label="交易类型">
                                    {
                                        getFieldDecorator('classNoTwo', {
                                            initialValue: isNew ? '' : initData.classNoTwo,
                                            rules: [
                                                { required: true, message: '交易类型不能为空' },
                                            ],
                                        })(
                                            isDetail ? <span>{renderClass(initData.classNoTwo,'02')}</span> : isRevise ? <OneSelect
                                                selfOptions={classAllList.filter((item) => {
                                                    return item.classLevel === '02'
                                                }).map((item) => {
                                                    return {
                                                        id: item.classNo,
                                                        name: `${item.classNo}--${item.className}`,
                                                    };
                                                })}
                                                // selfMaps={{ id: ['classNo'], name: ['className'] }}
                                                disabled={true}
                                            /> : <OneSelect
                                                    selfOptions={classAllList.filter((item) => {
                                                        return item.classLevel === '02';
                                                    }).map((item) => {
                                                        return {
                                                            id: item.classNo,
                                                            name: `${item.classNo}--${item.className}`,
                                                        };
                                                    })}
                                                    selfHasAll={{ value: '', text: '请选择' }}
                                                    selfFieldOptions={{
                                                        initialValue: '',
                                                    }}
                                                    // selfMaps={{ id: ['classNo'], name: ['className'] }}
                                                    onChange={(select2Value) => {
                                                        // this.props.form.setFieldsValue({
                                                        //     classNoThree: '',
                                                        // });
                                                        this.setState({
                                                            select2Value
                                                        })
                                                    }}
                                                />
                                        )
                                    }
                                </FormItem>
                                
                            </Col>
                            <Col span={8}>
                                <FormItem label="业务名称">
                                    {
                                        getFieldDecorator('classNoThree', {
                                            initialValue: isNew ? '' : initData.classNoThree,
                                            rules: [
                                                { required: true, message: '业务名称不能为空' },
                                            ],
                                        })(
                                            isDetail ? <span>{renderClass(initData.classNoThree,'03')}</span> : isRevise ? <OneSelect
                                                disabled={true}
                                                selfOptions={classAllList.filter((item) => {
                                                    return item.classLevel === '03'
                                                }).map((item) => {
                                                    return {
                                                        id: item.classNo,
                                                        name: `${item.classNo}--${item.className}`,
                                                    };
                                                })}
                                            /> : <OneSelect
                                                selfHasAll={{ value: '', text: '请选择' }}
                                                selfFieldOptions={{
                                                    initialValue: '',
                                                }}
                                                // selfMaps={{ id: ['classNo'], name: ['className'] }}
                                                selfOptions={classAllList.filter((item) => {
                                                    return item.classLevel === '03';
                                                }).map((item) => {
                                                    return {
                                                        id: item.classNo,
                                                        name: `${item.classNo}--${item.className}`,
                                                    };
                                                })}
                                            />
                                        )
                                    }
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label="分录状态">
                                    {
                                        getFieldDecorator('ruleStatus', {
                                            initialValue: isNew ? '' : initData.ruleStatus,
                                            rules: [
                                                { required: true, message: '分录状态不能为空' },
                                            ],
                                        })(
                                            isDetail ? <FormItem><span>{showWhichClass(searchOptionsCommon('ruleStatus'), [initData.ruleStatus, 'id', 'name'])}</span></FormItem> : <OneSelect
                                                selfOptions={searchOptionsCommon('ruleStatus')}
                                            />
                                        )
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        </div>
                        <div className='divBorder'>
                        {isDetail ? null : <Row gutter={30} style={{ margin: '0 0 10px 10px' }}>
                            <Col span={3}>
                                <Button onClick={this.handleAdd}>增加项目</Button>
                            </Col>
                            <Col span={3}>
                                <Button onClick={this.handleDel}>删除项目</Button>
                            </Col>
                        </Row>}
                        <Table
                            columns={Tools.genTableOptions(columnsOptions)}
                            dataSource={dataSourceList}
                            rowSelection={rowSelectionOption}
                            scroll={{ x: 'max-content' }}
                            pagination={false}
                        >
                        </Table>
                        </div>
                        <div className='divBorder'>
                        <Row gutter={30} style={{ marginTop: '10px' }}>
                            <Col span={8}>
                                <FormItem label="凭证类型">
                                    {
                                        getFieldDecorator('voucherType', {
                                            initialValue: isNew ? '' : initData.voucherType,
                                            rules: [
                                                { required: true, message: '凭证类型不能为空' },
                                            ],
                                        })(
                                            isDetail ? <span>{initData.voucherType}</span> : <Input maxLength={60} />
                                        )
                                    }
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label="公司代码">
                                    {
                                        getFieldDecorator('comCode', {
                                            initialValue: isNew ? '' : initData.comCode,
                                            rules: [
                                                { required: true, message: '公司代码不能为空' },
                                            ],
                                        })(
                                            isDetail ? <span>{initData.comCode}</span> : <Input maxLength={18} />
                                        )
                                    }
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label="计算税收">
                                    {
                                        getFieldDecorator('calcTax', {
                                            initialValue: isNew ? '' : initData.calcTax,
                                        })(
                                            isDetail ? <span>{initData.calcTax}</span> : <Input maxLength={60} />
                                        )
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={30}>
                            <Col span={8}>
                                <FormItem label="参考凭证">
                                    {
                                        getFieldDecorator('refVoucher', {
                                            initialValue: isNew ? '' : initData.refVoucher,
                                        })(
                                            isDetail ? <span>{initData.refVoucher}</span> : <Input maxLength={60} />
                                        )
                                    }
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label="凭证抬头摘要">
                                    {
                                        getFieldDecorator('voucherTitle', {
                                            initialValue: isNew ? '' : initData.voucherTitle,
                                        })(
                                            isDetail ? <span>{initData.voucherTitle}</span> : <Input maxLength={60} />
                                        )
                                    }
                                </FormItem>
                            </Col>
                            {/* 新增Item，未开始 */}
                            {/* <Col span={8}>
                                <FormItem label="是否推送SAP">
                                    {
                                        getFieldDecorator('hasSAP', {
                                            initialValue: '',
                                        })(
                                            isDetail ? <span>{initData.voucherTitle}</span> : <OneSelect
                                                selfOptions={sysAllDictItems.org_no}
                                                selfMaps={{ id: ['value'], name: ['title'] }}
                                                selfHasAll={{ value: '', text: '请选择' }}
                                                disabled={isDetail}
                                            />
                                        )
                                    }
                                </FormItem>
                            </Col> */}
                        </Row>
                        </div>
                    </Form>
                    <Row gutter={30}>
                        <Col span={12}>
                            <div className="bottom-btn-div">
                                {
                                    pageType==='detail'?null:<Button
                                        className="btn save"
                                        type="primary"
                                        onClick={this.handleSubmit}
                                    >提交</Button>
                                }
                                <Button
                                    className="btn back"
                                    onClick={() => { history.back() }}
                                >{pageType==='detail'?'返回':'取消'}</Button>
                            </div>
                        </Col>
                    </Row>
                </Skeleton>
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        dataSourceList: state.ruleNew.dataSourceList,
        sysAllDictItems: state.login.sysAllDictItems,
        subjectList: state.accountManageRule.subjectList,
        classAllList: state.accountManageRule.classList,
        initData: state.ruleNew.initData,
        remoteList: state.ruleNew.remoteList,
        loading: state.loading.effects.ruleNew.asyncAddRule || state.loading.effects.ruleNew.asyncResetRule || state.loading.effects.ruleNew.asyncGetDetail,
    }
}
const mapDispatch = (dispatch) => {
    return {
        setDataSourceList: dispatch.ruleNew.setDataSourceList,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
        getSubject: dispatch.accountManageRule.asyncGetAllSubject,
        getClassList: dispatch.accountManageRule.asyncGetClassList,
        check: dispatch.ruleNew.asyncCheck,
        addRule: dispatch.ruleNew.asyncAddRule,
        getDetail: dispatch.ruleNew.asyncGetDetail,
        resetRule: dispatch.ruleNew.asyncResetRule,
        clearData: dispatch.ruleNew.clearData,
    }
}
export default connect(mapState, mapDispatch)(Form.create()(New));
