import { Painter } from '../painter/Painter';
import { createCanvasAndPainter } from '../painter/CanvasPainter';
import { run } from '../index';
import { loadImages, ImageCache } from '../drawables/ImageCache';
import * as Scene from '../scene/Scene';
import { Drawable } from '../drawables/drawable';

const canvasContainerId = 'canvas-container';
const canvasId = 'drawing-canvas';

export function boot(
    imagePaths: string[],
    sceneCreator: (imageCache: ImageCache) => Scene.State<Drawable>,
): void {
    const painter: Painter | null = createCanvasAndPainter(
        document,
        canvasContainerId,
        canvasId
    );
    
    if (!painter) {
        throw new Error('Unable to create canvas');
    } else {
        
        loadImages(imagePaths).then(imageCache => {
            const scene = sceneCreator(imageCache);
    
            run(painter, scene);
        });
    }
}
