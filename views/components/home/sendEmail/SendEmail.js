import React from 'react'
import './SendEmail.scss'
import axios from 'axios'
import Dropdown from './dropdown/Dropdown'
export default class SendEmail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            month:'*',
            day:'*',
            hour:'*',
            minute:'*',
            email:'',
        }

        this.monthArray = [{name:'Month', value:'*'}]
        this.dayArray = [{name:'Day', value:'*'}]
        this.hourArray = [{name:'Hour', value:'*'}]
        this.minuteArray = [{name:'Minute', value:'*'}]
        const config = [
            [this.monthArray,1,12], //month
            [this.dayArray,1,31], //day
            [this.hourArray,0,23], //hour
            [this.minuteArray,0,59], //minute
        ]
        for(let i=0; i<config.length; i++){
            let array = config[i][0]
            for(let j=config[i][1]; j<=config[i][2]; j++){
                array.push({
                    name:j,
                    value:j,
                })
            }
        }
    }

    onSubmit = e=>{
        e.preventDefault()
        if( this.state.month === '*' &&
            this.state.day === '*' &&
            this.state.hour === '*' &&
            this.state.minute === '*'){
            return alert('Please Select Subscribe Time')
        }
        if( !this.validateEmail(this.state.email) ){
            return alert('Email is not valid!!!')
        }
        var params = new URLSearchParams()
        params.append('month', this.state.month)
        params.append('day', this.state.day)
        params.append('hour', this.state.hour)
        params.append('minute', this.state.minute)
        params.append('email', this.state.email)
        axios.post('/services/setcronjob', params).then(()=>{
            alert('Subscribed!!!')
        })
    }

    onChange(key, value ){
        console.log(value)
        let newState = {...this.state }
        newState[key] = value
        this.setState(newState)
    }
    onEmailChange = e=>{
        this.setState({
            ...this.state, email:e.target.value
        })
    }
    validateEmail = email=>{
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(email)
      }

    render() {
        console.log('this.state:',this.state)
        return <form className="send-email" action="/services/setcronjob" method="post" onSubmit={this.onSubmit}>
            Subscribe :
                    <Dropdown dataArray={this.monthArray} 
                              onChange={this.onChange.bind(this,'month')} 
                              value={this.state.month}/>
                    <Dropdown dataArray={this.dayArray} 
                              onChange={this.onChange.bind(this,'day')} 
                              value={this.state.day}/>
                    <Dropdown dataArray={this.hourArray} 
                              onChange={this.onChange.bind(this,'hour')} 
                              value={this.state.hour}/>
                    <Dropdown dataArray={this.minuteArray} 
                              onChange={this.onChange.bind(this,'minute')} 
                              value={this.state.minute}/>
                    
                    <input name="name" type="text" id="name" placeholder="Email" onChange={this.onEmailChange}/>
                    <button className="button" name="submit" type="submit" id="submit" value="Send" onClick={this.onSubmit}>Send</button>
				</form> 
    }
}

