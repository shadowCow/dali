import { Primitive } from "./primitives/primitiveShapes";
import { Styles, defaultStyles, fill } from "./primitives/styles";
import { Transform } from "./primitives/transforms";
import { AnimatedPrimitives, AnimatedStyles, AnimatedTransforms } from "./animation";

export type Drawable =
    PrimitiveDrawable |
    CompositeDrawable;

export type PrimitiveDrawable = {
    typeTag: 'primitive_drawable',
    id: string,
    primitive: AnimatedPrimitives,
    styles: AnimatedStyles,
    transforms: Array<AnimatedTransforms>,
}
    
export function primitiveDrawable(
    id: string,
    primitive: AnimatedPrimitives,
    styles: AnimatedStyles,
    transforms?: Array<AnimatedTransforms>
): PrimitiveDrawable {
    return {
        typeTag: 'primitive_drawable',
        id,
        primitive,
        styles,
        transforms: transforms || [],
    }
}

export type CompositeDrawable = {
    typeTag: 'composite_drawable',
    id: string,
    drawables: Array<Drawable>,
    styles: Styles,
    transforms: Array<Transform>
}

export function compositeDrawable(
    id: string,
    drawables: Array<Drawable>,
    styles?: Styles,
    transforms?: Array<Transform>
): CompositeDrawable {
    return {
        typeTag: 'composite_drawable',
        id,
        drawables,
        styles: fill(),
        transforms: transforms || [],
    }
}
