import ActionTypes from './actionTypes'
const {
  DRAW_CIRCLE,
  DRAW_ELLIPSE,
  DRAW_RECT,
  DRAW_LINE,
  DRAW_POLYLINE,
  DRAW_POLYGON,
  DRAW_PATH,
} = ActionTypes

function drawCircle(
  id,
  centerX,
  centerY,
  radius,
  fill,
  stroke,
  strokeWidth
) {
  let action = {
    type: DRAW_CIRCLE,
    id: id,
    centerX: centerX,
    centerY: centerY,
    radius: radius
  }
  if (fill) { action.fill = fill }
  if (stroke) { action.stroke = stroke }
  if (strokeWidth) { action.strokeWidth = strokeWidth }

  return action
}

function drawEllipse(
  id,
  centerX,
  centerY,
  radiusX,
  radiusY,
  fill,
  stroke,
  strokeWidth
) {
  let action = {
    type: DRAW_ELLIPSE,
    id: id,
    centerX: centerX,
    centerY: centerY,
    radiusX: radiusX,
    radiusY: radiusY
  }
  if (fill) { action.fill = fill }
  if (stroke) { action.stroke = stroke }
  if (strokeWidth) { action.strokeWidth = strokeWidth }

  return action
}

function drawRect(
  id,
  x,
  y,
  width,
  height,
  fill,
  stroke,
  strokeWidth
) {
  let action = {
    type: DRAW_RECT,
    id: id,
    x: x,
    y: y,
    width: width,
    height: height
  }
  if (fill) { action.fill = fill }
  if (stroke) { action.stroke = stroke }
  if (strokeWidth) { action.strokeWidth = strokeWidth }

  return action
}

function drawLine(
  id,
  x1,
  y1,
  x2,
  y2,
  fill,
  stroke,
  strokeWidth
) {
  let action = {
    type: DRAW_LINE,
    id: id,
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2
  }
  if (fill) { action.fill = fill }
  if (stroke) { action.stroke = stroke }
  if (strokeWidth) { action.strokeWidth = strokeWidth }

  return action
}

function drawPolyline(
  id,
  points,
  fill,
  stroke,
  strokeWidth
) {
  let action = {
    type: DRAW_POLYLINE,
    id: id,
    points: points
  }
  if (fill) { action.fill = fill }
  if (stroke) { action.stroke = stroke }
  if (strokeWidth) { action.strokeWidth = strokeWidth }

  return action
}

function drawPolygon(
  id,
  points,
  fill,
  stroke,
  strokeWidth
) {
  let action = {
    type: DRAW_POLYGON,
    id: id,
    points: points
  }
  if (fill) { action.fill = fill }
  if (stroke) { action.stroke = stroke }
  if (strokeWidth) { action.strokeWidth = strokeWidth }

  return action
}

function drawPath(
  id,
  d,
  fill,
  stroke,
  strokeWidth
) {
  let action = {
    type: DRAW_PATH,
    id: id,
    d: d
  }
  if (fill) { action.fill = fill }
  if (stroke) { action.stroke = stroke }
  if (strokeWidth) { action.strokeWidth = strokeWidth }

  return action
}

export default {
  drawCircle,
  drawEllipse,
  drawRect,
  drawLine,
  drawPolyline,
  drawPolygon,
  drawPath,
}
