import { primitiveDrawable, Drawable } from "../../drawables/drawable";
import { ellipse, rect, line, polygon, path, lineTo, bezierCurveTo, text, Rect } from "../../drawables/primitives/primitiveShapes";
import { strokeAndFill, stroke, fill, Fill, Colors } from "../../drawables/primitives/styles";
import { defaultAnimationDuration, defaultInterpolator, defaultAnimatedStyles } from "../../drawables/animation";

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
                    }
                }
            ]
        },
        styles: {
            typeTag: 'fill',
            styles: fill(Colors.Green),
            animations: [{
                duration: defaultAnimationDuration(),
                interpolator: defaultInterpolator(),
                transitions: {
                    color: Colors.Red,
                }
            }],
        },
        transforms: [],
    },
    {
        id: '3',
        typeTag: 'primitive_drawable',
        primitive: {
            typeTag: 'line',
            primitive: line(600, 600, 550, 550),
            animations: [
                {
                    duration: defaultAnimationDuration(),
                    interpolator: defaultInterpolator(),
                    transitions: {
                        x2: 100,
                        y2: 100,
                    }
                }
            ]
        },
        styles: defaultAnimatedStyles(),
        transforms: [],
    }
];

// export const exampleData = [
//     primitiveDrawable(
//         '1',
//         ellipse(
//             50, 50, 25, 40
//         ),
//         strokeAndFill('black', 3, 'blue')
//     ),
//     primitiveDrawable(
//         '2',
//         rect(
//             300, 300, 100, 50, 0, 0
//         ),
//         strokeAndFill('yellow', 1, 'red')
//     ),
//     primitiveDrawable(
//         '3',
//         line(150, 150, 200, 100),
//         stroke('green', 2)
//     ),
//     primitiveDrawable(
//         '4',
//         polygon({ x: 400, y: 50 }, { x: 450, y: 80 }, { x: 560, y: 60 }),
//         fill('green')
//     ),
//     primitiveDrawable(
//         '5',
//         path(
//             800,
//             300,
//             [
//                 lineTo(700, 350),
//                 bezierCurveTo(650, 25, 900, 500, 750, 50)
//             ]
//         ),
//         strokeAndFill('black', 5, 'gray')
//     ),
//     primitiveDrawable(
//         '6',
//         rect(500, 200, 100, 100, 15, 15),
//         fill('orange')
//     ),
//     eyePair(
//         '7',
//         400,
//         200,
//         50,
//         25,
//         'blue'
//     ),
//     waves(
//         '8',
//         100,
//         400,
//         50,
//         50,
//         20,
//         stroke('blue', 3)
//     ),
//     primitiveDrawable(
//         't1',
//         text(250, 50, 'hello', '50px serif'),
//         fill('purple')
//     )
// ];