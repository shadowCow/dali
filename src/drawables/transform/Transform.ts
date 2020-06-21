import * as Translate from './Translate';
import * as Rotate from './Rotate';
import * as Scale from './Scale';
import * as Skew from './Skew';
import { assertNever } from '../../util/typeGuards';

export function create(
    init: Partial<State> = {},
): State {
    const defaults = {
        translate: Translate.create(),
        rotate: Rotate.create(),
        scale: Scale.create(),
        skew: Skew.create(),
    };

    return {
        ...defaults,
        ...init,
    };
}

export type State = {
    translate: Translate.State,
    rotate: Rotate.State,
    scale: Scale.State,
    skew: Skew.State,
}

export type Input =
    Translate.Input |
    Rotate.Input |
    Scale.Input |
    Skew.Input;

export function transition(
    state: State,
    input: Input,
): State {
    switch (input.kind) {
        case Translate.InputTypes.SET_TRANSLATION:
        case Translate.InputTypes.DELTA_TRANSLATION:
            return {
                ...state,
                translate: Translate.transition(state.translate, input),
            };
        case Rotate.InputTypes.SET_ROTATION:
        case Rotate.InputTypes.DELTA_ROTATION:
            return {
                ...state,
                rotate: Rotate.transition(state.rotate, input),
            };
        case Scale.InputTypes.SET_SCALE:
        case Scale.InputTypes.DELTA_SCALE:
            return {
                ...state,
                scale: Scale.transition(state.scale, input),
            };
        case Skew.InputTypes.SET_SKEW:
        case Skew.InputTypes.DELTA_SKEW:
            return {
                ...state,
                skew: Skew.transition(state.skew, input),
            };
        default:
            assertNever(input);
    }
}
