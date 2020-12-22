import { assertNever } from '../../../../util/patternMatching';
import { Color, Colors, Paint } from './Color';

export type Styles =
    Stroke |
    Fill |
    StrokeAndFill;

export function createStyles(): Styles {
    return stroke();
}

export type Stroke = {
    kind: 'stroke',
    color: Color,
    width: number
}

export function stroke(
    color: Color = Colors.Black(),
    width: number = 1
): Stroke {
    return {
        kind: 'stroke',
        color,
        width,
    };
}

export type Fill = {
    kind: 'fill',
    color: Paint,
}

export function fill(
    color: Paint = Colors.Blue(),
): Fill {
    return {
        kind: 'fill',
        color,
    };
}

export type StrokeAndFill = {
    kind: 'stroke_and_fill'
    stroke: Stroke,
    fill: Fill;
}

export function strokeAndFill(
    strokeColor: Color = Colors.Black(),
    strokeWidth: number = 1,
    fillColor: Paint = Colors.Blue(),
): StrokeAndFill {
    return {
        kind: 'stroke_and_fill',
        stroke: stroke(strokeColor, strokeWidth),
        fill: fill(fillColor),
    };
}

export function matchStyles(
    styles: Styles,
    handler: MatchStylesHandler
): void {
    switch (styles.kind) {
        case 'stroke':
            handler.stroke(styles);
            break;
        case 'fill':
            handler.fill(styles);
            break;
        case 'stroke_and_fill':
            handler.strokeAndFill(styles);
            break;
        default:
            assertNever(styles);
    }
}

export type MatchStylesHandler = {
    stroke: (styles: Stroke) => void,
    fill: (styles: Fill) => void,
    strokeAndFill: (styles: StrokeAndFill) => void
}
