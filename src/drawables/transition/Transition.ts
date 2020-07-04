import * as Duration from './Duration';
import * as Interpolator from './Interpolator';
import { Styles, Stroke, Fill, StrokeAndFill, stroke } from '../styles/Styles';
import { Primitive, Text, Rect, Ellipse, Line, Polyline, Polygon, Path, Image, EquilateralPolygon } from '../primitives/primitiveShapes';
import * as Transform from '../transform/Transform';
import { assertNever } from '../../util/typeGuards';


export function create<T>(
    duration: Duration.Duration,
    interpolator: Interpolator.Interpolator,
    transitions: RecursivePartial<T>,
): State<T> {
    return {
        duration,
        interpolator,
        transitions,
    };
}

export type State<T> = {
    duration: Duration.Duration,
    interpolator: Interpolator.Interpolator,
    transitions: RecursivePartial<T>,
}

export type RecursivePartial<T> = {
    [K in keyof T]?: RecursivePartial<T[K]>
}

export function interpolate<T>(
    transition: State<T>,
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

export type TransformTransition = {
    transform: Transform.State;
    transition?: State<Transform.State>;
}

export function transformTransition(): TransformTransition {
    return {
        transform: Transform.create(),
    };
}

export function stylesTransition(): StylesTransition<Styles> {
    return {
        kind: 'stroke',
        styles: stroke(),
    };
}

export type StylesTransition<S extends Styles> = {
    kind: S['kind'];
    styles: S;
    transition?: State<S>;
}

export type PrimitiveTransition<P extends Primitive> = {
    kind: P['kind'];
    primitive: P;
    transition?: State<P>;
}
