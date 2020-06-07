import { Translate, Rotate, Scale, Skew } from "../drawables/primitives/transforms";
import { Stroke, Fill, StrokeAndFill } from "../drawables/primitives/styles";
import { Ellipse, Polyline, Polygon, Rect, Line, Path } from "../drawables/primitives/primitiveShapes";
import { Scene } from "../scene/Scene";
import { Painter } from "../painter/Painter";

export function animate(
    scene: Scene,
    animations: Animations,
    painter: Painter,
): void {
    function animationCallback(timestampMs: number): void {
        applyAnimations(timestampMs, animations, scene);
        drawScene(scene, painter);

        requestAnimationFrame(animationCallback);
    }

    requestAnimationFrame(animationCallback);
}

function applyAnimations(
    timestampMs: number,
    animations: Animations,
    scene: Scene,
): void {
    // animations.forEach(animation => {
    //     applyAnimation
    // })
}

function drawScene(
    scene: Scene,
    painter: Painter,
): void {
    scene.drawables.forEach(drawable => {
        painter.draw(drawable);
    });
}

export type Animations = AnimationTimeline[];

export type AnimationTimeline = {
    typeTag: 'animation_timeline';
    targetId: string;
    duration: AnimationDuration;
    interpolator: Interpolator;
    transition: Transition;
}

export type AnimationDuration =
    OneTimeDuration |
    CyclicDuration;

export type OneTimeDuration = {
    typeTag: 'one_time_duration';
    startMs: number;
    endMs: number;
}

export type CyclicDuration = {
    typeTag: 'cyclic_duration';
    startMs: number;
    cycleDurationMs: number;
}

export type Interpolator =
    LinearInterpolator |
    QuadraticInterpolator;

export type LinearInterpolator = {
    typeTag: 'linear_interpolator';
}

export type QuadraticInterpolator = {
    typeTag: 'quadratic_interpolator';
}

export type Transition =
    StylesTransition |
    TransformsTransition |
    ShapeTransition;

export type StylesTransition =
    StrokeTransition |
    FillTransition |
    StrokeAndFillTransition;

export type StrokeTransition =
    PropertyTransitions<Omit<Stroke, 'typeTag'>> &
    { typeTag: 'stroke_transition' }

export type FillTransition =
    PropertyTransitions<Omit<Fill, 'typeTag'>> &
    { typeTag: 'fill_transition' }

export type StrokeAndFillTransition =
    PropertyTransitions<Omit<StrokeAndFill, 'typeTag'>> &
    { typeTag: 'stroke_and_fill_transition' }

export type TransformsTransition =
    TranslateTransition |
    RotateTransition |
    ScaleTransition |
    SkewTransition;

export type TranslateTransition =
    PropertyTransitions<Omit<Translate, 'typeTag'>> &
    { typeTag: 'translate_transition' }

export type RotateTransition =
    PropertyTransitions<Omit<Rotate, 'typeTag'>> &
    { typeTag: 'rotate_transition' }

export type ScaleTransition =
    PropertyTransitions<Omit<Scale, 'typeTag'>> &
    { typeTag: 'scale_transition' }

export type SkewTransition =
    PropertyTransitions<Omit<Skew, 'typeTag'>> &
    { typeTag: 'skew_transition' }

export type ShapeTransition =
    TextTransition |
    EllipseTransition |
    RectTransition |
    LineTransition |
    PolylineTransition |
    PolygonTransition |
    PathTransition;

export type TextTransition =
    PropertyTransitions<Omit<Text, 'typeTag'>> &
    { typeTag: 'text_transition' }

export type EllipseTransition =
    PropertyTransitions<Omit<Ellipse, 'typeTag'>> &
    { typeTag: 'ellipse_transition' }

export type RectTransition =
    PropertyTransitions<Omit<Rect, 'typeTag'>> &
    { typeTag: 'rect_transition' }

export type LineTransition =
    PropertyTransitions<Omit<Line, 'typeTag'>> &
    { typeTag: 'line_transition' }

export type PolylineTransition =
    PropertyTransitions<Omit<Polyline, 'typeTag'>> &
    { typeTag: 'polyline_transition' }

export type PolygonTransition =
    PropertyTransitions<Omit<Polygon, 'typeTag'>> &
    { typeTag: 'polygon_transition' }

export type PathTransition =
    PropertyTransitions<Omit<Path, 'typeTag'>> &
    { typeTag: 'path_transition' }
    
export type PropertyTransitions<T> = {
    [K in keyof T]?: PropertyTransition<T[K]>;
}

export type PropertyTransition<T> = {
    from: T;
    to: T;
}