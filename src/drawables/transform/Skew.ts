import { Vec2 } from './Vec';
import { assertNever } from '../../util/patternMatching';

export function create(
    x: number = 0,
    y: number = 0,
): State {
    return { x, y };
}

export type State = Vec2;

export enum InputTypes {
    SET_SKEW = 'SET_SKEW',
    DELTA_SKEW = 'DELTA_SKEW',
}

export type Input =
    SetSkew |
    DeltaSkew;

export type SetSkew = {
    kind: typeof InputTypes.SET_SKEW,
    state: State,
}

export function setSkew(
    x: number,
    y: number,
): SetSkew {
    return {
        kind: InputTypes.SET_SKEW,
        state: { x, y },
    };
}

export type DeltaSkew = {
    kind: typeof InputTypes.DELTA_SKEW,
    delta: Vec2,
}

export function deltaSkew(
    dx: number,
    dy: number,
): DeltaSkew {
    return {
        kind: InputTypes.DELTA_SKEW,
        delta: { x: dx, y: dy },
    };
}

export function transition(
    state: State,
    input: Input,
): State {
    switch (input.kind) {
        case InputTypes.SET_SKEW:
            return input.state;
        case InputTypes.DELTA_SKEW:
            return {
                x: state.x + input.delta.x,
                y: state.y + input.delta.y,
            };
        default:
            assertNever(input);
    }
}