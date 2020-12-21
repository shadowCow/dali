import { VecXY } from "../../../../math/Vec";

export enum GeometricPrimitive2Kinds {
    TEXT = 'TEXT',
    ELLIPSE = 'ELLIPSE',
    RECT = 'RECT',
    LINE = 'LINE',
    POLYLINE = 'POLYLINE',
    POLYGON = 'POLYGON',
    PATH = 'PATH',
    IMAGE = 'IMAGE',
}

export type GeometricPrimitive2 =
    Text |
    Ellipse |
    Rect |
    Line |
    Polyline |
    Polygon |
    Path |
    Quad;

export type Text = {
    kind: typeof GeometricPrimitive2Kinds.TEXT,
    params: TextParams,
}

export type TextParams = {
    text: string,
    font?: Font,
}

export type Font = {
    size: number,
    family: string,
}

export function text(
    text: string,
    font?: Font,
): Text {
    return {
        kind: GeometricPrimitive2Kinds.TEXT,
        params: { text, font },
    };
}

export function fontString(
    font: Font,
): string {
    return `${font.size}px ${font.family}`;
}

export type Ellipse = {
  kind: typeof GeometricPrimitive2Kinds.ELLIPSE,
  params: EllipseParams,
}

export type EllipseParams = {
    rx: number,
    ry: number,
}

export function ellipse(
    rx: number,
    ry: number,
): Ellipse {
    return {
        kind: GeometricPrimitive2Kinds.ELLIPSE,
        params: { rx, ry },
    };
}

export function circle(
    r: number,
): Ellipse {
    return ellipse(r, r);
}

export type Rect = {
  kind: typeof GeometricPrimitive2Kinds.RECT,
  params: RectParams,
}

export type RectParams = {
    w: number,
    h: number,
    rx?: number,
    ry?: number
}

export function rect(
    w: number,
    h: number,
    rx?: number,
    ry?: number,
): Rect {
    return {
        kind: GeometricPrimitive2Kinds.RECT,
        params: { w, h, rx, ry },
    };
}

export type Line = {
  kind: typeof GeometricPrimitive2Kinds.LINE,
  params: LineParams,
}

export type LineParams = {
    toX: number,
    toY: number,
}

export function line(
    toX: number,
    toY: number,
): Line {
    return {
        kind: GeometricPrimitive2Kinds.LINE,
        params: { toX, toY },
    };
}

export type Polyline = {
  kind: typeof GeometricPrimitive2Kinds.POLYLINE,
  params: PolylineParams,
}

export type PolylineParams = {
    points: Array<VecXY>,
}

export function polyline(
    ...points: Array<VecXY>
): Polyline {
    return {
        kind: GeometricPrimitive2Kinds.POLYLINE,
        params: { points },
    };
}

export type Polygon = {
    kind: typeof GeometricPrimitive2Kinds.POLYGON,
    params: PolygonParams,
}

export type PolygonParams = {
    points: Array<VecXY>,
}

export function polygon(
    points: Array<VecXY>
): Polygon {
    return {
        kind: GeometricPrimitive2Kinds.POLYGON,
        params: { points },
    };
}

export type Path = {
    kind: typeof GeometricPrimitive2Kinds.PATH,
    params: PathParams,
}

export type PathParams = {
    segments: Array<PathSegment>
}

export function path(
    segments: Array<PathSegment>,
): Path {
    return {
        kind: GeometricPrimitive2Kinds.PATH,
        params: { segments },
    };
}

export enum PathSegmentTypes {
    MOVE_TO = 'MOVE_TO',
    LINE_TO = 'LINE_TO',
    BEZIER_CURVE_TO = 'BEZIER_CURVE_TO',
    QUADRATIC_CURVE_TO = 'QUADRATIC_CURVE_TO',
}

export type PathSegment =
  MoveTo |
  LineTo |
  BezierCurveTo |
  QuadraticCurveTo;

export type MoveTo = {
  kind: typeof PathSegmentTypes.MOVE_TO,
  x: number,
  y: number
}

export function moveTo(
    x: number,
    y: number
): MoveTo {
    return {
        kind: PathSegmentTypes.MOVE_TO,
        x,
        y,
    };
}

export type LineTo = {
  kind: typeof PathSegmentTypes.LINE_TO,
  x: number,
  y: number
}

export function lineTo(
    x: number,
    y: number
): LineTo {
    return {
        kind: PathSegmentTypes.LINE_TO,
        x,
        y,
    };
}

export type BezierCurveTo = {
  kind: typeof PathSegmentTypes.BEZIER_CURVE_TO,
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
        kind: PathSegmentTypes.BEZIER_CURVE_TO,
        cp1x,
        cp1y,
        cp2x,
        cp2y,
        toX,
        toY,
    };
}

export type QuadraticCurveTo = {
  kind: typeof PathSegmentTypes.QUADRATIC_CURVE_TO,
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
        kind: PathSegmentTypes.QUADRATIC_CURVE_TO,
        cpx,
        cpy,
        toX,
        toY,
    };
}

export type Quad = {
    kind: typeof GeometricPrimitive2Kinds.IMAGE,
    params: QuadParams,
}

export type QuadParams = {
    image: HTMLImageElement | ImageBitmap,
}

export function quadParams(
    image: HTMLImageElement | ImageBitmap,
): QuadParams {
    return {
        image,
    };
}

export function quad(
    image: HTMLImageElement | ImageBitmap,
): Quad {
    return {
        kind: GeometricPrimitive2Kinds.IMAGE,
        params: quadParams(image),
    };
}
