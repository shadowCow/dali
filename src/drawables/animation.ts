import { Translate, Rotate, Scale, Skew, Transform } from "./primitives/transforms";
import { Stroke, Fill, StrokeAndFill, Styles, stroke } from "./primitives/styles";
import { Text, Ellipse, Polyline, Polygon, Rect, Line, Path, Primitive } from "./primitives/primitiveShapes";
import { Scene } from "../scene/Scene";
import { Painter } from "../painter/Painter";
import { Drawable, PrimitiveDrawable, CompositeDrawable } from "./drawable";
import { assertNever } from "../util/typeGuards";
import { applyChanges, applyFractionalChanges } from "../util/mutation";

export function animate(
    scene: Scene,
    painter: Painter,
): void {
    let previousTimestampMs: number = 0;
    function animationCallback(timestampMs: number): void {
        const dt = timestampMs - previousTimestampMs;

        updateScene(timestampMs, dt, scene);
        drawScene(scene, painter);

        previousTimestampMs = timestampMs;

        requestAnimationFrame(animationCallback);
    }

    requestAnimationFrame(animationCallback);
}

function updateScene(
    timestampMs: number,
    dt: number,
    scene: Scene,
): void {
    scene.drawables.forEach(drawable => {
        switch (drawable.typeTag) {
            case 'composite_drawable':
                updateCompositeDrawable(timestampMs, drawable);
                break;
            case 'primitive_drawable':
                updatePrimitiveDrawable(timestampMs, dt, drawable);
                break;
            default:
                assertNever(drawable);
        }
    })
}

function updateCompositeDrawable(
    timestampMs: number,
    composite_drawable: CompositeDrawable,
): void {
    
}

function updatePrimitiveDrawable(
    timestampMs: number,
    dt: number,
    primitiveDrawable: PrimitiveDrawable,
): void {
    updatePrimitive(timestampMs, dt, primitiveDrawable.primitive);
    updateStyles(timestampMs, dt, primitiveDrawable.styles);
    updateTransforms(timestampMs, dt, primitiveDrawable.transforms);
}

function updatePrimitive(
    timestampMs: number,
    dt: number,
    primitive: AnimatedPrimitives,
): void {
    switch (primitive.typeTag) {
        case 'text':
            primitive.animations.forEach(animation => {
                applyAnimationToPrimitive(timestampMs, dt, primitive.primitive, animation);
            });
            break;
        case 'rect':
            primitive.animations.forEach(animation => {
                applyAnimationToPrimitive(timestampMs, dt, primitive.primitive, animation);
            });
            break;
        case 'ellipse':
            primitive.animations.forEach(animation => {
                applyAnimationToPrimitive(timestampMs, dt, primitive.primitive, animation);
            });
            break;
        case 'line':
            primitive.animations.forEach(animation => {
                applyAnimationToPrimitive(timestampMs, dt, primitive.primitive, animation);
            });
            break;
        case 'polyline':
            primitive.animations.forEach(animation => {
                applyAnimationToPrimitive(timestampMs, dt, primitive.primitive, animation);
            });
            break;
        case 'polygon':
            primitive.animations.forEach(animation => {
                applyAnimationToPrimitive(timestampMs, dt, primitive.primitive, animation);
            });
            break;
        case 'path':
            primitive.animations.forEach(animation => {
                applyAnimationToPrimitive(timestampMs, dt, primitive.primitive, animation);
            });
            break;
        default:
            assertNever(primitive);
    }
}

function applyAnimationToPrimitive<P extends Primitive>(
    timestampMs: number,
    dt: number,
    primitive: P,
    animation: Animation<P>,
): void {
    switch (animation.duration.typeTag) {
        case 'one_time_duration':
            switch (animation.interpolator.typeTag) {
                case 'linear_interpolator':
                    const changeFraction = getFractionDtToRemainingTime(
                        timestampMs,
                        dt,
                        animation.duration.endMs,
                    );

                    applyFractionalChanges(
                        changeFraction,
                        primitive,
                        animation.transitions,
                    )
                    break;
                case 'quadratic_interpolator':
                    break;
                default:
                    assertNever(animation.interpolator);
            }
            break;
        case 'cyclic_duration':
            break;
        default:
            assertNever(animation.duration);
    }
}

