import { assertNever } from "../../util/typeGuards";

export type Styles =
    Stroke |
    Fill |
    StrokeAndFill;

export function defaultStyles(): Styles {
    return stroke();
}

export type Stroke = {
    typeTag: 'stroke',
    color: Color,
    width: number
}

export function stroke(
    color: Color = Colors.Black,
    width: number = 1
): Stroke {
    return {
        typeTag: 'stroke',
        color,
        width
    }
}

export type Fill = {
    typeTag: 'fill',
    color: Color,
}

export function fill(
    color: Color = Colors.Blue,
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
    strokeColor: Color = Colors.Black,
    strokeWidth: number = 1,
    fillColor: Color = Colors.Blue,
): StrokeAndFill {
    return {
        typeTag: 'stroke_and_fill',
        stroke: stroke(strokeColor, strokeWidth),
        fill: fill(fillColor)
    }
}

export type Color = {
    typeTag: 'color',
    r: number,
    g: number,
    b: number,
}

export function color(
    r: number = 0,
    g: number = 0,
    b: number = 0,
): Color {
    return {
        typeTag: 'color',
        r,
        g,
        b
    };
}

export function cssColorString(
    color: Color,
): string {
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
}

export type ColorConstants = Readonly<{
    [k: string]: Readonly<Color>;
}>;

export const Colors: ColorConstants = {
    Black: color(),
    Red: color(255, 0, 0),
    Green: color(0, 255, 0),
    Blue: color(0, 0, 255),
};

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