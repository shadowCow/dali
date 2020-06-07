import { primitiveDrawable } from "../../drawables/primitives/drawable";
import { ellipse, rect, line, polygon, path, lineTo, bezierCurveTo, text } from "../../drawables/primitives/primitiveShapes";
import { strokeAndFill, stroke, fill } from "../../drawables/primitives/styles";
import { eyePair } from "../../drawables/composites/eye";
import { waves } from "../../drawables/composites/wave";

export const exampleData = [
    primitiveDrawable(
        '1',
        ellipse(
            50, 50, 25, 40
        ),
        strokeAndFill('black', 3, 'blue')
    ),
    primitiveDrawable(
        '2',
        rect(
            300, 300, 100, 50, 0, 0
        ),
        strokeAndFill('yellow', 1, 'red')
    ),
    primitiveDrawable(
        '3',
        line(150, 150, 200, 100),
        stroke('green', 2)
    ),
    primitiveDrawable(
        '4',
        polygon({ x: 400, y: 50 }, { x: 450, y: 80 }, { x: 560, y: 60 }),
        fill('green')
    ),
    primitiveDrawable(
        '5',
        path(
            800,
            300,
            [
                lineTo(700, 350),
                bezierCurveTo(650, 25, 900, 500, 750, 50)
            ]
        ),
        strokeAndFill('black', 5, 'gray')
    ),
    primitiveDrawable(
        '6',
        rect(500, 200, 100, 100, 15, 15),
        fill('orange')
    ),
    eyePair(
        '7',
        400,
        200,
        50,
        25,
        'blue'
    ),
    waves(
        '8',
        100,
        400,
        50,
        50,
        20,
        stroke('blue', 3)
    ),
    primitiveDrawable(
        't1',
        text(250, 50, 'hello', '50px serif'),
        fill('purple')
    )
];