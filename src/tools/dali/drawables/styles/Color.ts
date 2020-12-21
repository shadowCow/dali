
export type Color = {
    kind: 'color',
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

export type ColorConstants = {
    Black: () => Color;
    DarkSlateGrey: () => Color;
    Red: () => Color;
    Orange: () => Color;
    Yellow: () => Color;
    Green: () => Color;
    Blue: () => Color;
    SkyBlue: () => Color;
    MidnightBlue: () => Color;
    Navy: () => Color;
    DarkSlateBlue: () => Color;
    Purple: () => Color;
    Indigo: () => Color;
    White: () => Color;
    SaddleBrown: () => Color;
    LawnGreen: () => Color;
}

export const Colors: ColorConstants = {
    Black: () => color(),
    DarkSlateGrey: () => color(47, 79, 79),
    Red: () => color(255, 0, 0),
    Orange: () => color(255, 165, 0),
    Yellow: () => color(255, 255, 0),
    Green: () => color(0, 255, 0),
    Blue: () => color(0, 0, 255),
    SkyBlue: () => color(135, 206, 235),
    MidnightBlue: () => color(25, 25, 112),
    Navy: () => color(0, 0, 128),
    DarkSlateBlue: () => color(72, 61, 139),
    Purple: () => color(128, 0, 128),
    Indigo: () => color(75, 0, 130),
    White: () => color(255, 255, 255),
    SaddleBrown: () => color(139, 69, 19),
    LawnGreen: () => color(124, 252, 0),
};