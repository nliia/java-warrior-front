import { connect } from "react-redux"

let MapDispatch = (mapDispatchToProps, options) => {
    const mapStateToProps = () => ({})
    return connect(mapStateToProps, mapDispatchToProps)
}

export default MapDispatch