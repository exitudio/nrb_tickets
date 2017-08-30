import React from 'react'
import {connect} from 'react-redux'
import './PieAndBar.scss'
import Pie from './PieChartWrapper'
import Bar from './BarWrapper'


class ProblemType extends React.Component {
    render() {
        return (
            <div>
                <div className="pie-and-bar">
                    <h1 className="head-text">Sort By Problem Type</h1>
                    <div className="chart-wrapper">
                        <div className="left-pie">
                            <Pie headTitle="NRB Ticket Pie Chart View (Top10)" data={this.props.problemType} />
                        </div>
                        <div className="right-bar">
                            <Bar data={this.props.problemType}/>
                        </div>
                    </div>
                </div>
                <div className="pie-and-bar">
                    <h1 className="head-text">Sort By Device Model</h1>
                    <div className="chart-wrapper">
                        <div className="left-pie">
                            <Pie headTitle="NRB Ticket Pie Chart View (Top10)" data={this.props.deviceModel} />
                        </div>
                        <div className="right-bar">
                            <Bar data={this.props.deviceModel}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state=>{
    return { 
        problemType: state.loadDataReducer.data.problemType || [],
        deviceModel: state.loadDataReducer.data.deviceModel || [],
    }
}
export default connect(mapStateToProps)(ProblemType)
