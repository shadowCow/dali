import { Buttons, ButtonMap, createKeyboard } from '../../input/Keyboard';
import * as Matter from 'matter-js';
import { createEngine } from './top-down-physics';
import { text } from '../../drawables/primitives/primitiveShapes';
import { EntityStore, GameEngine, GameEntity } from '../../game/Game';
import { TextureLoader } from '../../sprites/Texture';

const textureParams: TextureLoader.Params[] = [
    TextureLoader.irregularParams(
        'link_sprites.png',
        [TextureLoader.irregularReference(
            'link_idle_down',
            0,
            0,
            16,
            16,
        )],
    ),
    TextureLoader.irregularParams(
        'tiles-overworld',
        [TextureLoader.irregularReference(
            'autumn_ground',
            0,
            0,
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


function run(
    loader: PIXI.Loader,
    resources: Partial<Record<string, PIXI.LoaderResource>>,
) {
    const zeldaTextures = getZeldaTextures(
        resources,
        [{
            resourceName: 'link',
            textureNames: ['link_idle_down.png'],
        },{
            resourceName: 'tileset',
            textureNames: ['autumn_ground.png'],
        }],
    );
    const movementPer16ms = 2;

    const container = new PIXI.Container();
    container.scale.set(scale, scale);

    const map = createMap(
        zeldaTextures['tileset']['autumn_ground.png'],
    );

    map.forEach((r,ri) => r.forEach((s,ci) => {
        s.roundPixels = true;
        s.x = ci * tileDimensions.x;
        s.y = ri * tileDimensions.y;
        container.addChild(s);
    }));

    const gameEntities = createEntities(zeldaTextures);

    const updateGameState: GameEngine.GameUpdateFn = (entities, deltaFrame) => {
        const linkVelocity = {x: 0, y: 0};
        if (buttons.up) {
            linkVelocity.y += -1 * movementPer16ms * deltaFrame;
            // linkSprite.y -= movementPer16ms * delta;
        }
        if (buttons.down) {
            linkVelocity.y += movementPer16ms * deltaFrame;
            // linkSprite.y += movementPer16ms * delta;
        }
        if (buttons.left) {
            linkVelocity.x += -1 * movementPer16ms * deltaFrame;
            // linkSprite.x -= movementPer16ms * delta;
        }
        if (buttons.right) {
            linkVelocity.x += movementPer16ms * deltaFrame;
            // linkSprite.x += movementPer16ms * delta;
        }

        const linkEntity = entities['link'];
        GameEntity.setVelocity(
            linkEntity,
            linkVelocity,
        );
    
        return [];
    };

    const gameEngineState: GameEngine.State = {
        renderer,
        stage: container,
        physicsEngine: engine,
        entities: EntityStore.create(gameEntities),
    };

    GameEngine.run(
        gameEngineState,
        updateGameState,
    );
}

/*
Texture lookups for non-null guaranteed usage.
*/
type TextureGroupLookup = {
    [k: string]: TextureLookup,
}

type TextureLookup = {
    [k: string]: PIXI.Texture,
}

type ResourceKeys = {
    resourceName: string,
    textureNames: string[]
}

function getZeldaTextures(
    resources: Partial<Record<string, PIXI.LoaderResource>>,
    resourceKeys: ResourceKeys[],
): TextureGroupLookup {
    const textureGroupLookup: TextureGroupLookup = {};

    resourceKeys.forEach(resourceKey => {
        const resource = resources[resourceKey.resourceName];
        if (resource) {
            const textures = resource.textures;
            if (textures) {
                const textureLookup: TextureLookup = {};
                textureGroupLookup[resourceKey.resourceName] = textureLookup;
                resourceKey.textureNames.forEach(textureName => {
                    const texture = textures[textureName];
                    texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
                    if (texture) {
                        textureLookup[textureName] = texture;
                    } else {
                        throw `Missing texture ${textureName} from resource ${resourceKey.resourceName}`;
                    }
                });
            } else {
                throw `Missing textures for ${resourceKey.resourceName}`;
            }
        } else {
            throw `Missing resource ${resourceKey.resourceName}`;
        }
    });
    
    return textureGroupLookup;
}


function createMap(
    texture: PIXI.Texture,
): Array<Array<PIXI.Sprite>> {
    const mapSprites: Array<Array<PIXI.Sprite>> = [];

    for (let r = 0; r < mapRows; r++) {
        mapSprites.push(<PIXI.Sprite[]>[]);
        for (let c = 0; c < mapColumns; c++) {
            mapSprites[r].push(new PIXI.Sprite(texture));
        }
    }

    return mapSprites;
}

function createEntities(
    zeldaTextures: TextureGroupLookup,
): GameEntity.State[] {
    const invisibleRock = {
        id: 'rock',
        physics: Bodies.rectangle(72, 72, 16, 16, {isStatic: true}),
    };

    const linkCollider = Bodies.rectangle(8,8,16,16);
    const linkSprite = new PIXI.Sprite(
        zeldaTextures['link']['link_idle_down.png'],
    );
    linkSprite.anchor.set(0.5, 0.5);
    linkSprite.x = linkCollider.position.x;
    linkSprite.y = linkCollider.position.y;
    const link = {
        id: 'link',
        renderer: linkSprite,
        physics: linkCollider,
    };

    return [
        invisibleRock,
        link,
    ];
}