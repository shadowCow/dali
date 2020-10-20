import { Buttons, ButtonMap, createKeyboard } from '../input/Keyboard';
import * as Matter from 'matter-js';
import { createEngine } from './top-down-physics';
import { text } from '../../drawables/primitives/primitiveShapes';
import { EntityStore, GameEngine, GameEntity } from '../GameEngine';
import { TextureLoader, Texture } from '../sprites/Texture';
import { bootUp } from './game2dTopDown';
import { Sprite } from '../sprites/Sprite';

const textureParams: TextureLoader.Params[] = [
    TextureLoader.irregularParams(
        'link_sprites.png',
        [TextureLoader.irregularReference(
            'link_idle_down',
            0,
            0,
            16,
            16,
        ),TextureLoader.irregularReference(
            'link_moving_down',
            0,
            32,
            16,
            16,
        )],
    ),
    TextureLoader.irregularParams(
        'tiles-overworld.png',
        [TextureLoader.irregularReference(
            'autumn_ground',
            2 * (1 + 16),
            1,
            16,
            16,
        ),TextureLoader.irregularReference(
            'autumn_rock',
            1 * (1 + 16),
            1,
            16,
            16,
        )],
    ),
];
const Bodies = Matter.Bodies;
 

const buttonMap: ButtonMap = {
    up: 87, // W
    down: 83, // S
    left: 65, // A
    right: 68, // D
};

const buttons = createKeyboard(
    buttonMap,
    document,
);
const scale = 3;
const mapRows = 11;
const mapColumns = 16;
const tileDimensions = { x: 16, y: 16 };

bootUp({
    textureParams,
    createInitialEntities,
    gameUpdateFn,
    scale,
});

function createInitialEntities(
    resources: GameEngine.Resources,
): GameEntity.State[] {
    const map = createMap(
        resources.textureCache['autumn_ground'],
    );

    map.forEach((r,ri) => r.forEach((s,ci) => {
        s.cx = ci * tileDimensions.x + tileDimensions.x/2;
        s.cy = ri * tileDimensions.y + tileDimensions.y/2;
    }));

    const rockPhysics = Bodies.rectangle(72, 72, 16, 16, {isStatic: true});
    const rock = {
        id: 'rock',
        renderer: Sprite.createStatic(
            'autumn_rock',
            rockPhysics.position.x,
            rockPhysics.position.y,
            resources.textureCache['autumn_rock'],
        ),
        physics: rockPhysics,
    };

    const linkId = 'link';
    const linkCollider = Bodies.rectangle(8,8,16,16);
    const linkSprite = Sprite.createAnimated(
        linkId,
        linkCollider.position.x,
        linkCollider.position.y,
        [
            resources.textureCache['link_idle_down'],
            resources.textureCache['link_moving_down'],
        ],
        250,
    );
    const link = {
        id: linkId,
        renderer: linkSprite,
        physics: linkCollider,
    };

    const entities: GameEntity.State[] = [];

    map.forEach(r => r.forEach(item => {
        entities.push({
            id: item.id,
            renderer: item,
        });
    }));

    entities.push(link);
    entities.push(rock);

    return entities;
}

const movementPerMs = 48 / 1000;

function gameUpdateFn(
    resources: GameEngine.Resources,
    entities: EntityStore.State,
    dt: number
): EntityStore.Update[] {
    const updates: EntityStore.Update[] = [];

    const linkVelocity = {x: 0, y: 0};
    if (buttons.up) {
        linkVelocity.y += -1 * movementPerMs * dt;
        // linkSprite.y -= movementPerMs * delta;
    }
    if (buttons.down) {
        linkVelocity.y += movementPerMs * dt;
        // linkSprite.y += movementPerMs * delta;
    }
    if (buttons.left) {
        linkVelocity.x += -1 * movementPerMs * dt;
        // linkSprite.x -= movementPerMs * delta;
    }
    if (buttons.right) {
        linkVelocity.x += movementPerMs * dt;
        // linkSprite.x += movementPerMs * delta;
    }

    const linkEntity = entities['link'];
    GameEntity.setVelocity(
        linkEntity,
        linkVelocity,
    );
    const renderer = linkEntity.renderer;
    if (renderer && renderer.tag === Sprite.StateTag.ANIMATED) {
        if (linkVelocity.x !== 0 || linkVelocity.y !== 0) {
            renderer.playing = true;
        } else {
            Sprite.transition(
                renderer,
                Sprite.reset(),
            );
        }
    }
    
    return updates;
}


function createMap(
    texture: Texture.State,
): Array<Array<Sprite.Static>> {
    const mapSprites: Array<Array<Sprite.Static>> = [];

    for (let r = 0; r < mapRows; r++) {
        mapSprites.push(<Sprite.Static[]>[]);
        for (let c = 0; c < mapColumns; c++) {
            const id = `map_${c}_${r}`;
            mapSprites[r].push(Sprite.createStatic(
                id,
                0,
                0,
                texture,
            ));
        }
    }

    return mapSprites;
}
