import { Painter } from '../painter/Painter';
import { createCanvasAndPainter } from '../painter/CanvasPainter';
import { run } from '../index';
import { exampleData } from '../scene/examples/canary';
import * as Scene from '../scene/Scene';

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
    exampleData.forEach(e => Scene.transition(scene, Scene.addDrawable(e)));
    run(painter, scene);
}