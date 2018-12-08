const COMMAND_NAMES = Object.freeze({
  DRAW_ELLIPSE: 'draw_ellipse',
  DRAW_RECT: 'draw_rect',
  DRAW_LINE: 'draw_line',
  DRAW_POLYLINE: 'draw_polyline',
  DRAW_POLYGON: 'draw_polygon',
  DRAW_PATH: 'draw_path',
})

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
  let params = {
    id: id,
    centerX: centerX,
    centerY: centerY,
    radiusX: radiusX,
    radiusY: radiusY
  }
  if (fill) { params.fill = fill }
  if (stroke) { params.stroke = stroke }
  if (strokeWidth) { params.strokeWidth = strokeWidth }

  return {
    name: COMMAND_NAMES.DRAW_ELLIPSE,
    params
  }
}

function drawRect(
  id,
  x,
  y,
  width,
  height,
  rx,
  ry,
  fill,
  stroke,
  strokeWidth
) {
  let params = {
    id: id,
    x: x,
    y: y,
    width: width,
    height: height,
    rx: rx,
    ry: ry
  }
  if (fill) { params.fill = fill }
  if (stroke) { params.stroke = stroke }
  if (strokeWidth) { params.strokeWidth = strokeWidth }

  return {
    name: COMMAND_NAMES.DRAW_RECT,
    params
  }
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
  let params = {
    id: id,
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2
  }
  if (fill) { params.fill = fill }
  if (stroke) { params.stroke = stroke }
  if (strokeWidth) { params.strokeWidth = strokeWidth }

  return {
    name: COMMAND_NAMES.DRAW_LINE,
    params
  }
}

function drawPolyline(
  id,
  points,
  fill,
  stroke,
  strokeWidth
) {
  let params = {
    id: id,
    points: points
  }
  if (fill) { params.fill = fill }
  if (stroke) { params.stroke = stroke }
  if (strokeWidth) { params.strokeWidth = strokeWidth }

  return {
    name: COMMAND_NAMES.DRAW_POLYLINE,
    params
  }
}

function drawPolygon(
  id,
  points,
  fill,
  stroke,
  strokeWidth
) {
  let params = {
    id: id,
    points: points
  }
  if (fill) { params.fill = fill }
  if (stroke) { params.stroke = stroke }
  if (strokeWidth) { params.strokeWidth = strokeWidth }

  return {
    name: COMMAND_NAMES.DRAW_POLYGON,
    params
  }
}

function drawPath(
  id,
  startX,
  startY,
  segments,
  fill,
  stroke,
  strokeWidth
) {
  let params = {
    id,
    startX,
    startY,
    segments
  }
  if (fill) { params.fill = fill }
  if (stroke) { params.stroke = stroke }
  if (strokeWidth) { params.strokeWidth = strokeWidth }

  return {
    name: COMMAND_NAMES.DRAW_PATH,
    params
  }
}

const SEGMENT_TYPES = Object.freeze({
  MOVE_TO: "move_to",
  LINE_TO: 'line_to',
  BEZIER_CURVE_TO: 'bezier_curve_to',
  QUADRATIC_CURVE_TO: 'quadratic_curve_to'
});

function moveToPathSegment(
  x,
  y
) {
  return {
    type: SEGMENT_TYPES.MOVE_TO,
    x,
    y
  }
}

function linePathSegment(
  toX,
  toY
) {
  return {
    type: SEGMENT_TYPES.LINE_TO,
    toX,
    toY
  }
}

function bezierCurvePathSegment(
  cp1x,
  cp1y,
  cp2x,
  cp2y,
  toX,
  toY
) {
  return {
    type: SEGMENT_TYPES.BEZIER_CURVE_TO,
    cp1x,
    cp1y,
    cp2x,
    cp2y,
    toX,
    toY
  }
}

function quadraticCurvePathSegment(
  cpx,
  cpy,
  toX,
  toY
) {
  return {
    type: SEGMENT_TYPES.QUADRATIC_CURVE_TO,
    cpx,
    cpy,
    toX,
    toY
  }
}

export {
  COMMAND_NAMES,
  drawEllipse,
  drawRect,
  drawLine,
  drawPolyline,
  drawPolygon,
  drawPath,
  SEGMENT_TYPES,
  moveToPathSegment,
  linePathSegment,
  bezierCurvePathSegment,
  quadraticCurvePathSegment
}
