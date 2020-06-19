import { AnimatedStyles, defaultAnimatedStyles } from '../drawables/animation';
import { Drawable } from '../drawables/drawable';
import { bezierCurveTo, ellipse, line, lineTo, moveTo, path, polygon, polyline, quadraticCurveTo, rect, text, square, circle } from '../drawables/primitives/primitiveShapes';
import { Color, color, Colors, stroke, strokeAndFill } from '../drawables/primitives/styles';
import { run } from '../index';
import { createCanvasAndPainter } from '../painter/CanvasPainter';
import { Painter } from '../painter/Painter';
import { SceneImpl } from '../scene/Scene';


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
    const scene = new SceneImpl();

    // populate this with whatever you want
    const col2 = 200;
    const rowH = 50;
    const noFillStyle: AnimatedStyles = {
        typeTag: 'stroke',
        styles: stroke(Colors.Black(), 3),
        animations: [],
    };
    const fillStyle = function (color: Color): AnimatedStyles {
        return {
            typeTag: 'stroke_and_fill',
            styles: strokeAndFill(Colors.Black(), 3, color),
            animations: [],
        };
    }

    const drawables: Drawable[] = [
        {
            typeTag: 'primitive_drawable',
            id: '0-rectangle',
            primitive: {
                typeTag: 'rect',
                primitive: rect(3, 3, 500, rowH * 6 + 20),
                animations: [],
            },
            styles: fillStyle(color(230, 230, 230)),
            transforms: [],
        },
        {
            typeTag: 'primitive_drawable',
            id: '1-line_label',
            primitive: {
                typeTag: 'text',
                primitive: text(10, rowH, 'line'),
                animations: [],
            },
            styles: defaultAnimatedStyles(),
            transforms: [],
        },
        {
            typeTag: 'primitive_drawable',
            id: '1-line',
            primitive: {
                typeTag: 'line',
                primitive: line(col2, 15, col2 + 100, 45),
                animations: [],
            },
            styles: noFillStyle,
            transforms: [],
        },
        {
            typeTag: 'primitive_drawable',
            id: '2-rectangle_label',
            primitive: {
                typeTag: 'text',
                primitive: text(10, rowH * 2, 'rectangle'),
                animations: [],
            },
            styles: defaultAnimatedStyles(),
            transforms: [],
        },
        {
            typeTag: 'primitive_drawable',
            id: '2-rectangle',
            primitive: {
                typeTag: 'rect',
                primitive: rect(col2, rowH * 2 - 2 - 20, 100, 20),
                animations: [],
            },
            styles: noFillStyle,
            transforms: [],
        },
        {
            typeTag: 'primitive_drawable',
            id: '2-rectangle-rounded',
            primitive: {
                typeTag: 'rect',
                primitive: rect(col2 + 110, rowH * 2 - 2 - 30, 100, 40, 30, 10),
                animations: [],
            },
            styles: noFillStyle,
            transforms: [],
        },
        {
            typeTag: 'primitive_drawable',
            id: '2-rectangle-square',
            primitive: {
                typeTag: 'rect',
                primitive: square(col2 + 110 + 110, rowH * 2 - 2 - 30, 40),
                animations: [],
            },
            styles: noFillStyle,
            transforms: [],
        },
        {
            typeTag: 'primitive_drawable',
            id: '3-ellipse_label',
            primitive: {
                typeTag: 'text',
                primitive: text(10, rowH * 3, 'ellipse'),
                animations: [],
            },
            styles: defaultAnimatedStyles(),
            transforms: [],
        },
        {
            typeTag: 'primitive_drawable',
            id: '3-ellipse-circle',
            primitive: {
                typeTag: 'ellipse',
                primitive: circle(col2 + 15, rowH * 3 - 15, 15),
                animations: [],
            },
            styles: fillStyle(Colors.White()),
            transforms: [],
        },
        {
            typeTag: 'primitive_drawable',
            id: '3-ellipse-oval',
            primitive: {
                typeTag: 'ellipse',
                primitive: ellipse(col2 + 70, rowH * 3 - 15, 35, 15),
                animations: [],
            },
            styles: fillStyle(Colors.Green()),
            transforms: [],
        },
        {
            typeTag: 'primitive_drawable',
            id: '4-polyline_line_label',
            primitive: {
                typeTag: 'text',
                primitive: text(10, rowH * 4, 'polyline'),
                animations: [],
            },
            styles: defaultAnimatedStyles(),
            transforms: [],
        },
        {
            typeTag: 'primitive_drawable',
            id: '4-polyline_line',
            primitive: {
                typeTag: 'polyline',
                primitive: polyline(
                    { x: col2 + 20 + 0, y: rowH * 4 },
                    { x: col2 + 20 + 0, y: rowH * 4 - 20 },
                    { x: col2 + 20 + 17, y: rowH * 4 - 30 },
                    { x: col2 + 20 + 34, y: rowH * 4 - 20 },
                    { x: col2 + 20 + 34, y: rowH * 4 - 0 },
                    { x: col2 + 20 + 17, y: rowH * 4 + 10 },
                    { x: col2 + 20 + 0, y: rowH * 4 },
                ),
                animations: [],
            },
            styles: noFillStyle,
            transforms: [],
        },
        {
            typeTag: 'primitive_drawable',
            id: '5-polygon_label',
            primitive: {
                typeTag: 'text',
                primitive: text(10, rowH * 5, 'polygon'),
                animations: [],
            },
            styles: defaultAnimatedStyles(),
            transforms: [],
        },
        {
            typeTag: 'primitive_drawable',
            id: '5-polygon',
            primitive: {
                typeTag: 'polygon',
                primitive: polygon(
                    { x: col2 + 0, y: rowH * 5 },
                    { x: col2 + 0, y: rowH * 5 - 20 },
                    { x: col2 + 17, y: rowH * 5 - 30 },
                    { x: col2 + 34, y: rowH * 5 - 20 },
                    { x: col2 + 34, y: rowH * 5 - 0 },
                    { x: col2 + 17, y: rowH * 5 + 10 },
                    { x: col2, y: rowH * 5 },
                ),
                animations: [],
            },
            styles: fillStyle(Colors.Red()),
            transforms: [],
        },
        {
            typeTag: 'primitive_drawable',
            id: '6-path_label',
            primitive: {
                typeTag: 'text',
                primitive: text(10, rowH * 6, 'path'),
                animations: [],
            },
            styles: defaultAnimatedStyles(),
            transforms: [],
        },
        {
            typeTag: 'primitive_drawable',
            id: '6-path',
            primitive: {
                typeTag: 'path',
                primitive: path(
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
                animations: [],
            },
            styles: fillStyle(Colors.Blue()),
            transforms: [],
        },
    ];

    drawables.forEach(d => scene.add(d));

    run(painter, scene);
}