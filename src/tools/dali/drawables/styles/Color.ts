
export type Color = {
    kind: 'color',
    r: number,
    g: number,
    b: number,
}

export function rgb(
    r: number = 0,
    g: number = 0,
    b: number = 0,
): Color {
    return {
        kind: 'color',
        r,
        g,
        b,
    };
}

export function cssColorString(
    color: Color,
): string {
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
}

export const Colors = {
    Black: () => rgb(),
    DarkSlateGrey: () => rgb(47, 79, 79),
    Red: () => rgb(255, 0, 0),
    Orange: () => rgb(255, 165, 0),
    Yellow: () => rgb(255, 255, 0),
    Green: () => rgb(0, 255, 0),
    Blue: () => rgb(0, 0, 255),
    SkyBlue: () => rgb(135, 206, 235),
    MidnightBlue: () => rgb(25, 25, 112),
    Navy: () => rgb(0, 0, 128),
    DarkSlateBlue: () => rgb(72, 61, 139),
    Purple: () => rgb(128, 0, 128),
    Indigo: () => rgb(75, 0, 130),
    White: () => rgb(255, 255, 255),
    SaddleBrown: () => rgb(139, 69, 19),
    LawnGreen: () => rgb(124, 252, 0),
};