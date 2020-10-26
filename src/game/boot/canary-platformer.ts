import { ButtonMap, createKeyboard, createKeyboardControllerMap } from '../input/Keyboard';
import * as Matter from 'matter-js';
import { createTopDownPhysicsEngine } from '../physics/top-down-physics';
import { EntityStore, GameEngine, GameEntity } from '../GameEngine';
import { TextureLoader, Texture } from '../sprites/Texture';
import { bootUp } from './game2d';
import { Sprite } from '../sprites/Sprite';
import { createPlatformerPhysicsEngine } from '../physics/platformer-physics';

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
            'autumn_rock',
            1 * (1 + 16),
            1,
            16,
            16,
        )],
    ),
];
const Bodies = Matter.Bodies;
 

const keyboardControllerMap = createKeyboardControllerMap();

const keyboardController = createKeyboard(
    keyboardControllerMap,
    document,
);
const scale = 3;

bootUp({
    keyboardController,
    textureParams,
    createInitialEntities,
    createPhysicsEngine: createPlatformerPhysicsEngine,
    gameLogicFn: gameUpdateFn,
    scale,
});

function createInitialEntities(
    resources: GameEngine.Resources,
): GameEntity.State[] {

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
    const linkCollider = Bodies.rectangle(8,8,16,16,{isStatic:true});
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

    const ground = {
        id: 'ground',
        physics: Bodies.rectangle(0, 8*16, 8*16, 16, {isStatic:true}),
    };

    const entities: GameEntity.State[] = [];

    entities.push(link);
    entities.push(rock);
    entities.push(ground);

    return entities;
}

const movementPerMs = 48 / 1000;
const jumpSpeed = 100 / 1000;

function gameUpdateFn(
    resources: GameEngine.Resources,
    entities: EntityStore.State,
    dt: number
): EntityStore.Update[] {
    const updates: EntityStore.Update[] = [];
    const linkEntity = entities['link'];

    const linkVelocity = {x: 0, y: 0};
    if (keyboardController.verticalAxisMinus) {
        linkVelocity.y += -1 * jumpSpeed * dt;
    }
    if (keyboardController.horizontalAxisMinus) {
        linkVelocity.x += -1 * movementPerMs * dt;
        // linkSprite.x -= movementPerMs * delta;
    }
    if (keyboardController.horizontalAxisPlus) {
        linkVelocity.x += movementPerMs * dt;
        // linkSprite.x += movementPerMs * delta;
    }

    const physics = linkEntity.physics;
    if (physics) {
        Matter.Body.setVelocity(
            physics,
            {
                x: physics.velocity.x + linkVelocity.x,
                y: physics.velocity.y + linkVelocity.y,
            }
            
        );
    }

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

