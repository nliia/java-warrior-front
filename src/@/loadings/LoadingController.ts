import * as React from 'react'
import { Reducers } from "../../redux/reducers";
import { bindActionCreators } from "redux";
import Actions from '../../redux/actions'
import { connect } from "react-redux";
import LoadingsProps from '../../redux/props/LoadingsProps';

export default function LoadingController<TFunction extends React.ComponentType> (target: TFunction) : any {

    const mapStateToProps = (state: Reducers) => {
        return {
            loadingsState: state.Loadings
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            loadingsActions: bindActionCreators(Actions.Creators.Loadings, dispatch)
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(target as React.ComponentType<LoadingsProps>);

}