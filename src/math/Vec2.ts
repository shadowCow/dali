import { VecXY, vecXY } from "./Vec";

export type Vec2 = VecXY;
export const vec2 = vecXY;

/**
 * 
 * @param v 
 * @param radians positive is clockwise, negative is counter-clockwise
 */
export function rotated(
    v: Vec2,
    radians: number,
): Vec2 {
    const R = rotationMatrix(radians);

    return vec2(
        v.x * R.a + v.y * R.c,
        v.x * R.c + v.y * R.d,
    );
}

export type RotationMatrix2 = {
    a: number,
    b: number,
    c: number,
    d: number,
};

export function rotationMatrix(
    radians: number,
): RotationMatrix2 {
    return {
        a: Math.cos(radians),
        b: Math.sin(radians),
        c: -Math.sin(radians),
        d: Math.cos(radians),
    };
}