function getFractionDtToRemainingTime(
    timestampMs: number,
    dt: number,
    endMs: number,
): number {
    if (timestampMs < endMs) {
        return dt / (endMs - timestampMs);
    } else {
        return 1;
    }
}

function updateStyles(
    timestampMs: number,
    dt: number,
    styles: AnimatedStyles,
): void {
    switch (styles.typeTag) {
        case 'stroke':
            styles.animations.forEach(animation => {
                applyAnimationToStyles(timestampMs, dt, styles.styles, animation);
            });
            break;
        case 'fill':
            styles.animations.forEach(animation => {
                applyAnimationToStyles(timestampMs, dt, styles.styles, animation);
            });    
            break;
        case 'stroke_and_fill':
            styles.animations.forEach(animation => {
                applyAnimationToStyles(timestampMs, dt, styles.styles, animation);
            });
            break;
        default:
            assertNever(styles);
    }
}

function applyAnimationToStyles<S extends Styles>(
    timestampMs: number,
    dt: number,
    styles: S,
    animation: Animation<S>,
): void {
    switch (animation.duration.typeTag) {
        case 'one_time_duration':
            switch (animation.interpolator.typeTag) {
                case 'linear_interpolator':
                    const changeFraction = getFractionDtToRemainingTime(
                        timestampMs,
                        dt,
                        animation.duration.endMs,
                    );

                    applyFractionalChanges(
                        changeFraction,
                        styles,
                        animation.transitions,
                    );
                    applyColorAnimations(
                        changeFraction,
                        styles,
                        animation.transitions,
                    );
                    break;
                case 'quadratic_interpolator':
                    break;
                default:
                    assertNever(animation.interpolator);
            }
            break;
        case 'cyclic_duration':
            break;
        default:
            assertNever(animation.duration);
    }
}

function applyColorAnimations<S extends Styles>(
    changeFraction: number,
    styles: Styles,
    transitions: PropertyTransitions<S>,
): void {
    switch (styles.typeTag) {
        case 'stroke':
            if ('color' in transitions) {
                applyFractionalChanges(
                    changeFraction,
                    styles.color,
                    transitions['color'],
                )
            }
            break;
        case 'fill':
            if ('color' in transitions) {
                applyFractionalChanges(
                    changeFraction,
                    styles.color,
                    transitions['color'],
                )
            }
            break;
        case 'stroke_and_fill':
            if ('stroke' in transitions) {
                applyFractionalChanges(
                    changeFraction,
                    styles.stroke.color,
                    transitions['stroke']['color'],
                )
            }
            if ('fill' in transitions) {
                applyFractionalChanges(
                    changeFraction,
                    styles.fill.color,
                    transitions['fill']['color'],
                )
            }
            break;
        default:
            assertNever(styles);
    }
}

function updateTransforms(
    timestampMs: number,
    dt: number,
    transforms: Array<AnimatedTransforms>,
): void {
    transforms.forEach(transform => {
        switch (transform.typeTag) {
            case 'rotate':
                transform.animations.forEach(animation => {
                    applyAnimationToTransform(timestampMs, dt, transform.transform, animation);
                });
                break;
            case 'scale':
                transform.animations.forEach(animation => {
                    applyAnimationToTransform(timestampMs, dt, transform.transform, animation);
                });
                break;
            case 'skew':
                transform.animations.forEach(animation => {
                    applyAnimationToTransform(timestampMs, dt, transform.transform, animation);
                });
                break;
            case 'translate':
                transform.animations.forEach(animation => {
                    applyAnimationToTransform(timestampMs, dt, transform.transform, animation);
                });
                break;
            default:
                assertNever(transform);
        }
    });
}

