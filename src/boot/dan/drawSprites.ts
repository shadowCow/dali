import { boot } from '../boot';
import { ImageCache, loadImages } from '../../drawables/ImageCache';
import * as Scene from '../../scene/Scene';
import * as SceneLayer from '../../scene/SceneLayer';
import { Drawable, primitiveDrawable, compositeDrawable } from '../../drawables/drawable';
import { Painter } from '../../painter/Painter';
import { run } from '../../index';
import { loadSpriteSheet, SpriteMapCache } from '../../sprites/SpriteSheet';
import { PrimitiveTypes, image } from '../../drawables/primitives/primitiveShapes';
import * as Transform from '../../drawables/transform/Transform';

boot({
    imagePaths: ['zelda_1_overworld.png'],
    loadSpriteSheetParams: [{
        imageName: 'zelda_1_overworld.png',
        spriteMapId: 'zelda',
        offsetX: 1,
        offsetY: 11,
        spriteWidth: 16,
        spriteHeight: 16,
    }],
    sceneCreator: zeldaScene,
});

function zeldaScene(
    imageCache: ImageCache,
    spriteMapCache: SpriteMapCache,
): Scene.State<Drawable> {
    const drawables: Drawable[] = [];

    // iterate through sprites
    spriteMapCache['zelda'].sprites.forEach((row, ri) => {
        row.forEach((bitmap, ci) => {
            drawables.push(primitiveDrawable(
                '' + ri + ',' + ci,
                image(bitmap),
                // set the sprite position based on its indices and
                // the size of each sprite
                Transform.create({
                    translate: {
                        x: ci * (16 + 5),
                        y: ri * (16 + 5),
                    },
                }),
            ));
        });
    });
    

    // you could also reference them by indexes
    //   spriteMapCache['zelda'].sprites[3][2]
    //
    // would get the sprite at row index 3, column index 2

    return Scene.animatedScene({
        layers: [
            SceneLayer.animatedLayer(
                '1',
                SceneLayer.toState(
                    drawables,
                ),
            ),
        ],
    });
}
