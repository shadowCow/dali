import { Painter } from '../painter/Painter';
import { createCanvasAndPainter } from '../painter/CanvasPainter';
import { run } from '../index';
import { SceneImpl } from '../scene/Scene';
import { exampleData } from '../scene/examples/canary';

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
    exampleData.forEach(e => scene.add(e));
    run(painter, scene);
}