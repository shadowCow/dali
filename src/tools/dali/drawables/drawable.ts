
import { GeometricPrimitive2 } from './primitives/primitiveShapes';
import { Styles } from './styles/Styles';
import { Transform, createTransform } from './transform/Transform';

export enum DrawableTypes {
    PRIMITIVE_DRAWABLE = 'PRIMITIVE_DRAWABLE',
    COMPOSITE_DRAWABLE = 'COMPOSITE_DRAWABLE',
}

export type Drawable =
    PrimitiveDrawable |
    CompositeDrawable;

export type PrimitiveDrawable = {
    kind: typeof DrawableTypes.PRIMITIVE_DRAWABLE;
    id: string;
    transform: Transform;
    primitive: GeometricPrimitive2;
    styles?: Styles;
}
    
export function primitiveDrawable(
    id: string,
    primitive: GeometricPrimitive2,
    transform?: Transform,
    styles?: Styles,
): PrimitiveDrawable {
    return {
        kind: DrawableTypes.PRIMITIVE_DRAWABLE,
        id,
        transform: transform || createTransform(),
        primitive,
        styles,
    };
}

export type CompositeDrawable = {
    kind: typeof DrawableTypes.COMPOSITE_DRAWABLE;
    id: string;
    transform: Transform;
    drawables: Array<Drawable>;
}

export function compositeDrawable(
    id: string,
    drawables: Array<Drawable>,
    transform?: Transform,
): CompositeDrawable {
    return {
        kind: DrawableTypes.COMPOSITE_DRAWABLE,
        id,
        transform: transform || createTransform(),
        drawables,
    };
}

