import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Rectangle } from 'recharts'
import {COLORS} from '../config'

export default class BarWrapper extends React.Component {
    constructor(props){
        super(props)
        this.hashColor = {}
        this.triangleBar = (props) => {
          const { x, y, width, height, name } = props
          return <Rectangle {...props} stroke="none" fill={this.hashColor[name]}/>
        }
    }
    
    render() {
        this.hashColor = {}
        let i = 0
        for(let item of this.props.data){
            this.hashColor[item.name] = COLORS[i % COLORS.length]
            i++
        }
        return (
            <BarChart
                width={600}
                height={400}
                data={this.props.data}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={200}/>
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" shape={<this.triangleBar/>} />
            </BarChart>
        )
    }
}
