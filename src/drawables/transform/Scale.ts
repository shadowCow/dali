import { assertNever } from '../../util/typeGuards';

export function create(
    x: number = 1,
    y: number = 1,
): State {
    return { x, y };
}

export type State = {
    x: number,
    y: number,
}

export enum InputTypes {
    SET_SCALE = 'SET_SCALE',
    DELTA_SCALE = 'DELTA_SCALE',
}

export type Input =
    SetScale |
    DeltaScale;

export type SetScale = {
    kind: typeof InputTypes.SET_SCALE,
    state: State,
}

export function setScale(
    x: number,
    y: number,
): SetScale {
    return {
        kind: InputTypes.SET_SCALE,
        state: { x, y },
    };
}

export type DeltaScale = {
    kind: typeof InputTypes.DELTA_SCALE,
    delta: State,
}

export function deltaScale(
    x: number,
    y: number,
): DeltaScale {
    return {
        kind: InputTypes.DELTA_SCALE,
        delta: { x, y },
    };
}

export function transition(
    state: State,
    input: Input,
): State {
    switch (input.kind) {
        case InputTypes.SET_SCALE:
            return create(input.state.x, input.state.y);
        case InputTypes.DELTA_SCALE:
            return {
                x: state.x + input.delta.x,
                y: state.y + input.delta.y,
            };
        default:
            assertNever(input);
    }
}
