import * as React from 'react'
import * as H from 'history';

import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { withRouter, RouteComponentProps } from 'react-router-dom'

interface Props extends RouteComponentProps<any> {
    children: (location: H.Location) => React.ReactNode
}

interface State {
}

import './styles.scss'

class RouterTransition extends React.Component<Props, State> {

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <TransitionGroup>
                <CSSTransition
                    key={this.props.location.key}
                    classNames="fade"
                    timeout={300}
                >
                    {this.props.children(this.props.location)}
                </CSSTransition>
            </TransitionGroup>
        )
    }

}


export default withRouter(RouterTransition) as any
