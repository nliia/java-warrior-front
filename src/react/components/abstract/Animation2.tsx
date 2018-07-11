import * as React from 'react'
import * as _ from 'lodash'
import { InlineAnimation } from 'inline-animation'

interface Props {
    // framesConfig: {
    //     width: number
    //     height: number
    //     duration?: number
    //     speed?: number
    // }
    delay?: number
    src: string[]
    width: number
    height: number
    id?: string
    style?: React.CSSProperties
    imgStyle?: React.CSSProperties
    repeatEvery?: number
    onEnd?: () => void
    active?: boolean
}

interface State {
    currentFrame: number
}

export default class Animation extends React.Component<Props, State> {

    state = {
        currentFrame: 0,
    }

    animationTimer: number
    repeatTimer: number

    getStyles () : React.CSSProperties {
        return {
            width: this.props.width,
            height: this.props.height,
            ...this.props.style,

        } as React.CSSProperties
    }

    changeFrame = () => {
        let { currentFrame } = this.state;
        // if (new Date().valueOf() <= this.endOn) {
        //     this.setState({ currentFrame: currentFrame == this.props.src.length - 1 ? 0 : currentFrame+1 })
        // } else {
        //     clearInterval(this.animationTimer);
        // }
        if (currentFrame+1 == this.props.src.length) {
            clearInterval(this.animationTimer);
            this.animationTimer = undefined;
            this.setState({ currentFrame: 0 });
        } else {
            this.setState({ currentFrame: currentFrame+1 })
        }
    }

    setTimer = () => {
        this.animationTimer = setInterval(this.changeFrame, 100) as any
    }

    componentWillReceiveProps (nextProps: Props, nextState: State) {
        if (!_.isEqual(nextProps, this.props)) {
            if (!_.isEqual(nextProps.repeatEvery, this.props.repeatEvery)) {
                if (!nextProps.repeatEvery) {
                    clearInterval(this.repeatTimer);
                    this.repeatTimer = undefined;
                    clearInterval(this.animationTimer);
                    this.animationTimer = undefined;
                } else {
                    clearInterval(this.repeatTimer);
                    this.repeatTimer = undefined;
                    this.repeatTimer = setInterval(this.setTimer, nextProps.repeatEvery) as any
                }
            }
        }

    }

    componentDidMount () {
        if (this.props.repeatEvery) {
            this.repeatTimer = setInterval(this.setTimer, this.props.repeatEvery) as any
        } else {
            this.setTimer();
        }
    }

    componentWillUnmount () {
        clearInterval(this.repeatTimer)
        clearInterval(this.animationTimer)
        this.repeatTimer = undefined;
        this.animationTimer = undefined;
    }

    render () {
        return (
            <div id={this.props.id} style={this.getStyles()}>
                <img style={this.props.imgStyle} src={this.props.src[this.state.currentFrame] || this.props.src.slice(-1)[0]}/>
            </div>
        )
    }

}