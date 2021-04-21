/* eslint-disable eqeqeq */
import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Form,
    Skeleton,
    Descriptions,
    Button,
} from 'antd';

class Detail extends React.Component {
    static propTypes = {
        asyncGetDetail: Proptypes.func,
        detail: Proptypes.object,
        sysAllDictItems: Proptypes.object,
        getSysAllDictItems: Proptypes.func,
    }

    static defaultProps = {
        asyncGetDetail: () => { },
        detail: {},
        sysAllDictItems: {},
        getSysAllDictItems: () => { },
    }

    constructor(props) {
        super(props);
        this.state = {
            // eslint-disable-next-line react/prop-types
            id: this.props.match.params.id,
            // eslint-disable-next-line react/prop-types
            subjectNo: this.props.match.params.subjectNo,
        };
    }

    // eslint-disable-next-line react/sort-comp
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

    componentDidMount() {
        const {
            asyncGetDetail,
            getSysAllDictItems,
        } = this.props;
        asyncGetDetail({
            id: this.state.id,
            subjectNo: this.state.subjectNo,
        });
        getSysAllDictItems();
    }

    render() {
        const {
            detail,
            sysAllDictItems,
        } = this.props;
        return (
            <div>
                <Skeleton loading={false}>
                    <Descriptions>
                        <Descriptions.Item label="外部户号">{detail.outerAccountNo}</Descriptions.Item>
                        <Descriptions.Item label="外部账户名称">{detail.outerAccountName}</Descriptions.Item>

                        <Descriptions.Item label="对应科目号">{detail.subjectNo}</Descriptions.Item>
                        <Descriptions.Item label="对应科目名称">{detail.subjectName}</Descriptions.Item>

                        <Descriptions.Item label="商户/客户号">{detail.custno}</Descriptions.Item>
                        <Descriptions.Item label="商户/客户名称">{detail.custna}</Descriptions.Item>

                        <Descriptions.Item label="账户所属机构号">{this.showDict(sysAllDictItems.org_no, detail.orgNo)}</Descriptions.Item>
                        <Descriptions.Item label="是否允许透支">{detail.allowOverdrawFlag == 0 ? '不允许' : '允许'}</Descriptions.Item>
                        <Descriptions.Item label="账户状态">{detail.outAccountStatus == 0 ? '失效' : '生效'}</Descriptions.Item>
                        <Descriptions.Item label="特征码">{detail.featureCode}</Descriptions.Item>
                    </Descriptions>
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            style={{ margin: '0 auto' }}
                            onClick={() => {
                                window.history.back();
                            }}
                        >返回</Button>
                    </div>
                </Skeleton>

            </div>
        );
    }
}
const mapState = (state) => {
    return {
        detail: state.accountManageOut.detail,
        sysAllDictItems: state.login.sysAllDictItems,
    };
};
const mapDispatch = (dispatch) => {
    return {
        asyncGetDetail: dispatch.accountManageOut.asyncGetDetail,
        getSysAllDictItems: dispatch.login.getSysAllDictItems,
    };
};
export default connect(mapState, mapDispatch)(Form.create()(Detail));
