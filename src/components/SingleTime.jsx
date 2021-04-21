/* eslint-disable  */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    DatePicker,
} from 'antd';
import moment from 'moment';

@withRouter
class SingleTime extends React.Component {
    render() {
        const {
            value,
            disabled,
            onChange,
            multiple,
        }=this.props;
        return (
            <div>
                {
                    multiple?<DatePicker.RangePicker
                        disabled={disabled}
                        value={value.length>0?[moment(value[0]),moment(value[1])]:[]}
                        onChange={e=>{
                            if(e.length>0){
                                onChange([moment(e[0]).format('YYYY-MM-DD'),moment(e[1]).format('YYYY-MM-DD')]);
                            }else{
                                onChange([]);
                            }
                        }}
                    />
                    :<DatePicker
                        disabled={disabled}
                        value={value?moment(value):null}
                        onChange={e=>{
                            onChange(e?moment(e).format('YYYY-MM-DD'):null);
                        }}
                    />
                }
            </div>
        )
    }
}
const mapState = (state) => {
    return {

    }
}
const mapDisptach = (dispatch) => {
    return {
        
    }
}
export default connect(mapState, mapDisptach)(SingleTime);