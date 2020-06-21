import { AnimatedPrimitive, AnimatedStyles, AnimatedTransform } from './animation/Animation';
import * as Animation from './animation/Animation';

export type Drawable =
    PrimitiveDrawable |
    CompositeDrawable;

export type PrimitiveDrawable = {
    kind: 'primitive_drawable';
    id: string;
    transform: AnimatedTransform;
    primitive: AnimatedPrimitive;
    styles?: AnimatedStyles;
}
    
export function primitiveDrawable(
    id: string,
    primitive: AnimatedPrimitive,
    transform?: AnimatedTransform,
    styles?: AnimatedStyles,
): PrimitiveDrawable {
    return {
        kind: 'primitive_drawable',
        id,
        transform: transform || Animation.createAnimatedTransform(),
        primitive,
        styles,
    };
}

export type CompositeDrawable = {
    kind: 'composite_drawable';
    id: string;
    transform: AnimatedTransform;
    drawables: Array<Drawable>;
    styles?: AnimatedStyles;
}

export function compositeDrawable(
    id: string,
    drawables: Array<Drawable>,
    transform?: AnimatedTransform,
    styles?: AnimatedStyles,
): CompositeDrawable {
    return {
        kind: 'composite_drawable',
        id,
        transform: transform || Animation.createAnimatedTransform(),
        drawables,
        styles,
    };
}
