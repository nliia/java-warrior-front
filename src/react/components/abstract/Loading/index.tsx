import * as React from 'react'

import './styles.scss'
import b_ from '../../../../utils/BEM';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LoadingsStore } from '../../../../redux/reducers/Loadings';
import { Reducers } from '../../../../redux/reducers';
import LoadingsProps from '../../../../redux/props/LoadingsProps';
import ReduxActions from '../../../../redux/actions'

interface Props extends LoadingsProps {
    name: string
}

const loading_ = b_('loading')

class Loading extends React.Component<Props> {

    componentWillMount () {
        let { name } = this.props;
        this.props.loadingsActions.set(name, false)
    }

    render () {
        let { loadingsState, name } = this.props;
        return (
            <div className={loading_()}>
                <div
                    data-text={(loadingsState[name] || {})['message']}
                    className={loading_({
                        elem: 'container',
                        mods: {
                            load: (loadingsState[name] || {})['value']
                        }
                    })
                }/>
                {this.props.children}
            </div> 
        );
    }

}

const mapStateToProps = (reducers: Reducers) => {
    return {
        loadingsState: reducers.Loadings
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadingsActions: bindActionCreators(ReduxActions.Creators.Loadings, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);