import React from 'react'

/***********************************
 ****** check transition type ******
 *********************************/
let transitionEndEventName = "transitionEnd event is not supported in this browser"
let el = document.createElement('div'),
    transitions = {
        'transition': 'transitionend',
        'OTransition': 'otransitionend',  // oTransitionEnd in very old Opera
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
    }

for (let i in transitions) {
    if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
        transitionEndEventName = transitions[i]
        // console.log("..."+transitionEndEventName);
        break
    }
}
//TODO: throw 'TransitionEnd event is not supported in this browser'
//******************************************************************

export default class CollapseAnimateComponent extends React.Component {
    static CLOSED = "closed"
    static OPEN = "open"
    static CLOSING = "closing"
    static OPENING = "opening"

    constructor(props) {
        super(props)
        this.state = { collapseState: CollapseAnimateComponent.CLOSED }
        this.startHeight = "auto"
        this.divHeight = "0px"
        this.animateTime = ".3s"

        this.collapsingStyle = {
            "WebkitTransitionTimingFunction": "ease",
            "OTransitionTimingFunction": "ease",
            "transitionTimingFunction": "ease",
            "WebkitTransitionDuration": this.animateTime,
            "OTransitionDuration": this.animateTime,
            "transitionDuration": this.animateTime,
            "WebkitTransitionProperty": "height,visibility",
            "OTransitionProperty": "height,visibility",
            "transitionProperty": "height,visibility",
        }


    }

    componentDidMount() {
        // check correct implimentation.
        if (this.collapseElement == null) {
            function UserException(message) {
                this.message = message
                this.name = "UserException"
            }
            throw new UserException("collapseElement is null. You have to setCollapseElement() before super.componentDidMount()")
        }
        // transition complete event
        this.collapseElement.addEventListener(transitionEndEventName, this.onTransitionComplete, false)
        // window resize event
        window.addEventListener("resize", this.updateDimensions)

        //console.log("componentDidMount")
        this.measureHeight()
    }

    componentWillUnmount() {
        if (this.collapseElement) {
            this.collapseElement.removeEventListener(transitionEndEventName, this.onTransitionComplete, false)
        }
        window.removeEventListener("resize", this.updateDimensions)
    }

    updateDimensions = () => {
        //If resize browser check height again
        //1. set height:auto
        //2. forceupdate (render)
        //3. mearure
        //4. render again
        this.startHeight = "auto"
        this.forceUpdate()
        this.measureHeight()
    }

    measureHeight() {
        // console.log("updateDimensions")
        this.divHeight = this.collapseElement.clientHeight + "px"
        this.startHeight = "0px"
        this.forceUpdate()
    }

    onTransitionComplete = () => {
        // console.log("end state : " + this.state.collapseState)
        if (this.state.collapseState === CollapseAnimateComponent.OPENING) {
            this.setState({ collapseState: CollapseAnimateComponent.OPEN })
        } else if (this.state.collapseState === CollapseAnimateComponent.CLOSING) {
            this.setState({ collapseState: CollapseAnimateComponent.CLOSED })
        }
    }

    toggleCollpse = () => {
        if (this.state.collapseState === CollapseAnimateComponent.CLOSED || this.state.collapseState === CollapseAnimateComponent.CLOSING) {
            this.setState({ collapseState: CollapseAnimateComponent.OPENING })
        } else if (this.state.collapseState === CollapseAnimateComponent.OPEN || this.state.collapseState === CollapseAnimateComponent.OPENING) {
            this.setState({ collapseState: CollapseAnimateComponent.CLOSING })
        }
    }

    setCollapseElement(_element) {
        this.collapseElement = _element
    }

    get animateStyle() {
        //separate animation style set visibility:visible/hidden will got delay
        let style
        if (this.state.collapseState === CollapseAnimateComponent.OPENING || this.state.collapseState === CollapseAnimateComponent.CLOSING) {
            style = this.collapsingStyle
        } else {
            style = {}
        }
        return {
            ...style,
            position: "relative",
            overflow: "hidden", //overflow:hidden is require for make the lower div in the correct position
            visibility: this.state.collapseState === CollapseAnimateComponent.CLOSED || this.state.collapseState === CollapseAnimateComponent.CLOSING ? "hidden" : "visible",
            height: this.startHeight === "auto" || this.state.collapseState === CollapseAnimateComponent.CLOSED || this.state.collapseState === CollapseAnimateComponent.CLOSING ? this.startHeight : this.divHeight
        }
    }

    render() {
        return <div>{this.props.children}</div>
    }
}