
export type Primitive =
    Text |
    Ellipse |
    Rect |
    Line |
    Polyline |
    Polygon |
    Path;

export type Text = {
    typeTag: 'text',
    x: number,
    y: number,
    text: string,
    font: string
}

export function text(
    x: number,
    y: number,
    text: string,
    font: string
): Text {
  return {
      typeTag: 'text',
      x,
      y,
      text,
      font
  }
}

export type Ellipse = {
    typeTag: 'ellipse',
    cx: number,
    cy: number,
    rx: number,
    ry: number
}

export function ellipse(
    cx: number,
    cy: number,
    rx: number,
    ry: number
): Ellipse {
    return {
        typeTag: 'ellipse',
        cx,
        cy,
        rx,
        ry
    }
}

export type Rect = {
    typeTag: 'rect',
    x: number,
    y: number,
    width: number,
    height: number,
    rx?: number,
    ry?: number
}

export function rect(
  x: number,
    y: number,
    width: number,
    height: number,
    rx?: number,
    ry?: number
): Rect {
  return {
    typeTag: 'rect',
    x,
    y,
    width,
    height,
    rx,
    ry
  }
}

export type Line = {
  typeTag: 'line',
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export function line(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): Line {
  return {
    typeTag: 'line',
    x1,
    y1,
    x2,
    y2
  }
}

export type Point2D = {
  x: number,
  y: number
}


export type Polyline = {
  typeTag: 'polyline',
  points: Array<Point2D>;
}

function polyline(
  ...points: Array<Point2D>
): Polyline {
  return {
    typeTag: 'polyline',
    points
  }
}

export type Polygon = {
  typeTag: 'polygon',
  points: Array<Point2D>;
}

export function polygon(
  ...points: Array<Point2D>
): Polygon {
  return {
    typeTag: 'polygon',
    points
  }
}

export type Path = {
  typeTag: 'path',
  startX: number,
  startY: number,
  segments: Array<PathSegment>
}

export function path(
  startX: number,
  startY: number,
  segments: Array<PathSegment>
): Path {
  return {
    typeTag: 'path',
    startX,
    startY,
    segments
  }
}

export type PathSegment =
  MoveTo |
  LineTo |
  BezierCurveTo |
  QuadraticCurveTo;

export type MoveTo = {
  typeTag: 'move_to',
  x: number,
  y: number
}

export function moveTo(
  x: number,
  y: number
): MoveTo {
  return {
    typeTag: 'move_to',
    x,
    y
  }
}

export type LineTo = {
  typeTag: 'line_to',
  x: number,
  y: number
}

export function lineTo(
  x: number,
  y: number
): LineTo {
  return {
    typeTag: 'line_to',
    x,
    y
  }
}

export type BezierCurveTo = {
  typeTag: 'bezier_curve_to',
  cp1x: number,
  cp1y: number,
  cp2x: number,
  cp2y: number,
  toX: number,
  toY: number
}

export function bezierCurveTo(
  cp1x: number,
  cp1y: number,
  cp2x: number,
  cp2y: number,
  toX: number,
  toY: number
): BezierCurveTo {
  return {
    typeTag: 'bezier_curve_to',
    cp1x,
    cp1y,
    cp2x,
    cp2y,
    toX,
    toY
  }
}

export type QuadraticCurveTo = {
  typeTag: 'quadratic_curve_to',
  cpx: number,
  cpy: number,
  toX: number,
  toY: number
}

export function quadraticCurveTo(
  cpx: number,
  cpy: number,
  toX: number,
  toY: number
): QuadraticCurveTo {
  return {
    typeTag: 'quadratic_curve_to',
    cpx,
    cpy,
    toX,
    toY
  }
}
