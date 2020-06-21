import { Vec2 } from '../transform/Vec';

export type Primitive =
  Text |
  Ellipse |
  Rect |
  Line |
  Polyline |
  Polygon |
  Path;

export type Text = {
  kind: 'text',
  x: number,
  y: number,
  text: string
  font: string
}

export function text(
    x: number,
    y: number,
    text: string,
    font: string = '50px serif',
): Text {
    return {
        kind: 'text',
        x,
        y,
        text,
        font,
    };
}

export type Ellipse = {
  kind: 'ellipse',
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
        kind: 'ellipse',
        cx,
        cy,
        rx,
        ry,
    };
}

export type Rect = {
  kind: 'rect',
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
        kind: 'rect',
        x,
        y,
        width,
        height,
        rx,
        ry,
    };
}

export type Line = {
  kind: 'line',
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
        kind: 'line',
        x1,
        y1,
        x2,
        y2,
    };
}

export type Polyline = {
  kind: 'polyline',
  points: Array<Vec2>;
}

export function polyline(
    ...points: Array<Vec2>
): Polyline {
    return {
        kind: 'polyline',
        points,
    };
}

export type Polygon = {
  kind: 'polygon',
  points: Array<Vec2>;
}

export function polygon(
    ...points: Array<Vec2>
): Polygon {
    return {
        kind: 'polygon',
        points,
    };
}

export type Path = {
  kind: 'path',
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
        kind: 'path',
        startX,
        startY,
        segments,
    };
}

export type PathSegment =
  MoveTo |
  LineTo |
  BezierCurveTo |
  QuadraticCurveTo;

export type MoveTo = {
  kind: 'move_to',
  x: number,
  y: number
}

export function moveTo(
    x: number,
    y: number
): MoveTo {
    return {
        kind: 'move_to',
        x,
        y,
    };
}

export type LineTo = {
  kind: 'line_to',
  x: number,
  y: number
}

export function lineTo(
    x: number,
    y: number
): LineTo {
    return {
        kind: 'line_to',
        x,
        y,
    };
}

export type BezierCurveTo = {
  kind: 'bezier_curve_to',
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
        kind: 'bezier_curve_to',
        cp1x,
        cp1y,
        cp2x,
        cp2y,
        toX,
        toY,
    };
}

export type QuadraticCurveTo = {
  kind: 'quadratic_curve_to',
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
        kind: 'quadratic_curve_to',
        cpx,
        cpy,
        toX,
        toY,
    };
}
