import { boot } from '../boot';
import { ImageCache, loadImages } from '../../drawables/ImageCache';
import * as Scene from '../../scene/Scene';
import * as SceneLayer from '../../scene/SceneLayer';
import { Drawable, primitiveDrawable } from '../../drawables/drawable';
import { Painter } from '../../painter/Painter';
import { run } from '../../index';
import { loadSpriteSheet, SpriteMapCache } from '../../sprites/SpriteSheet';
import { PrimitiveTypes, image } from '../../drawables/primitives/primitiveShapes';
import * as Transform from '../../drawables/transform/Transform';
import { Vec2 } from '../../drawables/transform/Vec';

const zeldaMap: ZeldaOneMap = {
    tiles: [
        [
            {x:6,y:6},{x:6,y:6},{x:6,y:6},{x:6,y:6},{x:6,y:6},{x:6,y:6},{x:6,y:6},{x:6,y:6},{x:6,y:6},{x:6,y:6},{x:6,y:6},{x:6,y:6},{x:6,y:6},{x:6,y:6},{x:6,y:6},{x:6,y:6},
        ],
        [
            {x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},
        ],
        [
            {x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:6},{x:1,y:4},{x:1,y:6},{x:1,y:4},{x:1,y:6},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},
        ],
        [
            {x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},
        ],
        [
            {x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:6},{x:1,y:4},{x:1,y:6},{x:1,y:4},{x:1,y:6},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},
        ],
        [
            {x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},
        ],
        [
            {x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:6},{x:1,y:4},{x:1,y:6},{x:1,y:4},{x:1,y:6},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:4,y:3},{x:1,y:4},{x:1,y:4},
        ],
        [
            {x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},
        ],
        [
            {x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},{x:1,y:4},
        ],
        [
            {x:4,y:6},{x:4,y:6},{x:4,y:6},{x:4,y:6},{x:4,y:6},{x:4,y:6},{x:4,y:6},{x:4,y:6},{x:4,y:6},{x:4,y:6},{x:4,y:6},{x:4,y:6},{x:4,y:6},{x:4,y:6},{x:4,y:6},{x:4,y:6},
        ],
        [
            {x:6,y:6},{x:6,y:6},{x:6,y:6},{x:6,y:6},{x:6,y:6},{x:6,y:6},{x:6,y:6},{x:6,y:6},{x:6,y:6},{x:6,y:6},{x:6,y:6},{x:6,y:6},{x:6,y:6},{x:6,y:6},{x:6,y:6},{x:6,y:6},
        ],
    ],
};

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
    const mapLayout = zeldaMap;
    
    mapLayout.tiles.forEach((row, ri) => {
        row.forEach((item, ci) => {
            const sprite = spriteMapCache['zelda'].sprites[item.y][item.x];

            drawables.push(primitiveDrawable(
                '' + ri + ',' + ci,
                image(sprite),
                Transform.create({
                    translate: {
                        x: ci * 16,
                        y: ri * 16,
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

// 11 x 16 grid of x,y coords
// to look up sprites from sprite map
type ZeldaOneMap = {
    tiles: [
        ZeldaOneTileRow,
        ZeldaOneTileRow,
        ZeldaOneTileRow,
        ZeldaOneTileRow,
        ZeldaOneTileRow,
        ZeldaOneTileRow,
        ZeldaOneTileRow,
        ZeldaOneTileRow,
        ZeldaOneTileRow,
        ZeldaOneTileRow,
        ZeldaOneTileRow,      
    ]
}

type ZeldaOneTileRow = [
    Vec2,
    Vec2,
    Vec2,
    Vec2,
    Vec2,
    Vec2,
    Vec2,
    Vec2,
    Vec2,
    Vec2,
    Vec2,
    Vec2,
    Vec2,
    Vec2,
    Vec2,
    Vec2,
];
