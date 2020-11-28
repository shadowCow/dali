
export enum DurationTypes {
    SINGLE = 'SINGLE',
    CYCLIC = 'CYCLIC',
}

export type Duration =
    Single |
    Cyclic;

export type Single = {
    kind: typeof DurationTypes.SINGLE,
    startMs: number,
    endMs: number,
}

export function createSingle(
    startMs: number,
    endMs: number,
): Single {
    return {
        kind: DurationTypes.SINGLE,
        startMs,
        endMs,
    };
}

export type Cyclic = {
    kind: typeof DurationTypes.CYCLIC,
    startMs: number;
    cycleDurationMs: number;
    numCycles: number;
}

export function createCyclic(
    startMs: number,
    cycleDurationMs: number,
    numCycles: number,
): Cyclic {
    return {
        kind: DurationTypes.CYCLIC,
        startMs,
        cycleDurationMs,
        numCycles,
    };
}
