import * as React from 'react'
import * as _ from 'lodash'
import { InlineAnimation } from 'inline-animation'

interface Props {
    delay?: number
    src: string[]
    width: number
    height: number
    id?: string
    style?: React.CSSProperties
    imgStyle?: React.CSSProperties
    repeatEvery?: number
    onEnd?: () => void
    lastEmpty?: boolean
}

interface State {
    currentFrame: number
    currentImage: string
}

export default class Animation extends React.Component<Props, State> {

    state = {
        currentFrame: 0,
        currentImage: undefined
    }

    getStyles () : React.CSSProperties {
        return {
            width: this.props.width,
            height: this.props.height,
            ...this.props.style,

        } as React.CSSProperties
    }

    // changeFrame = () => {
    //     let { currentFrame } = this.state;
    //     // if (new Date().valueOf() <= this.endOn) {
    //     //     this.setState({ currentFrame: currentFrame == this.props.src.length - 1 ? 0 : currentFrame+1 })
    //     // } else {
    //     //     clearInterval(this.animationTimer);
    //     // }
    //     if (currentFrame+1 == this.props.src.length) {
    //         clearInterval(this.animationTimer);
    //         this.animationTimer = undefined;
    //         this.setState({ currentFrame: 0 });
    //     } else {
    //         this.setState({ currentFrame: currentFrame+1 })
    //     }
    // }
    //
    // setTimer = () => {
    //     this.animationTimer = setInterval(this.changeFrame, 100) as any
    // }
    //
    // componentWillReceiveProps (nextProps: Props, nextState: State) {
    //     if (!_.isEqual(nextProps, this.props)) {
    //         if (!_.isEqual(nextProps.repeatEvery, this.props.repeatEvery)) {
    //             if (!nextProps.repeatEvery) {
    //                 clearInterval(this.repeatTimer);
    //                 this.repeatTimer = undefined;
    //                 clearInterval(this.animationTimer);
    //                 this.animationTimer = undefined;
    //             } else {
    //                 clearInterval(this.repeatTimer);
    //                 this.repeatTimer = undefined;
    //                 this.repeatTimer = setInterval(this.setTimer, nextProps.repeatEvery) as any
    //             }
    //         }
    //     }
    //
    // }
    //
    // componentDidMount () {
    //     if (this.props.repeatEvery) {
    //         this.repeatTimer = setInterval(this.setTimer, this.props.repeatEvery) as any
    //     } else {
    //         this.setTimer();
    //     }
    // }
    //
    // componentWillUnmount () {
    //     clearInterval(this.repeatTimer)
    //     clearInterval(this.animationTimer)
    //     this.repeatTimer = undefined;
    //     this.animationTimer = undefined;
    //
    //}

    repeatTimer: number

    runAnimation (frameId: number, animations: string[]) {
        this.setState({ currentImage: animations[frameId] });
        if (frameId <= animations.length-2) {
            setTimeout(() => {
                this.runAnimation(frameId+1, animations);
            }, 100);
        } else {
            // this.setState({ currentImage: animations[0] })
            this.setEmptyFrame();
        }
    }

    repeatAnimation (time: number, animations: string[]) {
        this.runAnimation(0, animations);
        if (time) {
            this.repeatTimer = setTimeout(() => {
                this.repeatAnimation(time, animations);
            }, time);
        } else {
            clearTimeout(this.repeatTimer);
            this.repeatTimer = undefined;
            return;
        }
    }

    setEmptyFrame () {
        if (!this.props.lastEmpty) {
            this.setState({ currentImage: this.props.src[0] })
        } else {
            this.setState({ currentImage: undefined });
        }
    }

    componentDidMount () {
        if (this.props.repeatEvery) {
            this.repeatAnimation(this.props.repeatEvery, this.props.src);
        } else {
            this.runAnimation(0, this.props.src);
        }
    }

    componentWillReceiveProps (nextProps: Props, nextState: State) {
        if (!_.isEqual(nextProps, this.props)) {
            clearTimeout(this.repeatTimer);
            this.repeatTimer = undefined;
            if (!_.isEqual(nextProps.src, this.props.src)) {
                this.runAnimation(0, nextProps.src);
            }
            if (!_.isEqual(nextProps.repeatEvery, this.props.repeatEvery)) {
                clearTimeout(this.repeatTimer);
                this.repeatTimer = undefined;
                this.repeatAnimation(nextProps.repeatEvery, nextProps.src);
            }
        }
    }

    render () {
        return (
            <div id={this.props.id} style={this.getStyles()}>
                <img style={this.props.imgStyle} src={this.state.currentImage}/>
            </div>
        )
    }

}