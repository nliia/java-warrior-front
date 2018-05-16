import * as React from 'react'
import { Route, RouteProps } from 'react-router-dom'
import DefaultWrapper from '../../react/components/wrapper/Default'
import ModalsProvider from '../../react/mware/ModalsProvider'

interface Props extends RouteProps {
    key?: any
}

interface State {

}

export default class Default extends React.Component<Props, State> {

  render () {
    return (
      <Route key={this.props.key} render={matchedProps => (
          <ModalsProvider>
              <DefaultWrapper>
                  {React.createElement(this.props.component, {
                      ...matchedProps
                  })}
              </DefaultWrapper>
          </ModalsProvider>
      )} />
    )
  }

}
