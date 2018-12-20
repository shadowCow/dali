import Command from './command.js';

const COMMAND_NAMES = Object.freeze({
  DRAW_TEXT: 'draw_text',
  DRAW_ELLIPSE: 'draw_ellipse',
  DRAW_RECT: 'draw_rect',
  DRAW_LINE: 'draw_line',
  DRAW_POLYLINE: 'draw_polyline',
  DRAW_POLYGON: 'draw_polygon',
  DRAW_PATH: 'draw_path',
  DRAW_GROUP: 'draw_group',
})

interface PrimitiveShapeParams {
  id: string;
  drawParams: any;
  styles: Styles;
  transform: Transform;
}

interface DrawTextParams {
  x: number;
  y: number;
  text: string;
  font: string;
}

function drawText(
  id: string,
  drawParams: DrawTextParams,
  styles?: Styles,
  transform?: Transform
): Command<PrimitiveShapeParams> {
  let params = {
    id,
    drawParams,
    styles,
    transform
  }

  return {
    name: COMMAND_NAMES.DRAW_TEXT,
    params
  }
}

interface DrawEllipseParams {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}

function drawEllipse(
  id: string,
  drawParams: DrawEllipseParams,
  styles?: Styles,
  transform?: Transform
): Command<PrimitiveShapeParams> {
  let params = {
    id: id,
    drawParams,
    styles,
    transform
  }

  return {
    name: COMMAND_NAMES.DRAW_ELLIPSE,
    params
  }
}

interface DrawRectParams {
  x: number;
  y: number;
  width: number;
  height: number;
  rx?: number;
  ry?: number;
}

function drawRect(
  id: string,
  drawParams: DrawRectParams,
  styles?: Styles,
  transform?: Transform
): Command<PrimitiveShapeParams> {
  let params = {
    id: id,
    drawParams,
    styles,
    transform
  }

  return {
    name: COMMAND_NAMES.DRAW_RECT,
    params
  }
}

interface DrawLineParams {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

function drawLine(
  id: string,
  drawParams: DrawLineParams,
  styles?: Styles,
  transform?: Transform
): Command<PrimitiveShapeParams> {
  let params = {
    id,
    drawParams,
    styles,
    transform
  }
  
  return {
    name: COMMAND_NAMES.DRAW_LINE,
    params
  }
}

interface Point {
  x: number;
  y: number;
}

interface DrawPolylineParams {
  points: Array<Point>;
}

function drawPolyline(
  id: string,
  drawParams: DrawPolylineParams,
  styles?: Styles,
  transform?: Transform
): Command<PrimitiveShapeParams> {
  let params = {
    id,
    drawParams,
    styles,
    transform
  }

  return {
    name: COMMAND_NAMES.DRAW_POLYLINE,
    params
  }
}

interface DrawPolygonParams {
  points: Array<Point>;
}

function drawPolygon(
  id: string,
  drawParams: DrawPolygonParams,
  styles?: Styles,
  transform?: Transform
): Command<PrimitiveShapeParams> {
  let params = {
    id,
    drawParams,
    styles,
    transform
  }

  return {
    name: COMMAND_NAMES.DRAW_POLYGON,
    params
  }
}

interface PathSegment {
  type: string;
  [propName: string]: any;
}

interface DrawPathParams {
  startX: number;
  startY: number;
  segments: Array<PathSegment>;
}

function drawPath(
  id: string,
  drawParams: DrawPathParams,
  styles?: Styles,
  transform?: Transform
): Command<PrimitiveShapeParams> {
  let params = {
    id,
    drawParams,
    styles,
    transform
  }

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

interface DrawGroupParams {
  primitives: Array<Command<PrimitiveShapeParams>>
}

function drawGroup(
  id: string,
  drawParams: DrawGroupParams,
  styles?: Styles,
  transform?: Transform
): Command<PrimitiveShapeParams> {
  const params = {
    id,
    drawParams,
    styles,
    transform
  }

  return {
    name: COMMAND_NAMES.DRAW_GROUP,
    params
  }
}

interface Styles {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

enum TransformOps {
  TRANSLATE = 'translate',
  ROTATE = 'rotate',
  SCALE = 'scale',
  SKEW = 'skew'
}

interface Transform {
  transformOps: Array<TransformOp>;
}

interface TransformOp {
  type: string;
  [propName: string]: any;
}

function translate(
  x: number,
  y: number
): TransformOp {
  return {
    type: TransformOps.TRANSLATE,
    x,
    y
  }
}

function rotate(
  a: number,
  x: number,
  y: number
): TransformOp {
  return {
    type: TransformOps.ROTATE,
    a,
    x,
    y
  }
}

function scale(
  x: number,
  y: number
): TransformOp {
  return {
    type: TransformOps.SCALE,
    x,
    y
  }
}

function skew(
  x: number,
  y: number
): TransformOp {
  return {
    type: TransformOps.SKEW,
    x,
    y
  }
}

export {
  COMMAND_NAMES,
  drawGroup,
  drawText,
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
  quadraticCurvePathSegment,
  TransformOps,
  translate,
  rotate,
  scale,
  skew,
  Transform,
  TransformOp,
  Styles,
  PrimitiveShapeParams
}
