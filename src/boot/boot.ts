import { Painter } from '../painter/Painter';
import { run } from '../index';
import { loadImages, ImageCache } from '../drawables/ImageCache';
import * as Scene from '../scene/Scene';
import { Drawable } from '../drawables/drawable';
import { LoadSpriteSheetParams, loadSpriteSheets, SpriteMapCache } from '../sprites/SpriteSheet';
import { CanvasPainter } from '../painter/CanvasPainter';

const canvasContainerId = 'canvas-container';
const canvasId = 'drawing-canvas';

export type BootParams = {
    imagePaths: string[],
    loadSpriteSheetParams: LoadSpriteSheetParams[],
    sceneCreator: (
        imageCache: ImageCache,
        spriteMapCache: SpriteMapCache,
    ) => Scene.State<Drawable>,
}

export function boot(
    params: BootParams,
): void {
    const painter: Painter | null = CanvasPainter.create(
        document,
        canvasContainerId,
        canvasId
    );
    
    if (!painter) {
        throw new Error('Unable to create canvas');
    } else {
        
        loadImages(params.imagePaths)
            .then(imageCache => {
                return loadSpriteSheets(
                    imageCache,
                    params.loadSpriteSheetParams,
                ).then(spriteMapCache => {
                    return {
                        imageCache,
                        spriteMapCache,
                    };
                });
            }).then(({imageCache, spriteMapCache}) => {

                const scene = params.sceneCreator(
                    imageCache,
                    spriteMapCache,
                );
    
                run(painter, scene);
            });
    }
}
