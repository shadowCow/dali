import { assertNever } from '../../util/typeGuards';

export function create(
    a: number = 0,
    x: number = 0,
    y: number = 0,
): State {
    return { a, x, y };
}

export type State = {
    a: number,
    x: number,
    y: number,
}

export enum InputTypes {
    SET_ROTATION = 'SET_ROTATION',
    DELTA_ROTATION = 'DELTA_ROTATION',
}

export type Input =
    SetRotation |
    DeltaRotation;

export type SetRotation = {
    kind: typeof InputTypes.SET_ROTATION,
    state: State,
}

export function setRotation(
    a: number,
    x: number,
    y: number,
): SetRotation {
    return {
        kind: InputTypes.SET_ROTATION,
        state: { a, x, y },
    };
}

export type DeltaRotation = {
    kind: typeof InputTypes.DELTA_ROTATION,
    delta: State,
}

export function deltaRotation(
    da: number,
    dx: number,
    dy: number,
): DeltaRotation {
    return {
        kind: InputTypes.DELTA_ROTATION,
        delta: { a: da, x: dx, y: dy },
    };
}

export function transition(
    state: State,
    input: Input,
): State {
    switch (input.kind) {
        case InputTypes.SET_ROTATION:
            return input.state;
        case InputTypes.DELTA_ROTATION:
            return {
                a: state.a + input.delta.a,
                x: state.x + input.delta.x,
                y: state.y + input.delta.y,
            };
        default:
            assertNever(input);
    }
}
