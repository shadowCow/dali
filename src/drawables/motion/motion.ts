import * as MathExt from '../../math/MathExt';

export function oscillator(
    min: number,
    max: number,
    oscillationsPerSecond: number,
): (dt: number) => number {
    let totalDt = 0;

    const sinFn = MathExt.sinFnMinToMax(min, max);

    return (dt) => {
        totalDt += dt;
        const totalDistance = totalDt * (oscillationsPerSecond / 1000);

        return sinFn(MathExt.radians(totalDistance));
    };
}

export function cycle(
    min: number,
    max: number,
    repetitionsPerSecond: number,
): (dt: number) => number {
    let totalDt = 0;
    let range = max - min;

    return (dt) => {
        totalDt += dt;
        const offset = (totalDt * (repetitionsPerSecond / 1000)) % range;

        return min + offset;
    };
}