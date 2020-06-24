import * as Duration from './Duration';
import * as Interpolator from './Interpolator';
import { Styles, Stroke, Fill, StrokeAndFill, stroke } from '../styles/Styles';
import { Primitive, Text, Rect, Ellipse, Line, Polyline, Polygon, Path, Image, EquilateralPolygon } from '../primitives/primitiveShapes';
import * as Transform from '../transform/Transform';
import { assertNever } from '../../util/typeGuards';

export enum AnimationTypes {
    TRANSITION = 'TRANSITION',
}

export type Animation<T> =
    Transition<T>;

export type Transition<T> = {
    kind: typeof AnimationTypes.TRANSITION,
    duration: Duration.Duration,
    interpolator: Interpolator.Interpolator,
    transitions: RecursivePartial<T>,
}

export type RecursivePartial<T> = {
    [K in keyof T]?: RecursivePartial<T[K]>
}

export function createTransition<T>(
    duration: Duration.Duration,
    interpolator: Interpolator.Interpolator,
    transitions: RecursivePartial<T>,
): Transition<T> {
    return {
        kind: AnimationTypes.TRANSITION,
        duration,
        interpolator,
        transitions,
    };
}

export function interpolateTransition<T>(
    transition: Transition<T>,
    t: T,
    timestampMs: number,
    dt: number,
): void {
    switch (transition.duration.kind) {
        case Duration.DurationTypes.SINGLE:
            return Interpolator.interpolateValues(
                transition.interpolator,
                t,
                transition.transitions,
                timestampMs,
                dt,
                transition.duration.endMs,
            );
        case Duration.DurationTypes.CYCLIC:
            throw new Error('not implemented');
        default:
            assertNever(transition.duration);
    }
}

export type AnimatedTransform = {
    transform: Transform.State;
    animation?: Animation<Transform.State>;
}

export function createAnimatedTransform(): AnimatedTransform {
    return {
        transform: Transform.create(),
    };
}

export function createAnimatedStyles(): AnimatedStyles {
    return {
        kind: 'stroke',
        styles: stroke(),
    };
}

export type AnimatedStyles =
    AnimatedStroke |
    AnimatedFill |
    AnimatedStrokeAndFill;

export type AnimatedStroke = StylesAnimation<Stroke>;
export type AnimatedFill = StylesAnimation<Fill>;
export type AnimatedStrokeAndFill = StylesAnimation<StrokeAndFill>;

export type StylesAnimation<S extends Styles> = {
    kind: S['kind'];
    styles: S;
    animation?: Animation<S>;
}

export type AnimatedPrimitive =
    AnimatedText |
    AnimatedRect |
    AnimatedEllipse |
    AnimatedLine |
    AnimatedPolyline |
    AnimatedPolygon |
    AnimatedEquilateralPolygon |
    AnimatedPath |
    AnimatedImage;

export type AnimatedText = PrimitiveAnimation<Text>;
export type AnimatedRect = PrimitiveAnimation<Rect>;
export type AnimatedEllipse = PrimitiveAnimation<Ellipse>;
export type AnimatedLine = PrimitiveAnimation<Line>;
export type AnimatedPolyline = PrimitiveAnimation<Polyline>;
export type AnimatedPolygon = PrimitiveAnimation<Polygon>;
export type AnimatedEquilateralPolygon = PrimitiveAnimation<EquilateralPolygon>;
export type AnimatedPath = PrimitiveAnimation<Path>;
export type AnimatedImage = PrimitiveAnimation<Image>;

export type PrimitiveAnimation<P extends Primitive> = {
    kind: P['kind'];
    primitive: P;
    animation?: Animation<P>;
}