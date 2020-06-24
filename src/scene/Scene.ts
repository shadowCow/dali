import { Drawable, CompositeDrawable, PrimitiveDrawable } from '../drawables/drawable';
import { assertNever } from '../util/typeGuards';
import { AnimatedTransform, AnimatedPrimitive, AnimationTypes, interpolateTransition, AnimatedStyles } from '../drawables/animation/Animation';
import * as Transform from '../drawables/transform/Transform';
import * as Interpolator from '../drawables/animation/Interpolator';

export function create(): State {
    return {
        drawables: {},
        drawOrder: [],
    };
}

export type State = {
    drawables: { [id: string]: Drawable },
    drawOrder: string[],
}

export enum InputTypes {
    ADD_DRAWABLE = 'ADD_DRAWABLE',
    REMOVE_DRAWABLE = 'REMOVE_DRAWABLE',
    ANIMATE_DRAWABLE = 'ANIMATE_DRAWABLE',
    UPDATE = 'UPDATE',
}

export type Input =
    AddDrawable |
    RemoveDrawable |
    AnimateDrawable |
    Update;

export type AddDrawable = {
    kind: typeof InputTypes.ADD_DRAWABLE,
    drawable: Drawable,
}

export function addDrawable(
    drawable: Drawable,
): AddDrawable {
    return {
        kind: InputTypes.ADD_DRAWABLE,
        drawable,
    };
}

export type RemoveDrawable = {
    kind: typeof InputTypes.REMOVE_DRAWABLE,
    id: string,
}

export type AnimateDrawable = {
    kind: typeof InputTypes.ANIMATE_DRAWABLE,
}

export type Update = {
    kind: typeof InputTypes.UPDATE,
    timestampMs: number,
    dt: number,
}

export function update(
    timestampMs: number,
    dt: number,
): Update {
    return {
        kind: InputTypes.UPDATE,
        timestampMs,
        dt,
    };
}

export function transition(
    state: State,
    input: Input,
): void {
    switch (input.kind) {
        case InputTypes.ADD_DRAWABLE:
            return onAddDrawable(state, input);
        case InputTypes.REMOVE_DRAWABLE:
            return onRemoveDrawable(state, input);
        case InputTypes.ANIMATE_DRAWABLE:
            return onAnimateDrawable(state, input);
        case InputTypes.UPDATE:
            return onUpdate(state, input);
        default:
            assertNever(input);
    }
}

function onAddDrawable(
    state: State,
    input: AddDrawable,
): void {
    state.drawables[input.drawable.id] = input.drawable;
    state.drawOrder.push(input.drawable.id);
}

function onRemoveDrawable(
    state: State,
    input: RemoveDrawable,
) {
    delete state.drawables[input.id];

    const index = state.drawOrder.indexOf(input.id);

    if (index > -1) {
        state.drawOrder.splice(index, 1);
    }
}

function onAnimateDrawable(
    state: State,
    input: AnimateDrawable,
) {
    throw new Error('not implemented');
}

function onUpdate(
    state: State,
    input: Update,
) {
    updateDrawables(
        input.timestampMs,
        input.dt,
        Object.values(state.drawables),
    );

    // remove expired animations?
}

function updateDrawables(
    timestampMs: number,
    dt: number,
    drawables: Drawable[]
): void {
    drawables.forEach(drawable => {
        switch (drawable.kind) {
            case 'composite_drawable':
                updateCompositeDrawable(timestampMs, dt, drawable);
                break;
            case 'primitive_drawable':
                updatePrimitiveDrawable(timestampMs, dt, drawable);
                break;
            default:
                assertNever(drawable);
        }
    });
}

function updateCompositeDrawable(
    timestampMs: number,
    dt: number,
    compositeDrawable: CompositeDrawable,
): void {
    if (compositeDrawable.styles) {
        updateStyles(timestampMs, dt, compositeDrawable.styles);
    }
    updateTransform(timestampMs, dt, compositeDrawable.transform);
    updateDrawables(timestampMs, dt, compositeDrawable.drawables);
}

function updatePrimitiveDrawable(
    timestampMs: number,
    dt: number,
    primitiveDrawable: PrimitiveDrawable,
): void {
    if (primitiveDrawable.styles) {
        updateStyles(timestampMs, dt, primitiveDrawable.styles);
    }
    updatePrimitive(timestampMs, dt, primitiveDrawable.primitive);
    updateTransform(timestampMs, dt, primitiveDrawable.transform);
}

function updatePrimitive(
    timestampMs: number,
    dt: number,
    primitive: AnimatedPrimitive,
): void {
    if (primitive.animation) {
        switch (primitive.kind) {
            case 'text':
                interpolateTransition(
                    primitive.animation,
                    primitive.primitive,
                    timestampMs,
                    dt,
                );
                break;
            case 'rect':
                interpolateTransition(
                    primitive.animation,
                    primitive.primitive,
                    timestampMs,
                    dt,
                );
                break;
            case 'ellipse':
                interpolateTransition(
                    primitive.animation,
                    primitive.primitive,
                    timestampMs,
                    dt,
                );
                break;
            case 'line':
                interpolateTransition(
                    primitive.animation,
                    primitive.primitive,
                    timestampMs,
                    dt,
                );
                break;
            case 'polyline':
                interpolateTransition(
                    primitive.animation,
                    primitive.primitive,
                    timestampMs,
                    dt,
                );
                break;
            case 'polygon':
                interpolateTransition(
                    primitive.animation,
                    primitive.primitive,
                    timestampMs,
                    dt,
                );
                break;
            case 'equilateral_polygon':
                interpolateTransition(
                    primitive.animation,
                    primitive.primitive,
                    timestampMs,
                    dt,
                );
            case 'path':
                interpolateTransition(
                    primitive.animation,
                    primitive.primitive,
                    timestampMs,
                    dt,
                );
                break;
            case 'image':
                // nothing to animate
                break;
            default:
                assertNever(primitive);
        }
    }
}

function updateStyles(
    timestampMs: number,
    dt: number,
    styles: AnimatedStyles,
): void {
    if (styles.animation) {
        switch (styles.kind) {
            case 'stroke':
                interpolateTransition(
                    styles.animation,
                    styles.styles,
                    timestampMs,
                    dt,
                );
                break;
            case 'fill':
                interpolateTransition(
                    styles.animation,
                    styles.styles,
                    timestampMs,
                    dt,
                );
                break;
            case 'stroke_and_fill':
                interpolateTransition(
                    styles.animation,
                    styles.styles,
                    timestampMs,
                    dt,
                );
                break;
            default:
                assertNever(styles);
        }
    }
}

function updateTransform(
    timestampMs: number,
    dt: number,
    transform: AnimatedTransform,
): void {
    if (transform.animation) {
        interpolateTransition(
            transform.animation,
            transform.transform,
            timestampMs,
            dt,
        );
    }
}
