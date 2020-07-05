
export function sinFn(
    params: Partial<SinParams>,
): (angle: number) => number {
    const amplitudeScale = params.amplitudeScale || 1;
    const phaseShift = params.phaseShift || 0;
    const verticalShift = params.verticalShift || 0;
    
    return (angle: number) => {
        return (amplitudeScale * Math.sin(angle + phaseShift)) + verticalShift;
    };
}

export type SinParams = {
    amplitudeScale: number,
    phaseShift: number,
    verticalShift: number,
}

export function sinFnMinToMax(
    min: number,
    max: number,
): (a: number) => number {
    return sinFn({
        amplitudeScale: 0.5 * (max - min),
        phaseShift: (-1) * (Math.PI / 2),
        verticalShift: 0.5 * (max - min) + min,
    });
}

export function sinFnZeroToN(n: number): (a: number) => number {
    return sinFn({
        amplitudeScale: 0.5 * n,
        phaseShift: (-1) * (Math.PI / 2),
        verticalShift: 0.5 * n,
    });
}

export function sinZeroToOne(a: number): number {
    return sinFn({
        amplitudeScale: 0.5,
        phaseShift: (-1) * (Math.PI / 2),
        verticalShift: 0.5,
    })(a);
}

export function toRad(d: number): number {
    return (d / 180) * Math.PI;
}

export function toDeg(r: number): number {
    return (r / Math.PI) * 180;
}

export function radians(n: number): number {
    return n * Math.PI;
}