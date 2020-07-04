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
            rect(500, rowH * 8 + 20),
            Transform.translated(3,3),
            fillStyle(color(230, 230, 230)),
        ),
        primitiveDrawable(
            '1-line_label',
            text('line', font),
            Transform.translated(10, rowH),
            stroke(),
        ),
        primitiveDrawable(
            '1-line',
            line(col2 + 100, 45),
            Transform.translated(col2, 15),
            noFillStyle,
        ),
        primitiveDrawable(
            '2-rectangle_label',
            text('rectangle', font),
            Transform.translated(10, rowH * 2),
            stroke(),
        ),
        primitiveDrawable(
            '2-rectangle',
            rect(100, 20),
            Transform.translated(col2, rowH * 2 - 2 - 20),
            noFillStyle,
        ),
        primitiveDrawable(
            '3-ellipse_label',
            text('ellipse', font),
            Transform.translated(10, rowH * 3),
            stroke(),
        ),
        primitiveDrawable(
            '3-ellipse-circle',
            ellipse(15, 15),
            Transform.translated(col2 + 15, rowH * 3 - 15),
            fillStyle(Colors.White()),
        ),
        primitiveDrawable(
            '3-ellipse-oval',
            ellipse(35, 15),
            Transform.translated(col2 + 70, rowH * 3 - 15),
            fillStyle(Colors.Green()),
        ),
        primitiveDrawable(
            '4-polyline_line_label',
            text('polyline', font),
            Transform.translated(10, rowH * 4),
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
            text('polygon', font),
            Transform.translated(10, rowH * 5),
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
            text('path', font),
            Transform.translated(10, rowH * 6),
            stroke(),
        ),
        primitiveDrawable(
            '6-path',
            path([
                lineTo(40, 0),
                moveTo(60, 0 - 20),
                lineTo(60, 0),
                bezierCurveTo(
                    80, 0 + 20,
                    120, 0 - 20,
                    140, 0
                ),
                lineTo(160, 0),
                quadraticCurveTo(
                    180, 0 + 40,
                    200, 0 - 40
                ),
                lineTo(260, 0),
            ]),
            Transform.translated(col2, rowH * 6),
            fillStyle(Colors.Blue()),
        ),
        primitiveDrawable(
            '7-equilateral_polygon_label',
            text('eq n gon', font),
            Transform.translated(10, rowH * 7),
            stroke(),
        ),
        primitiveDrawable(
            '7-equilateral_polygon_3',
            equilateralPolygon(
                3, 20
            ),
            Transform.translated(col2 + 0 + 15, rowH * 7),
            noFillStyle,
        ),
        primitiveDrawable(
            '7-equilateral_polygon_4',
            equilateralPolygon(
                4, 20
            ),
            Transform.translated(col2 + 50 + 15, rowH * 7),
            noFillStyle,
        ),
        primitiveDrawable(
            '7-equilateral_polygon_5',
            equilateralPolygon(
                5, 20
            ),
            Transform.translated(col2 + 100 + 15, rowH * 7),
            noFillStyle,
        ),
        primitiveDrawable(
            '7-equilateral_polygon_6',
            equilateralPolygon(
                6, 20
            ),
            Transform.translated(col2 + 150 + 15, rowH * 7),
            noFillStyle,
        ),
        primitiveDrawable(
            '7-equilateral_polygon_7',
            equilateralPolygon(
                7, 20
            ),
            Transform.translated(col2 + 0 + 15, rowH * 8),
            noFillStyle,
        ),
        primitiveDrawable(
            '7-equilateral_polygon_8',
            equilateralPolygon(
                8, 20
            ),
            Transform.translated(col2 + 50 + 15, rowH * 8),
            noFillStyle,
        ),
        primitiveDrawable(
            '7-equilateral_polygon_9',
            equilateralPolygon(
                9, 20
            ),
            Transform.translated(col2 + 100 + 15, rowH * 8),
            noFillStyle,
        ),
        primitiveDrawable(
            '7-equilateral_polygon_10',
            equilateralPolygon(
                10, 20
            ),
            Transform.translated(col2 + 150 + 15, rowH * 8),
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