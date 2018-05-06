export default interface IAction {
    type: any;
    payload?: any;
    asyncDispatch?: Function;
}
