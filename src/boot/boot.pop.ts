import { Painter } from '../painter/Painter';
import { createCanvasAndPainter } from '../painter/CanvasPainter';
import { run } from '../index';
import { Drawable } from '../drawables/drawable';
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
    
    // populate this with whatever you want
    const drawables: Drawable[] = [];

    drawables.forEach(d => Scene.transition(scene, Scene.addDrawable(d)));
  
    run(painter, scene);
}