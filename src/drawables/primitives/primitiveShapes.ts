import { Vec2 } from '../transform/Vec';

export enum PrimitiveTypes {
    TEXT = 'TEXT',
    ELLIPSE = 'ELLIPSE',
    RECT = 'RECT',
    LINE = 'LINE',
    POLYLINE = 'POLYLINE',
    POLYGON = 'POLYGON',
    EQUILATERAL_POLYGON = 'EQUILATERAL_POLYGON',
    PATH = 'PATH',
    IMAGE = 'IMAGE',
}

export type Primitive =
    Text |
    Ellipse |
    Rect |
    Line |
    Polyline |
    Polygon |
    EquilateralPolygon |
    Path |
    Image;

export type Text = {
    kind: typeof PrimitiveTypes.TEXT,
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
        kind: PrimitiveTypes.TEXT,
        params: { text, font },
    };
}

export function fontString(
    font: Font,
): string {
    return `${font.size}px ${font.family}`;
}

export type Ellipse = {
  kind: typeof PrimitiveTypes.ELLIPSE,
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
        kind: PrimitiveTypes.ELLIPSE,
        params: { rx, ry },
    };
}

export type Rect = {
  kind: typeof PrimitiveTypes.RECT,
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
        kind: PrimitiveTypes.RECT,
        params: { w, h, rx, ry },
    };
}

export type Line = {
  kind: typeof PrimitiveTypes.LINE,
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
        kind: PrimitiveTypes.LINE,
        params: { toX, toY },
    };
}

export type Polyline = {
  kind: typeof PrimitiveTypes.POLYLINE,
  params: PolylineParams,
}

export type PolylineParams = {
    points: Array<Vec2>,
}

export function polyline(
    ...points: Array<Vec2>
): Polyline {
    return {
        kind: PrimitiveTypes.POLYLINE,
        params: { points },
    };
}

export type Polygon = {
    kind: typeof PrimitiveTypes.POLYGON,
    params: PolygonParams,
}

export type PolygonParams = {
    points: Array<Vec2>,
}

export function polygon(
    ...points: Array<Vec2>
): Polygon {
    return {
        kind: PrimitiveTypes.POLYGON,
        params: { points },
    };
}

export type EquilateralPolygon = {
    kind: typeof PrimitiveTypes.EQUILATERAL_POLYGON,
    params: EquilateralPolygonParams,
}

export type EquilateralPolygonParams = {
    n: number,
    radius: number,
}

export function equilateralPolygon(
    n: number,
    radius: number,
): EquilateralPolygon {
    return {
        kind: PrimitiveTypes.EQUILATERAL_POLYGON,
        params: { n, radius },
    };
}

export type Path = {
    kind: typeof PrimitiveTypes.PATH,
    params: PathParams,
}

export type PathParams = {
    segments: Array<PathSegment>
}

export function path(
    segments: Array<PathSegment>,
): Path {
    return {
        kind: PrimitiveTypes.PATH,
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

export type Image = {
    kind: typeof PrimitiveTypes.IMAGE,
    params: ImageParams,
}

export type ImageParams = {
    image: HTMLImageElement
}

export function imageParams(
    image: HTMLImageElement,
): ImageParams {
    return {
        image,
    };
}

export function image(
    image: HTMLImageElement,
): Image {
    return {
        kind: PrimitiveTypes.IMAGE,
        params: imageParams(image),
    };
}
