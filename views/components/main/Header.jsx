import React from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'

import CollapseAnimate from '../../libs/CollapseAnimate'
import LogoImage from './images/exit.jpg'

export default class Header extends React.Component{
    constructor (props) {
        super(props)
        this.state = {...this.state,isMenuMoving:true}
        this.menuTopPx = 50
        this.collapseAnimate = new CollapseAnimate()
    }

    componentDidMount(){
        // super.setCollapseElement(this.nav)
        // super.componentDidMount()
        this.collapseAnimate.startCollapseElement(this.nav, this.forceUpdate.bind(this))
        this.collapseButton.addEventListener("click",this.collapseAnimate.toggleCollpse)

        window.addEventListener("scroll",(event)=>{
            var isMenuMoving = (event.srcElement.body.scrollTop < this.menuTopPx)
            if(this.state.isMenuMoving !== isMenuMoving ){
                this.setState( {...this.state, isMenuMoving})
            }                
        })
    }
    componentWillUnmount(){
        this.collapseAnimate.stoptCollapseElement()
    }
    scrollState(){
        return this.state.isMenuMoving?"":"floating-menu"
    }

    render(){
        return(
            <div className="header-container">
                <div className={`header-fullwidth-container ${this.scrollState()}`}>
                    <div className={`container`}>
                        <div className="page-header">
                            {/* <div className="navbar-header">
                                <div className="brand-wrapper">
                                    <a href="/">
                                        <img alt="" className="brand-icon" src={LogoImage}/>
                                    </a>
                                </div>
                                <button ref={(child)=>{this.collapseButton = child}} type="button" className="hamburger-toggle collapsed">
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                            </div> */}

                            <nav ref={(child)=>{this.nav = child}} style={ this.collapseAnimate.animateStyle }  >
                                <ul className="navbar">
                                    <li> <Link to={''}>Verizon</Link> </li>
                                </ul>
                                {/* <ul className="navbar navbar-right">
                                    <li> <a href="/signup">Right-Button</a> </li>
                                </ul> */}
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}