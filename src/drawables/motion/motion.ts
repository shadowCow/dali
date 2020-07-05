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