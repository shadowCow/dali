import { Drawable, DrawableTypes, StaticDrawable } from '../drawables/drawable';
import { assertNever } from '../util/patternMatching';

export function staticLayer(
    id: string,
    init?: Partial<Omit<State<StaticDrawable>, 'id'>>,
): State<StaticDrawable> {
    return {
        ...create<StaticDrawable>(id),
        ...init,
    };
}

export function animatedLayer(
    id: string,
    init?: Partial<Omit<State<Drawable>, 'id'>>,
): State<Drawable> {
    return {
        ...create<Drawable>(id),
        ...init,
    };
}

export function toState(
    drawables: Drawable[],
): Omit<State<Drawable>, 'id'> {
    const collection: Omit<State<Drawable>, 'id'> = {
        drawables: {},
        drawOrder: [],
    };

    drawables.forEach(d => {
        collection.drawables[d.id] = d;
        collection.drawOrder.push(d.id);
    });

    return collection;
}

function create<D extends Drawable>(
    id: string,
): State<D> {
    return {
        id,
        drawables: {},
        drawOrder: [],
    };
}

export type State<D extends Drawable> = {
    id: string,
    drawables: { [id: string]: D },
    drawOrder: string[],
}

export enum InputTypes {
    ADD_DRAWABLE = 'ADD_DRAWABLE',
    REMOVE_DRAWABLE = 'REMOVE_DRAWABLE',
    UPDATE_DRAWABLE = 'UPDATE_DRAWABLE',
}

export type Input<D extends Drawable> =
    AddDrawable<D> |
    RemoveDrawable |
    UpdateDrawable<D>;

export type AddDrawable<D extends Drawable> = {
    kind: typeof InputTypes.ADD_DRAWABLE,
    drawable: D,
}

export function addDrawable<D extends Drawable>(
    drawable: D,
): AddDrawable<D> {
    return {
        kind: InputTypes.ADD_DRAWABLE,
        drawable,
    };
}

export type RemoveDrawable = {
    kind: typeof InputTypes.REMOVE_DRAWABLE,
    id: string,
}

export function removeDrawable(
    id: string,
): RemoveDrawable {
    return {
        kind: InputTypes.REMOVE_DRAWABLE,
        id,
    };
}

export type UpdateDrawable<D extends Drawable> = {
    kind: typeof InputTypes.UPDATE_DRAWABLE,
    drawable: D,
}

export function updateDrawable<D extends Drawable>(
    drawable: D,
): UpdateDrawable<D> {
    return {
        kind: InputTypes.UPDATE_DRAWABLE,
        drawable,
    };
}

export function transition<D extends Drawable>(
    state: State<D>,
    input: Input<D>,
): State<D> {
    switch (input.kind) {
        case InputTypes.ADD_DRAWABLE:
            return onAddDrawable(state, input);
        case InputTypes.REMOVE_DRAWABLE:
            return onRemoveDrawable(state, input);
        case InputTypes.UPDATE_DRAWABLE:
            return onUpdateDrawable(state, input);
        default:
            assertNever(input);
    }
}

function onAddDrawable<D extends Drawable>(
    state: State<D>,
    input: AddDrawable<D>,
): State<D> {
    return {
        ...state,
        drawables: {
            ...state.drawables,
            [input.drawable.id]: input.drawable,
        },
        drawOrder: state.drawOrder.concat(input.drawable.id),
    };
}

function onRemoveDrawable<D extends Drawable>(
    state: State<D>,
    input: RemoveDrawable,
): State<D> {
    const drawablesCopy = { ...state.drawables };
    delete drawablesCopy[input.id];

    return {
        ...state,
        drawables: drawablesCopy,
        drawOrder: state.drawOrder.filter(id => id !== input.id),
    };
}

function onUpdateDrawable<D extends Drawable>(
    state: State<D>,
    input: UpdateDrawable<D>,
): State<D> {
    return {
        ...state,
        drawables: {
            ...state.drawables,
            [input.drawable.id]: input.drawable,
        },
    };
}

export function render(
    animatedLayer: State<Drawable>,
    t: number,
    dt: number,
): State<StaticDrawable> {
    const staticDrawables: { [id: string]: StaticDrawable } = {};
    Object.keys(animatedLayer.drawables).forEach(key => {
        staticDrawables[key] = renderDrawable(
            animatedLayer.drawables[key],
            t,
            dt,
        );
    });

    return {
        ...animatedLayer,
        drawables: staticDrawables,
    };
}

function renderDrawable(
    d: Drawable,
    t: number,
    dt: number,
): StaticDrawable {
    switch (d.kind) {
        case DrawableTypes.PRIMITIVE_DRAWABLE:
        case DrawableTypes.COMPOSITE_DRAWABLE:
            return d;
        case DrawableTypes.ANIMATED_DRAWABLE:
            return d.animation(t,dt);
        default:
            assertNever(d);
    }
}
