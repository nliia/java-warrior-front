import { ModalsStore } from "../reducers/Modals";
import { ModalsActions } from "../actions/creators/Modals";

export default interface ModalsProps {
    modalsState: ModalsStore
    modalsActions: ModalsActions
}