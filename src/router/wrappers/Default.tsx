import * as React from 'react'
import { Route, RouteProps } from 'react-router-dom'
import DefaultWrapper from '../../react/components/wrapper/Default'

interface Props extends RouteProps {
    key?: any
}

interface State {

}

export default class Default extends React.Component<Props, State> {

  render () {
    return (
      <Route key={this.props.key} render={matchedProps => (
          <DefaultWrapper>
              {React.createElement(this.props.component, {
                  ...matchedProps
              })}
          </DefaultWrapper>
      )} />
    )
  }

}
