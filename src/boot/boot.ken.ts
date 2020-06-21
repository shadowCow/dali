import { Drawable } from '../drawables/drawable';
import { bezierCurveTo, ellipse, line, lineTo, moveTo, path, polygon, polyline, quadraticCurveTo, rect, text } from '../drawables/primitives/primitiveShapes';
import { stroke, strokeAndFill } from '../drawables/styles/Styles';
import { run } from '../index';
import { createCanvasAndPainter } from '../painter/CanvasPainter';
import { Painter } from '../painter/Painter';
import * as Scene from '../scene/Scene';
import { Colors, Color, color } from '../drawables/styles/Color';
import { createAnimatedTransform, AnimatedStyles, createAnimatedStyles } from '../drawables/animation/Animation';


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
    const scene = Scene.create();
    
    // populate this with whatever you want
    const col2 = 200;
    const rowH = 50;
    const noFillStyle: AnimatedStyles = {
        kind: 'stroke',
        styles: stroke(Colors.Black(), 3),
    };
    const fillStyle = function (color: Color): AnimatedStyles {
        return {
            kind: 'stroke_and_fill',
            styles: strokeAndFill(Colors.Black(), 3, color),
        };
    };

    const drawables: Drawable[] = [
        {
            kind: 'primitive_drawable',
            id: '0-rectangle',
            transform: createAnimatedTransform(),
            primitive: {
                kind: 'rect',
                primitive: rect(3, 3, 500, rowH * 6 + 20),
            },
            styles: fillStyle(color(230, 230, 230)),
        },
        {
            kind: 'primitive_drawable',
            id: '1-line_label',
            transform: createAnimatedTransform(),
            primitive: {
                kind: 'text',
                primitive: text(10, rowH, 'line'),
            },
            styles: createAnimatedStyles(),
        },
        {
            kind: 'primitive_drawable',
            id: '1-line',
            transform: createAnimatedTransform(),
            primitive: {
                kind: 'line',
                primitive: line(col2, 15, col2 + 100, 45),
            },
            styles: noFillStyle,
        },
        {
            kind: 'primitive_drawable',
            id: '2-rectangle_label',
            transform: createAnimatedTransform(),
            primitive: {
                kind: 'text',
                primitive: text(10, rowH * 2, 'rectangle'),
            },
            styles: createAnimatedStyles(),
        },
        {
            kind: 'primitive_drawable',
            id: '2-rectangle',
            transform: createAnimatedTransform(),
            primitive: {
                kind: 'rect',
                primitive: rect(col2, rowH * 2 - 2 - 20, 100, 20),
            },
            styles: noFillStyle,
        },
        {
            kind: 'primitive_drawable',
            id: '3-ellipse_label',
            transform: createAnimatedTransform(),
            primitive: {
                kind: 'text',
                primitive: text(10, rowH * 3, 'ellipse'),
            },
            styles: createAnimatedStyles(),
        },
        {
            kind: 'primitive_drawable',
            id: '3-ellipse-circle',
            transform: createAnimatedTransform(),
            primitive: {
                kind: 'ellipse',
                primitive: ellipse(col2 + 15, rowH * 3 - 15, 15, 15),
            },
            styles: fillStyle(Colors.White()),
        },
        {
            kind: 'primitive_drawable',
            id: '3-ellipse-oval',
            transform: createAnimatedTransform(),
            primitive: {
                kind: 'ellipse',
                primitive: ellipse(col2 + 70, rowH * 3 - 15, 35, 15),
            },
            styles: fillStyle(Colors.Green()),
        },
        {
            kind: 'primitive_drawable',
            id: '4-polyline_line_label',
            transform: createAnimatedTransform(),
            primitive: {
                kind: 'text',
                primitive: text(10, rowH * 4, 'polyline'),
            },
            styles: createAnimatedStyles(),
        },
        {
            kind: 'primitive_drawable',
            id: '4-polyline_line',
            transform: createAnimatedTransform(),
            primitive: {
                kind: 'polyline',
                primitive: polyline(
                    { x: col2 + 20 + 0, y: rowH * 4 },
                    { x: col2 + 20 + 0, y: rowH * 4 - 20 },
                    { x: col2 + 20 + 17, y: rowH * 4 - 30 },
                    { x: col2 + 20 + 34, y: rowH * 4 - 20 },
                    { x: col2 + 20 + 34, y: rowH * 4 - 0 },
                    { x: col2 + 20 + 17, y: rowH * 4 + 10 },
                    { x: col2 + 20 + 0, y: rowH * 4 },
                ),
            },
            styles: noFillStyle,
        },
        {
            kind: 'primitive_drawable',
            id: '5-polygon_label',
            transform: createAnimatedTransform(),
            primitive: {
                kind: 'text',
                primitive: text(10, rowH * 5, 'polygon'),
            },
            styles: createAnimatedStyles(),
        },
        {
            kind: 'primitive_drawable',
            id: '5-polygon',
            transform: createAnimatedTransform(),
            primitive: {
                kind: 'polygon',
                primitive: polygon(
                    { x: col2 + 0, y: rowH * 5 },
                    { x: col2 + 0, y: rowH * 5 - 20 },
                    { x: col2 + 17, y: rowH * 5 - 30 },
                    { x: col2 + 34, y: rowH * 5 - 20 },
                    { x: col2 + 34, y: rowH * 5 - 0 },
                    { x: col2 + 17, y: rowH * 5 + 10 },
                    { x: col2, y: rowH * 5 },
                ),
            },
            styles: fillStyle(Colors.Red()),
        },
        {
            kind: 'primitive_drawable',
            id: '6-path_label',
            transform: createAnimatedTransform(),
            primitive: {
                kind: 'text',
                primitive: text(10, rowH * 6, 'path'),
            },
            styles: createAnimatedStyles(),
        },
        {
            kind: 'primitive_drawable',
            id: '6-path',
            transform: createAnimatedTransform(),
            primitive: {
                kind: 'path',
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
            },
            styles: fillStyle(Colors.Blue()),
        },
    ];

    drawables.forEach(d => Scene.transition(scene, Scene.addDrawable(d)));

    run(painter, scene);
}