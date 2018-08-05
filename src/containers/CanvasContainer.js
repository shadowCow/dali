import { connect } from 'react-redux'

import Canvas from '../components/Canvas'
import getInitialActions from '../stateInitializer'

const mapStateToProps = state => {
  return {
    paintings: state.paintings,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initializeState: () => {
      getInitialActions().forEach(a => dispatch(a))
    }
  }
}

const CanvasContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas)

export default CanvasContainer
