
import { GeometricPrimitive2 } from './primitives/GeometricPrimitive2';
import { Styles } from './styles/Styles';
import { Transform, createTransform } from './transform/Transform';

export type Drawable =
    PrimitiveDrawable |
    DrawableGroup;

export enum DrawableTypes {
    PRIMITIVE_DRAWABLE = 'PRIMITIVE_DRAWABLE',
    DRAWABLE_GROUP = 'DRAWABLE_GROUP',
}

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

export type DrawableGroup = {
    kind: typeof DrawableTypes.DRAWABLE_GROUP;
    id: string;
    transform: Transform,
    styles?: Styles,
}

export function drawableGroup(
    id: string,
    transform?: Transform,
    styles?: Styles,
): DrawableGroup {
    return {
        kind: DrawableTypes.DRAWABLE_GROUP,
        id,
        transform: transform || createTransform(),
        styles,
    };
}
