import { Painter } from '../painter/Painter';
import { createCanvasAndPainter } from '../painter/CanvasPainter';
import { run } from '../index';
import { exampleData } from './examples/canary';
import * as Scene from '../scene/Scene';
import * as SceneLayer from '../scene/SceneLayer';
import { loadImages } from '../drawables/ImageCache';
import { primitiveDrawable } from '../drawables/drawable';
import { image } from '../drawables/primitives/primitiveShapes';

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
    
    loadImages([ 
        '3d_box.png',
    ]).then(imageCache => {
        const examples = exampleData(imageCache);
        const scene = Scene.animatedScene({
            layers: [
                SceneLayer.animatedLayer(
                    '1',
                    SceneLayer.toState(examples),
                ),
            ],
        });

        run(painter, scene);
    });
}