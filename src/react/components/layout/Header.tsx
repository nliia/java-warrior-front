import * as React from 'react'
import WithClassNameProps from "../../interfaces/props/WithClassNameProps";

interface Props extends WithClassNameProps {
}

interface State {

}

export default class Header extends React.Component<Props, State> {

  render() {
    return (
      <header block="header">
        {this.props.children}
      </header>
    )

  }

}
