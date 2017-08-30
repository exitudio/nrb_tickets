import React from 'react'
// import Header from './Header.jsx'
import './Layout.scss'

export default class Layout extends React.Component{
    render(){
        return(
            <div>
                {/* <Header/> */}
                {this.props.children}
            </div>
        )
    }
};