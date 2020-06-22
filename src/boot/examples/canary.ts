import { primitiveDrawable, Drawable } from '../../drawables/drawable';
import { ellipse, rect, line, polygon, path, lineTo, bezierCurveTo, text, Rect } from '../../drawables/primitives/primitiveShapes';
import { strokeAndFill, stroke, fill, Fill } from '../../drawables/styles/Styles';
import { eyePair } from '../../drawables/composites/eye';
import { waves } from '../../drawables/composites/wave';
import { createAnimatedTransform, createAnimatedStyles, AnimationTypes } from '../../drawables/animation/Animation';
import * as Duration from '../../drawables/animation/Duration';
import * as Interpolator from '../../drawables/animation/Interpolator';
import * as Transform from '../../drawables/transform/Transform';
import { Colors } from '../../drawables/styles/Color';
import { ImageCache } from '../../drawables/ImageCache';

export function exampleData(
    imageCache: ImageCache,
): Drawable[] {
    return [
        {
            id: '1',
            kind: 'primitive_drawable',
            transform: createAnimatedTransform(),
            primitive: {
                kind: 'rect',
                primitive: rect(100, 100, 50, 200),
            },
            styles: {
                kind: 'fill',
                styles: fill(),
            },
        },
        {
            id: '2',
            kind: 'primitive_drawable',
            transform: createAnimatedTransform(),
            primitive: {
                kind: 'ellipse',
                primitive: ellipse(300, 200, 50, 50),
                animation: {
                    kind: AnimationTypes.TRANSITION,
                    duration: Duration.createSingle(0, 10000),
                    interpolator: Interpolator.linear(),
                    transitions: {
                        rx: 20,
                        ry: 100,
                    },
                },
            },
            styles: {
                kind: 'fill',
                styles: fill(Colors.Green()),
                animation: {
                    kind: AnimationTypes.TRANSITION,
                    duration: Duration.createSingle(0, 2000),
                    interpolator: Interpolator.linear(),
                    transitions: {
                        color: Colors.Red(),
                    },
                },
            },
        },
        {
            id: '3',
            kind: 'primitive_drawable',
            primitive: {
                kind: 'line',
                primitive: line(500, 500, 450, 450),
                animation: {
                    kind: AnimationTypes.TRANSITION,
                    duration: Duration.createSingle(0, 2000),
                    interpolator: Interpolator.linear(),
                    transitions: {
                        x2: 100,
                        y2: 100,
                    },
                },
            },
            styles: createAnimatedStyles(),
            transform: {
                transform: Transform.create({
                    rotate: {
                        a: 0,
                        x: 475,
                        y: 475,
                    },
                }),
                animation: {
                    kind: AnimationTypes.TRANSITION,
                    duration: Duration.createSingle(0, 2000),
                    interpolator: Interpolator.linear(),
                    transitions: {
                        rotate: {
                            a: 2 * Math.PI,
                        },
                    },
                },
            },
        },
        eyePair('4', 600, 200, 50, 50, Colors.Blue()),
        waves('5', 50, 400, 40, 40, 20, {kind:'stroke', styles: stroke(Colors.Green(), 2)}, createAnimatedTransform()),
    ];
}