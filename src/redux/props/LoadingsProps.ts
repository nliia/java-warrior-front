import { LoadingsStore } from "../reducers/Loadings";
import { LoadingsActions } from "../actions/creators/Loadings";

export default interface LoadingsProps {
    loadingsState: LoadingsStore
    loadingsActions: LoadingsActions
}