import React from 'react'
import './DateSelection.scss'
import DatePickerWrapper from './DatePickerWrapper'
import {connect} from 'react-redux'
import * as LoadDataAction from '../../../redux/LoadDataAction'

class DateSelection extends React.Component {
    onChangeStartDate = date => {
        this.props.dispatch( LoadDataAction.changeStartDate(date) )
    }
    onChangeEndDate = date => {
        this.props.dispatch( LoadDataAction.changeEndDate(date) )
    }
    onSearch = e =>{
        this.props.dispatch( LoadDataAction.onLoadAction())
    }
    render() {
        return <div className="date-selection">
            <h1 className="title">Select Date</h1>
            <div className="date-picker-wrapper">
                From <DatePickerWrapper currentDate={this.props.startDate} onChange={this.onChangeStartDate} />
                to <DatePickerWrapper currentDate={this.props.endDate} onChange={this.onChangeEndDate} />
                <div className="button" onClick={this.onSearch}>Search</div>
            </div>
        </div>
    }
}

const mapStateToProps = state => ({
    startDate: state.loadDataReducer.startDate,
    endDate: state.loadDataReducer.endDate,
})
export default connect(mapStateToProps)(DateSelection)