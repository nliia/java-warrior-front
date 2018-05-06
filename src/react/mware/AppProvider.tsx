import * as React from 'react'
import {AppContainer} from 'react-hot-loader';
import { Provider } from 'react-redux';
import ReduxStore from '../../redux'

interface Props {

}

interface State {

}

export default class AppProvider extends React.Component<Props, State> {

    render () {
        return (
            <AppContainer>
                <Provider store={ReduxStore({})}>
                    {this.props.children as React.ReactElement<any>}                    
                </Provider>
            </AppContainer>
        )
    }

}