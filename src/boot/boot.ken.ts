import { Drawable, primitiveDrawable } from '../drawables/drawable';
import { bezierCurveTo, ellipse, line, lineTo, moveTo, path, polygon, polyline, quadraticCurveTo, rect, text, equilateralPolygon, Font } from '../drawables/primitives/primitiveShapes';
import { stroke, strokeAndFill, Styles } from '../drawables/styles/Styles';
import { run } from '../index';
import { createCanvasAndPainter } from '../painter/CanvasPainter';
import { Painter } from '../painter/Painter';
import * as Scene from '../scene/Scene';
import * as SceneLayer from '../scene/SceneLayer';
import * as Transform from '../drawables/transform/Transform';
import { Colors, Color, color } from '../drawables/styles/Color';


const canvasContainerId = 'canvas-container';
const canvasId = 'drawing-canvas';

const painter: Painter | null = createCanvasAndPainter(
    document,
    canvasContainerId,
    canvasId
);


if (!painter) {
    throw new Error('Unable to create canvas');
} else {
    
    // populate this with whatever you want
    const col2 = 200;
    const rowH = 50;
    const noFillStyle: Styles = stroke(Colors.Black(), 3);
    const fillStyle = function (color: Color): Styles {
        return strokeAndFill(Colors.Black(), 3, color);
    };
    const font: Font = {
        size: 50,
        family: 'serif',
    };

    const drawables: Drawable[] = [
        primitiveDrawable(
            '0-rectangle',
            rect(3, 3, 500, rowH * 8 + 20),
            Transform.create(),
            fillStyle(color(230, 230, 230)),
        ),
        primitiveDrawable(
            '1-line_label',
            text(10, rowH, 'line', font),
            Transform.create(),
            stroke(),
        ),
        primitiveDrawable(
            '1-line',
            line(col2, 15, col2 + 100, 45),
            Transform.create(),
            noFillStyle,
        ),
        primitiveDrawable(
            '2-rectangle_label',
            text(10, rowH * 2, 'rectangle', font),
            Transform.create(),
            stroke(),
        ),
        primitiveDrawable(
            '2-rectangle',
            rect(col2, rowH * 2 - 2 - 20, 100, 20),
            Transform.create(),
            noFillStyle,
        ),
        primitiveDrawable(
            '3-ellipse_label',
            text(10, rowH * 3, 'ellipse', font),
            Transform.create(),
            stroke(),
        ),
        primitiveDrawable(
            '3-ellipse-circle',
            ellipse(col2 + 15, rowH * 3 - 15, 15, 15),
            Transform.create(),
            fillStyle(Colors.White()),
        ),
        primitiveDrawable(
            '3-ellipse-oval',
            ellipse(col2 + 70, rowH * 3 - 15, 35, 15),
            Transform.create(),
            fillStyle(Colors.Green()),
        ),
        primitiveDrawable(
            '4-polyline_line_label',
            text(10, rowH * 4, 'polyline', font),
            Transform.create(),
            stroke(),
        ),
        primitiveDrawable(
            '4-polyline_line',
            polyline(
                { x: col2 + 20 + 0, y: rowH * 4 },
                { x: col2 + 20 + 0, y: rowH * 4 - 20 },
                { x: col2 + 20 + 17, y: rowH * 4 - 30 },
                { x: col2 + 20 + 34, y: rowH * 4 - 20 },
                { x: col2 + 20 + 34, y: rowH * 4 - 0 },
                { x: col2 + 20 + 17, y: rowH * 4 + 10 },
                { x: col2 + 20 + 0, y: rowH * 4 },
            ),
            Transform.create(),
            noFillStyle,
        ),
        primitiveDrawable(
            '5-polygon_label',
            text(10, rowH * 5, 'polygon', font),
            Transform.create(),
            stroke(),
        ),
        primitiveDrawable(
            '5-polygon',
            polygon(
                { x: col2 + 0, y: rowH * 5 },
                { x: col2 + 0, y: rowH * 5 - 20 },
                { x: col2 + 17, y: rowH * 5 - 30 },
                { x: col2 + 34, y: rowH * 5 - 20 },
                { x: col2 + 34, y: rowH * 5 - 0 },
                { x: col2 + 17, y: rowH * 5 + 10 },
                { x: col2, y: rowH * 5 },
            ),
            Transform.create(),
            fillStyle(Colors.Red()),
        ),
        primitiveDrawable(
            '6-path_label',
            text(10, rowH * 6, 'path', font),
            Transform.create(),
            stroke(),
        ),
        primitiveDrawable(
            '6-path',
            path(
                col2,
                rowH * 6,
                [
                    lineTo(col2 + 40, rowH * 6),
                    moveTo(col2 + 60, rowH * 6 - 20),
                    lineTo(col2 + 60, rowH * 6),
                    bezierCurveTo(
                        col2 + 80, rowH * 6 + 20,
                        col2 + 120, rowH * 6 - 20,
                        col2 + 140, rowH * 6
                    ),
                    lineTo(col2 + 160, rowH * 6),
                    quadraticCurveTo(
                        col2 + 180, rowH * 6 + 40,
                        col2 + 200, rowH * 6 - 40
                    ),
                    lineTo(col2 + 260, rowH * 6),
                ]
            ),
            Transform.create(),
            fillStyle(Colors.Blue()),
        ),
        primitiveDrawable(
            '7-equilateral_polygon_label',
            text(10, rowH * 7, 'eq n gon', font),
            Transform.create(),
            stroke(),
        ),
        primitiveDrawable(
            '7-equilateral_polygon_3',
            equilateralPolygon(
                col2 + 0 + 15, rowH * 7, 3, 20
            ),
            Transform.create(),
            noFillStyle,
        ),
        primitiveDrawable(
            '7-equilateral_polygon_4',
            equilateralPolygon(
                col2 + 50 + 15, rowH * 7, 4, 20
            ),
            Transform.create(),
            noFillStyle,
        ),
        primitiveDrawable(
            '7-equilateral_polygon_5',
            equilateralPolygon(
                col2 + 100 + 15, rowH * 7, 5, 20
            ),
            Transform.create(),
            noFillStyle,
        ),
        primitiveDrawable(
            '7-equilateral_polygon_6',
            equilateralPolygon(
                col2 + 150 + 15, rowH * 7, 6, 20
            ),
            Transform.create(),
            noFillStyle,
        ),
        primitiveDrawable(
            '7-equilateral_polygon_7',
            equilateralPolygon(
                col2 + 0 + 15, rowH * 8, 7, 20
            ),
            Transform.create(),
            noFillStyle,
        ),
        primitiveDrawable(
            '7-equilateral_polygon_8',
            equilateralPolygon(
                col2 + 50 + 15, rowH * 8, 8, 20
            ),
            Transform.create(),
            noFillStyle,
        ),
        primitiveDrawable(
            '7-equilateral_polygon_9',
            equilateralPolygon(
                col2 + 100 + 15, rowH * 8, 9, 20
            ),
            Transform.create(),
            noFillStyle,
        ),
        primitiveDrawable(
            '7-equilateral_polygon_10',
            equilateralPolygon(
                col2 + 150 + 15, rowH * 8, 10, 20
            ),
            Transform.create(),
            noFillStyle,
        ),
    ];

    const scene = Scene.animatedScene({
        layers: [
            SceneLayer.animatedLayer(
                '1',
                SceneLayer.toState(drawables),
            ),
        ],
    });

    run(painter, scene);
}