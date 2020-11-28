/*
We have a tree of Geometric Primitives

These are 'owned' by VisualEntities.

VisualEntities maintain a mapping between
arbitrary props and Geometric Primitives.

The Geometric Primitive Tree is what is actually
rendered to Canvas.

There are also Updates, which map (t,dt) to
VisualEntity props.

Not all VisualEntities have an Update at all times.
Updates can add/remove VisualEntities.

The tree has a single root, which is the Scene.

Geometric primitives can be pixelated / vertexated.

Styles can apply to a group of Geometric Primitives,
or to a single GeometricPrimitive.

Geometric primitives includes a 'Container'?

*/

import { Color, Colors } from "../../drawables/styles/Color";
import { Styles, fill } from "../../drawables/styles/Styles";



export function render(
    t: number,
    dt: number,
    updates: Array<Update<VisualEntity>>,
    rootEntity: VisualEntity,
): void {
    updates.forEach(u => {
        u.fn(t, dt, u.target);
    });

    
}

export type Update<Target> = {
    fn: UpdateFn<Target>,
    target: Target,
};

export type UpdateFn<Target> = (
    t: number,
    dt: number,
    target: Target,
) => void;

export type VisualEntity<Props = {}> = {
    geometry: VisualGeometry<Props>,
    styles: VisualStyles,
    transform: VisualTransform,
    //deformation: VisualDeformation,
}

export type VisualStyles =
    (props: StyleProps) => StylePrimitive;

export type StyleProps = {};

export type VisualTransform = {
    position: Vec3,
    scale: Vec3,
    rotation: Vec3,
};
export function transform(): VisualTransform {
    return {
        position: vec3(),
        scale: vec3(),
        rotation: vec3(),
    };
}

export type Vec3 = {
    x: number,
    y: number,
    z: number,
};
export function vec3(): Vec3 {
    return {
        x: 0,
        y: 0,
        z: 0,
    };
}

export type VisualDeformation<Props, T> =
    (props: Props, t: T) => T;

export type VisualGeometry<Props = {}> =
    (props: Props) => GeometricPrimitive[];

export type GeometricPrimitive =
    Ellipse;
    
export type Ellipse = {
    radii: Vec3,
}
export function ellipse(): Ellipse {
    return {
        radii: vec3(),
    };
}

export type StylePrimitive = Styles;

export type StyledGeometricPrimitive = {
    geometricPrimitive: GeometricPrimitive,
    stylePrimitive: StylePrimitive,
}


