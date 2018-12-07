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
    name: COMMAND_NAMES.DRAW_PATH,
    params
  }
}

export {
  COMMAND_NAMES,
  drawEllipse,
  drawRect,
  drawLine,
  drawPolyline,
  drawPolygon,
  drawPath
}
