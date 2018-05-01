import * as React from 'react'
import { Route, RouteProps } from 'react-router-dom'
import DefaultWrapper from '../../react/components/wrapper/Default'

interface Props extends RouteProps {

}

interface State {

}

export default class Default extends React.Component<Props, State> {

  render () {
    return (
      <Route render={matchedProps => (
        <DefaultWrapper matchedProps={matchedProps} />
      )} />
    )
  }

}
