import * as Transform from './transform/Transform';
import * as Rotate from './transform/Rotate';
import * as Translate from './transform/Translate';
import * as Scale from './transform/Scale';
import * as Skew from './transform/Skew';
import { Primitive } from './primitives/primitiveShapes';
import { Styles } from './styles/Styles';
import { pipe, through } from '../util/pipe';

export enum DrawableTypes {
    PRIMITIVE_DRAWABLE = 'PRIMITIVE_DRAWABLE',
    COMPOSITE_DRAWABLE = 'COMPOSITE_DRAWABLE',
    ANIMATED_DRAWABLE = 'ANIMATED_DRAWABLE',
}

export type Drawable =
    StaticDrawable |
    AnimatedDrawable;

export type StaticDrawable =
    PrimitiveDrawable |
    CompositeDrawable;

export type PrimitiveDrawable = {
    kind: typeof DrawableTypes.PRIMITIVE_DRAWABLE;
    id: string;
    transform: Transform.State;
    primitive: Primitive;
    styles?: Styles;
}
    
export function primitiveDrawable(
    id: string,
    primitive: Primitive,
    transform?: Transform.State,
    styles?: Styles,
): PrimitiveDrawable {
    return {
        kind: DrawableTypes.PRIMITIVE_DRAWABLE,
        id,
        transform: transform || Transform.create(),
        primitive,
        styles,
    };
}

export type CompositeDrawable = {
    kind: typeof DrawableTypes.COMPOSITE_DRAWABLE;
    id: string;
    transform: Transform.State;
    drawables: Array<StaticDrawable>;
    styles?: Styles;
}

export function compositeDrawable(
    id: string,
    drawables: Array<StaticDrawable>,
    transform?: Transform.State,
    styles?: Styles,
): CompositeDrawable {
    return {
        kind: DrawableTypes.COMPOSITE_DRAWABLE,
        id,
        transform: transform || Transform.create(),
        drawables,
        styles,
    };
}

export type AnimatedDrawable = {
    kind: typeof DrawableTypes.ANIMATED_DRAWABLE,
    id: string,
    animation: AnimationFn,
}

export function animatedDrawable(
    id: string,
    animation: AnimationFn,
): AnimatedDrawable {
    return {
        kind: DrawableTypes.ANIMATED_DRAWABLE,
        id,
        animation,
    };
}

export type AnimationFn = (
    t: number,
    dt: number,
) => StaticDrawable;

export function createAnimation<P>(
    generator: DrawableGenerator<P>,
    animator: Animator<P>,
    initialItem: P,
    initialTransform: Transform.State,
    initialStyles: Styles,
): AnimationFn {
    let item = initialItem;
    let transform = initialTransform;
    let styles = initialStyles;
    return (t, dt) => {
        [item, transform, styles] = animator(t,dt,item,transform,styles);

        return pipe(generator(item), through(
            withTransform(transform),
            withStyles(styles),
        ));
    };
}

export type DrawableGenerator<P> = (
    p: P,
) => StaticDrawable;

export type Animator<P> = (
    t: number,
    dt: number,
    previousItem: P,
    previousTransform: Transform.State,
    previousStyles: Styles,
) => [P, Transform.State, Styles];

export function withStyles(
    styles: Styles
): (d: StaticDrawable) => StaticDrawable {
    return (d) => {
        return {
            ...d,
            styles,
        };
    };
}

export function withTransform(
    transform: Transform.State,
): (d: StaticDrawable) => StaticDrawable {
    return (d) => {
        return {
            ...d,
            transform,
        };
    };
}

export function at(
    translate: Translate.State,
): (d: StaticDrawable) => StaticDrawable {
    return (d) => {
        return {
            ...d,
            transform: {
                ...d.transform,
                translate,
            },
        };
    };
}

export function rotated(
    rotate: Rotate.State,
): (d: StaticDrawable) => StaticDrawable {
    return (d) => {
        return {
            ...d,
            transform: {
                ...d.transform,
                rotate,
            },
        };
    };
}

export function scaled(
    scale: Scale.State,
): (d: StaticDrawable) => StaticDrawable {
    return (d) => {
        return {
            ...d,
            transform: {
                ...d.transform,
                scale,
            },
        };
    };
}

export function skewed(
    skew: Skew.State,
): (d: StaticDrawable) => StaticDrawable {
    return (d) => {
        return {
            ...d,
            transform: {
                ...d.transform,
                skew,
            },
        };
    };
}

export type Timeline<P> = {
    snapshots: Snapshot<P>[];
}

function latestSnapshot<P>(
    timeline: Timeline<P>,
    t: number,
): P {
    const nextIndex = timeline.snapshots.findIndex(s => s.t > t);
    const index = Math.max(0, nextIndex-1);

    return timeline.snapshots[index].p;
}

export type Snapshot<P> = {
    t: number,
    p: P,
}

export function createAnimatorFromTimeline<P>(
    timeline: Timeline<P>,
): (t: number, dt: number, p: P) => P {
    return (t, dt, p) => {
        return latestSnapshot(timeline, t);
    };
}
