import { primitiveDrawable, Drawable } from '../../drawables/drawable';
import { ellipse, rect, line, polygon, path, lineTo, bezierCurveTo, text, Rect } from '../../drawables/primitives/primitiveShapes';
import { strokeAndFill, stroke, fill, Fill, Colors } from '../../drawables/primitives/styles';
import { defaultAnimationDuration, defaultInterpolator, defaultAnimatedStyles } from '../../drawables/animation';
import { eyePair } from '../../drawables/composites/eye';
import { waves } from '../../drawables/composites/wave';

export const exampleData: Drawable[] = [
    {
        id: '1',
        typeTag: 'primitive_drawable',
        primitive: {
            typeTag: 'rect',
            primitive: rect(100, 100, 50, 200),
            animations: [],
        },
        styles: {
            typeTag: 'fill',
            styles: fill(),
            animations: [],
        },
        transforms: [],
    },
    {
        id: '2',
        typeTag: 'primitive_drawable',
        primitive: {
            typeTag: 'ellipse',
            primitive: ellipse(300, 200, 50, 50),
            animations: [
                {
                    duration: {
                        typeTag: 'one_time_duration',
                        startMs: 0,
                        endMs: 10000,
                    },
                    interpolator: {
                        typeTag: 'linear_interpolator',
                    },
                    transitions: {
                        rx: 20,
                        ry: 100,
                    },
                },
            ],
        },
        styles: {
            typeTag: 'fill',
            styles: fill(Colors.Green()),
            animations: [{
                duration: defaultAnimationDuration(),
                interpolator: defaultInterpolator(),
                transitions: {
                    color: Colors.Red(),
                },
            }],
        },
        transforms: [],
    },
    {
        id: '3',
        typeTag: 'primitive_drawable',
        primitive: {
            typeTag: 'line',
            primitive: line(500, 500, 450, 450),
            animations: [
                {
                    duration: defaultAnimationDuration(),
                    interpolator: defaultInterpolator(),
                    transitions: {
                        x2: 100,
                        y2: 100,
                    },
                },
            ],
        },
        styles: defaultAnimatedStyles(),
        transforms: [{
            typeTag: 'rotate',
            transform: {
                typeTag: 'rotate',
                a: 0,
                x: 475,
                y: 475,
            },
            animations: [{
                duration: defaultAnimationDuration(),
                interpolator: defaultInterpolator(),
                transitions: {
                    a: 2 * Math.PI,
                },
            }],
        }],
    },
    eyePair('4', 600, 200, 50, 50, Colors.Blue()),
    waves('5', 50, 400, 40, 40, 20, {typeTag:'stroke', styles: stroke(Colors.Green(), 2), animations: []}),
];
