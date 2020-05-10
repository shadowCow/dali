import { assertNever } from "../../util/typeGuards";

export type Styles =
    Stroke |
    Fill |
    StrokeAndFill;

export type Stroke = {
    typeTag: 'stroke',
    color: string,
    width: number
}

export function stroke(
    color: string,
    width: number
): Stroke {
    return {
        typeTag: 'stroke',
        color,
        width
    }
}

export type Fill = {
    typeTag: 'fill',
    color: string
}

export function fill(
    color: string
): Fill {
    return {
        typeTag: 'fill',
        color
    }
}

export type StrokeAndFill = {
    typeTag: 'stroke_and_fill'
    stroke: Stroke,
    fill: Fill;
}

export function strokeAndFill(
    strokeColor: string,
    strokeWidth: number,
    fillColor: string
): StrokeAndFill {
    return {
        typeTag: 'stroke_and_fill',
        stroke: stroke(strokeColor, strokeWidth),
        fill: fill(fillColor)
    }
}

export function matchStyles(
    styles: Styles,
    handler: MatchStylesHandler
): void {
    switch (styles.typeTag) {
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