import { Primitive } from "./primitives/primitiveShapes";
import { Styles } from "./primitives/styles";
import { Transform } from "./primitives/transforms";

export type Drawable =
    PrimitiveDrawable |
    CompositeDrawable;

export type PrimitiveDrawable = {
    typeTag: 'primitive_drawable',
    id: string,
    primitive: Primitive,
    styles?: Styles,
    transforms?: Array<Transform>
}

export function primitiveDrawable(
    id: string,
    primitive: Primitive,
    styles?: Styles,
    transforms?: Array<Transform>
): PrimitiveDrawable {
    return {
        typeTag: 'primitive_drawable',
        id,
        primitive,
        styles,
        transforms
    }
}

export type CompositeDrawable = {
    typeTag: 'composite_drawable',
    id: string,
    drawables: Array<Drawable>,
    styles?: Styles,
    transforms?: Array<Transform>
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
        styles,
        transforms
    }
}