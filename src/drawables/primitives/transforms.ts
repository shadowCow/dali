
export type Transform =
    Translate |
    Rotate |
    Scale |
    Skew;

export type Translate = {
    typeTag: 'translate',
    x: number,
    y: number
}

export function translate(
    x: number = 0,
    y: number = 0,
): Translate {
    return {
        typeTag: 'translate',
        x,
        y,
    };
}

export type Rotate = {
    typeTag: 'rotate',
    a: number,
    x: number,
    y: number
}

export function rotate(
    a: number = 0,
    x: number = 0,
    y: number = 0,
): Rotate {
    return {
        typeTag: 'rotate',
        a,
        x,
        y,
    };
}

export type Scale = {
    typeTag: 'scale',
    x: number,
    y: number
}

export function scale(
    x: number = 1,
    y: number = 1
): Scale {
    return {
        typeTag: 'scale',
        x,
        y,
    };
}

export type Skew = {
    typeTag: 'skew',
    x: number,
    y: number
}

export function skew(
    x: number = 0,
    y: number = 0,
): Skew {
    return {
        typeTag: 'skew',
        x,
        y,
    };
}