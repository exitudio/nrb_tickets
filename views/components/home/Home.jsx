import React from 'react'
import {connect} from 'react-redux'
import './Home.scss'

import * as LoadDataAction from '../../redux/LoadDataAction'
import DateSelection from './dateSelection/DateSelection'
import TicketTrendingViews from './ticketTrendingView/TicketTrendingView'
import ProblemType from './pieAndBar/PieAndBar'
import SendEmail from './sendEmail/SendEmail'


class Home extends React.Component{
    componentDidMount(){
        this.props.dispatch( LoadDataAction.onLoadAction() )
    }
    getLoading = ()=>{
        if(this.props.loadStatus === LoadDataAction.GET_DATA_REQUEST){
            return <div className="loading">
                        <div className="text">Loading...</div>
                    </div>
        }else{
            return ''
        }
    }
    render(){
        console.log(this.props)
        return(
            <div className="container home">
                {this.getLoading()}
                <SendEmail/>
                <DateSelection/>
                <TicketTrendingViews/>
                <ProblemType/>
            </div>)
    }
}

const mapStateToProps = state=>({
    data:state.loadDataReducer.data,
    loadStatus:state.loadDataReducer.loadStatus,
})
export default connect(mapStateToProps)(Home)