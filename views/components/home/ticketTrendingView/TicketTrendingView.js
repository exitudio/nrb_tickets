import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { connect } from 'react-redux'
//http://recharts.org/#/en-US/api/LineChart
class TicketTrendingViews extends React.Component {
  render() {
    for (let i = 0; i < this.props.date.length; i++) {
      this.props.date[i]['Ticket Number'] = this.props.date[i].value
    }

    return (
      <LineChart width={1200} height={300} data={this.props.date}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Ticket Number" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    )
  }
}

const mapStateToProps = state => {
  return { date: state.loadDataReducer.data.date || [] }
}
export default connect(mapStateToProps)(TicketTrendingViews)