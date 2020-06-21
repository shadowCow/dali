
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
    Red: () => Color;
    Green: () => Color;
    Blue: () => Color;
    White: () => Color;
}

export const Colors: ColorConstants = {
    Black: () => color(),
    Red: () => color(255, 0, 0),
    Green: () => color(0, 255, 0),
    Blue: () => color(0, 0, 255),
    White: () => color(255, 255, 255),
};