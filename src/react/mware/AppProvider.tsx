import * as React from 'react'
import {AppContainer} from 'react-hot-loader';

interface Props {

}

interface State {

}

export default class AppProvider extends React.Component<Props, State> {

    render () {
        return (
            <AppContainer>
                {this.props.children as React.ReactElement<any>}
            </AppContainer>
        )
    }

}