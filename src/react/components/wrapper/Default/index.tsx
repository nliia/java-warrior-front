import * as React from 'react'

import Layout from '../../layout/index'
import PageWrapperProps from '../../../interfaces/props/PageWrapperProps'

import './styles.scss';

interface Props extends PageWrapperProps {

}

interface State {

}

export default class DefaultWrapper extends React.Component<Props, State> {

  render () {
    return (
      <main block="main">
        <Layout.Header/>
        <div elem="content">
          {this.props.children}
        </div>
      </main>
    )
  }

}
