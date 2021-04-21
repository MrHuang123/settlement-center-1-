/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { OneSelect } from 'bnq-sys-react-component';
import {
    Form,
    Typography,
    Row,
    Col,
    Button,
    message,
    Spin,
} from 'antd';

const { Title } = Typography;
class Query extends React.Component {
    constructor(props){
        super(props);
        this.state={
            result:'-',
        }
    }
    componentDidMount(){
        const{
            getSysAllDictItems
        }=this.props;
        getSysAllDictItems();
    }

    handleClick = () => {
        const {
            asyncYl,
            asyncYx,
        }=this.props;
        const { validateFieldsAndScroll } = this.props.form;
        validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }
            if(values.classLevel==='01'){
                asyncYl().then(data=>{
                    if(data.success){
                        message.success('查询成功')
                        this.setState({
                            result:data.result,
                        });
                    }else {
                        message.error(data.message);
                        this.setState({
                            result:0
                        });
                    }
                })
            }else if(values.classLevel==='02'){
                asyncYx().then(data=>{
                    if(data.success){
                        message.success('查询成功')
                        this.setState({
                            result:data.result,
                        })
                    }else {
                        message.error(data.message);
                        this.setState({
                            result:0
                        })
                    }
                })
            }
        });
    }

    render(){
        const {
            form,
            sysAllDictItems,
            loading,
        }=this.props;
        const {
            getFieldDecorator
        }=form;
        return(
            <div>
                <Title level={4}>合作机构备付金查询</Title>
                <Row>
                    <Col span={8}>
                        <Form labelCol={
                            { span: 8 }
                        }
                        wrapperCol={
                            { span: 16 }
                        }>
                            <Form.Item label="合作机构">
                            {
                                getFieldDecorator('classLevel', {
                                    initialValue: '',
                                    rules: [
                                        { required: true, message: '合作机构不能为空' },
                                    ],
                                })(
                                    <OneSelect
                                        selfOptions={sysAllDictItems.business_brchno}
                                        selfFieldOptions={{
                                            initialValue: '',
                                        }}
                                        selfHasAll={{ value: '', text: '请选择' }}
                                        style={{ width: 240 }}
                                        selfMaps={{id:'value',name:'title'}}
                                    />,
                                )
                            }
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={8} offset={1}>
                        <Button onClick={this.handleClick} style={{marginTop:'4px'}}>查询余额</Button>
                    </Col>
                </Row>
                <hr />
                <div className='divBorder' style={{marginTop:'30px'}}>
                    <Row>
                        <Col span={23} offset={1}>
                            <span>备付金账户余额信息</span>
                        </Col>
                        <Col span={24}>
                            <hr />
                        </Col>
                        <Col span={22} offset={2} style={{display:'flex'}}>
                            <span>现金可用余额：</span>
                            <Spin spinning={loading}>
                                {this.state.result}
                            </Spin>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
const mapState = (state) => {
    return {
        sysAllDictItems: state.login.sysAllDictItems,
        loading:state.loading.effects.orgBalance.asyncYx || state.loading.effects.orgBalance.asyncYl,
    };
};
const mapDispatch = (dispatch) => {
    return {
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
        asyncYl:dispatch.orgBalance.asyncYl,
        asyncYx:dispatch.orgBalance.asyncYx,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(Query));