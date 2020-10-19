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
    SET_TRANSLATION = 'SET_TRANSLATION',
    DELTA_TRANSLATION = 'DELTA_TRANSLATION',
}

export type Input =
    SetTranslation |
    DeltaTranslation;

export type SetTranslation = {
    kind: typeof InputTypes.SET_TRANSLATION,
    state: State,
}

export function setTranslation(
    x: number,
    y: number,
): SetTranslation {
    return {
        kind: InputTypes.SET_TRANSLATION,
        state: { x, y },
    };
}

export type DeltaTranslation = {
    kind: typeof InputTypes.DELTA_TRANSLATION,
    delta: Vec2,
}

export function deltaTranslation(
    dx: number,
    dy: number,
): DeltaTranslation {
    return {
        kind: InputTypes.DELTA_TRANSLATION,
        delta: { x: dx, y: dy },
    };
}

export function transition(
    state: State,
    input: Input,
): State {
    switch (input.kind) {
        case InputTypes.SET_TRANSLATION:
            return input.state;
        case InputTypes.DELTA_TRANSLATION:
            return {
                x: state.x + input.delta.x,
                y: state.y + input.delta.y,
            };
        default:
            assertNever(input);
    }
}

