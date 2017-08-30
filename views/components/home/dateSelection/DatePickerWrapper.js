import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { inititialState } from '../../../redux/LoadDataReducer'

import 'react-datepicker/dist/react-datepicker.css'


// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css'

export default class DatePickerWrapper extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(date) {
        let currentDateString = date.format('YYYY-MM-DD')
        let currentDate = new Date(currentDateString)
        console.log('currentDate:',currentDate)
        if (currentDate < new Date(inititialState.startDate) || currentDate > new Date(inititialState.endDate)) {
            return alert(`Now data support only from ${inititialState.startDate} to ${inititialState.endDate}`)
        }
        this.props.onChange(currentDateString)
    }

    render() {
        console.log('this.props.currentDate:',this.props.currentDate)
        return <DatePicker
            selected={moment(this.props.currentDate, 'YYYY-MM-DD')}
            onChange={this.handleChange}
        />
    }
}


DatePickerWrapper.propTypes = {
    currentDate: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}
