import { Drawable, StaticDrawable } from '../drawables/drawable';
import { assertNever } from '../util/patternMatching';

import * as SceneLayer from './SceneLayer';

export function staticScene(
    init?: Partial<State<StaticDrawable>>,
): State<StaticDrawable> {
    return {
        ...create<StaticDrawable>(),
        ...init,
    };
}

export function animatedScene(
    init?: Partial<State<Drawable>>,
): State<Drawable> {
    return {
        ...create<Drawable>(),
        ...init,
    };
}

function create<D extends Drawable>(): State<D> {
    return {
        layers: [],
    };
}

export type State<D extends Drawable> = {
    layers: SceneLayer.State<D>[],
}

export enum InputTypes {
    ADD_LAYER = 'ADD_LAYER',
    REMOVE_LAYER = 'REMOVE_LAYER',
    ADD_DRAWABLE_TO_LAYER = 'ADD_DRAWABLE_TO_LAYER',
    REMOVE_DRAWABLE_FROM_LAYER = 'REMOVE_DRAWABLE_FROM_LAYER',
    UPDATE_DRAWABLE_IN_LAYER = 'UPDATE_DRAWABLE_IN_LAYER',
}

export type Input<D extends Drawable> =
    AddLayer<D> |
    RemoveLayer |
    AddDrawableToLayer<D> |
    RemoveDrawableFromLayer |
    UpdateDrawableInLayer<D>;

export type AddLayer<D extends Drawable> = {
    kind: typeof InputTypes.ADD_LAYER,
    layer: SceneLayer.State<D>,
}

export function addLayer<D extends Drawable>(
    layer: SceneLayer.State<D>,
): AddLayer<D> {
    return {
        kind: InputTypes.ADD_LAYER,
        layer,
    };
}

export type RemoveLayer = {
    kind: typeof InputTypes.REMOVE_LAYER,
    id: string,
}

export function removeLayer(
    id: string,
): RemoveLayer {
    return {
        kind: InputTypes.REMOVE_LAYER,
        id,
    };
}

export type AddDrawableToLayer<D extends Drawable> = {
    kind: typeof InputTypes.ADD_DRAWABLE_TO_LAYER,
    layerId: string,
    drawable: D,
}

export function addDrawableToLayer<D extends Drawable>(
    layerId: string,
    drawable: D,
): AddDrawableToLayer<D> {
    return {
        kind: InputTypes.ADD_DRAWABLE_TO_LAYER,
        layerId,
        drawable,
    };
}

export type RemoveDrawableFromLayer = {
    kind: typeof InputTypes.REMOVE_DRAWABLE_FROM_LAYER,
    layerId: string,
    drawableId: string,
}

export function removeDrawableFromLayer(
    layerId: string,
    drawableId: string,
): RemoveDrawableFromLayer {
    return {
        kind: InputTypes.REMOVE_DRAWABLE_FROM_LAYER,
        layerId,
        drawableId,
    };
}

export type UpdateDrawableInLayer<D extends Drawable> = {
    kind: typeof InputTypes.UPDATE_DRAWABLE_IN_LAYER,
    layerId: string,
    drawable: D,
}

export function updateDrawableInLayer<D extends Drawable>(
    layerId: string,
    drawable: D,
): UpdateDrawableInLayer<D> {
    return {
        kind: InputTypes.UPDATE_DRAWABLE_IN_LAYER,
        layerId,
        drawable,
    };
}

export function transition<D extends Drawable>(
    state: State<D>,
    input: Input<D>,
): State<D> {
    switch (input.kind) {
        case InputTypes.ADD_LAYER:
            return onAddLayer(state, input);
        case InputTypes.REMOVE_LAYER:
            return onRemoveLayer(state, input);
        case InputTypes.ADD_DRAWABLE_TO_LAYER:
            return onAddDrawableToLayer(state, input);
        case InputTypes.REMOVE_DRAWABLE_FROM_LAYER:
            return onRemoveDrawableFromLayer(state, input);
        case InputTypes.UPDATE_DRAWABLE_IN_LAYER:
            return onUpdateDrawableInLayer(state, input);
        default:
            assertNever(input);
    }
}

function onAddLayer<D extends Drawable>(
    state: State<D>,
    input: AddLayer<D>,
): State<D> {
    return {
        layers: state.layers.concat(input.layer),
    };
}

function onRemoveLayer<D extends Drawable>(
    state: State<D>,
    input: RemoveLayer,
): State<D> {
    return {
        layers: state.layers.filter((layer) => layer.id !== input.id),
    };
}

function onAddDrawableToLayer<D extends Drawable>(
    state: State<D>,
    input: AddDrawableToLayer<D>,
): State<D> {
    return {
        layers: state.layers.map(layer => {
            if (layer.id === input.layerId) {
                return SceneLayer.transition(
                    layer,
                    SceneLayer.addDrawable(input.drawable),
                );
            } else {
                return layer;
            }
        }),
    };
}

function onRemoveDrawableFromLayer<D extends Drawable>(
    state: State<D>,
    input: RemoveDrawableFromLayer,
): State<D> {
    return {
        layers: state.layers.map(layer => {
            if (layer.id === input.layerId) {
                return SceneLayer.transition(
                    layer,
                    SceneLayer.removeDrawable(input.drawableId),
                );
            } else {
                return layer;
            }
        }),
    };
}

function onUpdateDrawableInLayer<D extends Drawable>(
    state: State<D>,
    input: UpdateDrawableInLayer<D>,
): State<D> {
    return {
        layers: state.layers.map(layer => {
            if (layer.id === input.layerId) {
                return SceneLayer.transition(
                    layer,
                    SceneLayer.updateDrawable(input.drawable),
                );
            } else {
                return layer;
            }
        }),
    };
}

export function render(
    animatedScene: State<Drawable>,
    t: number,
    dt: number,
): State<StaticDrawable> {
    return {
        layers: animatedScene.layers.map(layer => SceneLayer.render(layer, t, dt)),
    };
}