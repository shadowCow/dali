import ActionTypes from '../actions/actionTypes'

const {
  DRAW_CIRCLE,
  DRAW_ELLIPSE,
  DRAW_RECT,
  DRAW_LINE,
  DRAW_POLYLINE,
  DRAW_POLYGON,
  DRAW_PATH,
} = ActionTypes

function drawCircle(state, action) {
  return addChildToRoot(state, action)
}

function drawEllipse(state, action) {
  return addChildToRoot(state, action)
}

function drawRect(state, action) {
  return addChildToRoot(state, action)
}

function drawLine(state, action) {
  return addChildToRoot(state, action)
}

function drawPolyline(state, action) {
  return addChildToRoot(state, action)
}

function drawPolygon(state, action) {
  return addChildToRoot(state, action)
}

function drawPath(state, action) {
  return addChildToRoot(state, action)
}

function addChildToRoot(state, action) {
  return {
    ...state,
    root: {
      children: [...state.root.children, action.id]
    },
    [action.id]: {
      ...action,
      type: getPaintingElementType(action.type),
    }
  }
}

function getPaintingElementType(actionType) {
  return actionType.split("_")[1]
}

function paintings(
  state = {
    root: { children: [] }
  }, action
) {
  switch (action.type) {
    case DRAW_CIRCLE: return drawCircle(state, action)
    case DRAW_ELLIPSE: return drawEllipse(state, action)
    case DRAW_RECT: return drawRect(state, action)
    case DRAW_LINE: return drawLine(state, action)
    case DRAW_POLYLINE: return drawPolyline(state, action)
    case DRAW_POLYGON: return drawPolygon(state, action)
    case DRAW_PATH: return drawPath(state, action)
    default: return state
  }
}

export default paintings
