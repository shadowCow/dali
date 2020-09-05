import { boot } from '../boot';
import { ImageCache, loadImages } from '../../drawables/ImageCache';
import * as Scene from '../../scene/Scene';
import { Drawable } from '../../drawables/drawable';
import { Painter } from '../../painter/Painter';
import { createCanvasAndPainter } from '../../painter/CanvasPainter';
import { run } from '../../index';
import { loadSpriteSheet } from '../../spritesheet/sprites';

export function drawSprites(): void {
    const canvasContainerId = 'canvas-container';
    const canvasId = 'drawing-canvas';
    
    const painter: Painter | null = createCanvasAndPainter(
        document,
        canvasContainerId,
        canvasId
    );
    const imagePaths = ['zelda_1_overworld.png'];
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
        
    
    if (!painter) {
        throw new Error('Unable to create canvas');
    } else if (!ctx) {
        throw new Error('Unable to create canvas');
    } else {
        
        loadImages(imagePaths).then(imageCache => {
            loadSpriteSheet(
                imageCache['zelda_1_overworld.png'],
                'zelda',
                0,
                0,
                16,
                16,
            ).then(spriteMap => {
                spriteMap.sprites.forEach((row, ri) => {
                    row.forEach((bitmap, ci) => {
                        ctx.drawImage(
                            bitmap,
                            ci * 16,
                            ri * 16,
                        );
                    });
                });
            });
        });
    }
}
