import { Painter } from '../painter/Painter';
import { createCanvasAndPainter } from '../painter/CanvasPainter';
import { run } from '../index';
import { exampleData } from './examples/canary';
import * as Scene from '../scene/Scene';
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
    const scene = Scene.create();

    loadImages([ 
        '3d_box.png',
    ]).then(imageCache => {
        exampleData(imageCache).forEach(e => Scene.transition(scene, Scene.addDrawable(e)));
        Scene.transition(scene, Scene.addDrawable(
            primitiveDrawable(
                'the-box',
                {
                    kind: 'image',
                    primitive: image(imageCache['3d_box.png']),
                }
            )
        ));
        run(painter, scene);
    });
}