function applyAnimationToTransform<T extends Transform>(
    timestampMs: number,
    dt: number,
    transform: T,
    animation: Animation<T>,
): void {
    switch (animation.duration.typeTag) {
        case 'one_time_duration':
            switch (animation.interpolator.typeTag) {
                case 'linear_interpolator':
                    const changeFraction = getFractionDtToRemainingTime(
                        timestampMs,
                        dt,
                        animation.duration.endMs,
                    );

                    applyFractionalChanges(
                        changeFraction,
                        transform,
                        animation.transitions,
                    );
                    break;
                case 'quadratic_interpolator':
                    break;
                default:
                    assertNever(animation.interpolator);
            }
            break;
        case 'cyclic_duration':
            break;
        default:
            assertNever(animation.duration);
    }
}

function drawScene(
    scene: Scene,
    painter: Painter,
): void {
    painter.clear();
    scene.drawables.forEach(drawable => {
        painter.draw(drawable);
    });
}

export type Animation<T> = {
    duration: AnimationDuration;
    interpolator: Interpolator;
    transitions: PropertyTransitions<T>;
}

export type AnimationDuration =
    OneTimeDuration |
    CyclicDuration;

export function defaultAnimationDuration(): AnimationDuration {
    return oneTimeDuration();
}

export type OneTimeDuration = {
    typeTag: 'one_time_duration';
    startMs: number;
    endMs: number;
}

export function oneTimeDuration(): OneTimeDuration {
    return {
        typeTag: 'one_time_duration',
        startMs: 0,
        endMs: 2000,
    }
}

export type CyclicDuration = {
    typeTag: 'cyclic_duration';
    startMs: number;
    cycleDurationMs: number;
}

export type Interpolator =
    LinearInterpolator |
    QuadraticInterpolator;

export function defaultInterpolator(): LinearInterpolator {
    return {typeTag: 'linear_interpolator'};
}

export type LinearInterpolator = {
    typeTag: 'linear_interpolator';
}

export type QuadraticInterpolator = {
    typeTag: 'quadratic_interpolator';
}

export type PropertyTransitions<T> = {
    [K in keyof T]?: T[K];
}

export type StylesAnimation<T extends Styles> = {
    typeTag: T['typeTag'];
    styles: T;
    animations: Array<Animation<T>>;
}

export type PrimitiveAnimation<T extends Primitive> = {
    typeTag: T['typeTag'];
    primitive: T;
    animations: Array<Animation<T>>;
}

export type TransformAnimation<T extends Transform> = {
    typeTag: T['typeTag'];
    transform: T;
    animations: Array<Animation<T>>;
}

export type AnimatedStyles =
    AnimatedStroke |
    AnimatedFill |
    AnimatedStrokeAndFill;

export type AnimatedStroke = StylesAnimation<Stroke>;
export type AnimatedFill = StylesAnimation<Fill>;
export type AnimatedStrokeAndFill = StylesAnimation<StrokeAndFill>;

export function defaultAnimatedStyles(): AnimatedStyles {
    return {
        typeTag: 'stroke',
        styles: stroke(),
        animations: [],
    }
}

export type AnimatedPrimitives =
    AnimatedText |
    AnimatedRect |
    AnimatedEllipse |
    AnimatedLine |
    AnimatedPolyline |
    AnimatedPolygon |
    AnimatedPath;

export type AnimatedText = PrimitiveAnimation<Text>;
export type AnimatedRect = PrimitiveAnimation<Rect>;
export type AnimatedEllipse = PrimitiveAnimation<Ellipse>;
export type AnimatedLine = PrimitiveAnimation<Line>;
export type AnimatedPolyline = PrimitiveAnimation<Polyline>;
export type AnimatedPolygon = PrimitiveAnimation<Polygon>;
export type AnimatedPath = PrimitiveAnimation<Path>;

export type AnimatedTransforms =
    AnimatedScale |
    AnimatedTranslate |
    AnimatedRotate |
    AnimatedSkew;

export type AnimatedScale = TransformAnimation<Scale>;
export type AnimatedTranslate = TransformAnimation<Translate>;
export type AnimatedRotate = TransformAnimation<Rotate>;
export type AnimatedSkew = TransformAnimation<Skew>;
