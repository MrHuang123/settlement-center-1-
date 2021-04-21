/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import {
    Form,
    Table,
    Modal,
} from 'antd';
import Proptypes from 'prop-types';
import { Tools } from '@/util/index';

class ModalSet extends React.Component {
    componentDidMount(){
        const {
            asyncGetPayType,
        }=this.props;
        asyncGetPayType();
    }
    render() {
        const columnsOptions = [
            {
                name: '支付类型',
                dataindex: 'psid',
                render: (text) => {
                    let result = '';
                    payType.forEach((element) => {
                        if (element.id == text) {
                            result = element.name;
                        }
                    });
                    return <span>{result}</span>;
                },
            }, {
                name: '备用金',
                dataindex: 'recieveAmount',
            }, {
                name: '应收金额',
                dataindex: 'shouldReceive',
            }, {
                name: '已交累计金额',
                dataindex: 'handedAmount',
            }, {
                name: '差额',
                dataindex: 'nowBalance',
            },
        ];
        const {
            columnsList,
            payType,
        } = this.props;
        return (
            <div>
                <Modal
                    {...this.props.domProps}
                >
                    <Table
                        columns={Tools.genTableOptions(columnsOptions)}
                        dataSource={columnsList}
                        scroll={{ x: 'max-content' }}
                        pagination={false}
                        rowKey={(rc)=>{
                            return rc.id;
                        }}
                    ></Table>
                </Modal>
            </div>
        );
    }
}
const mapState = (state) => {
    return {
        payType: state.tradeInout.payType,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetPayType: dispatch.tradeInout.asyncGetPayType,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(ModalSet));
