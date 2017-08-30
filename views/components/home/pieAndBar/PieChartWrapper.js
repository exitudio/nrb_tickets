import React from 'react'
import PropTypes from 'prop-types'
import './PieChartWrapper.scss'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'
import {COLORS} from '../config'


export default class PieChartWrapper extends React.Component {
    render() {
        return (
            <div className="pie-chart-wrapper">
                <div className="head-title">{this.props.headTitle}</div>
                <div className="left-chart">
                    <PieChart width={400} height={400}>
                        <Pie data={this.props.data} 
                             cx={200} 
                             cy={200} 
                             outerRadius={160} 
                             dataKey="value" label >
                        {
                            this.props.data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)
                        }
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </div>
                <div className="right-description">
                        {
                            this.props.data.map( (entry,index)=>{
                                return <div className="item" key={index}>
                                    <div className="item-color" style={{backgroundColor:COLORS[index % COLORS.length]}}></div>
                                    <div className="description">{entry.name}</div>
                                </div>
                            })
                        }
                </div>
            </div>
        )
    }
}

PieChartWrapper.propTypes = {
    headTitle: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.number,
        name: PropTypes.string,
    })),
}
