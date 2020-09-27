import * as PIXI from 'pixi.js';
import { Buttons, ButtonMap, createKeyboard } from '../../input/Keyboard';
import * as Matter from 'matter-js';
import { createEngine } from './top-down-physics';

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
 
// to run the engine from a game loop...
// Engine.update(engine, delta)

const engine = createEngine();

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

const app = new PIXI.Application({
    width: 256*2,
    height: 176*2,
    backgroundColor: 0x1099bb,
    autoStart: false,
    //resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);

app.loader
    .add('link', 'link_sprites.json')
    .add('tileset', 'zelda_1_overworld.json')
    .load(run);

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
            textureNames: ['grave_dirt.png'],
        }],
    );
    const movementPer16ms = 2;

    const container = new PIXI.Container();
    container.scale.set(2,2);

    app.stage.addChild(container);

    const map = createMap(
        zeldaTextures['tileset']['grave_dirt.png'],
    );

    map.forEach((r,ri) => r.forEach((s,ci) => {
        s.x = ci * 16;
        s.y = ri * 16;
        container.addChild(s);
    }));

    // try out collisions!
    const invisibleRock = Bodies.rectangle(72, 72, 16, 16, {isStatic: true});
    World.add(engine.world, invisibleRock);

    const linkCollider = Bodies.rectangle(8,8,16,16);
    World.add(engine.world, linkCollider);
    console.log(engine.world);
    const linkSprite = new PIXI.Sprite(
        zeldaTextures['link']['link_idle_down.png'],
    );
    linkSprite.anchor.set(0.5, 0.5);
    linkSprite.x = linkCollider.position.x;
    linkSprite.y = linkCollider.position.y;

    container.addChild(linkSprite);

    // Listen for animate update
    app.ticker.add((delta) => {
        const velocity = {x: 0, y: 0};
        if (buttons.up) {
            velocity.y += -1 * movementPer16ms * delta;
            // linkSprite.y -= movementPer16ms * delta;
        }
        if (buttons.down) {
            velocity.y += movementPer16ms * delta;
            // linkSprite.y += movementPer16ms * delta;
        }
        if (buttons.left) {
            velocity.x += -1 * movementPer16ms * delta;
            // linkSprite.x -= movementPer16ms * delta;
        }
        if (buttons.right) {
            velocity.x += movementPer16ms * delta;
            // linkSprite.x += movementPer16ms * delta;
        }
        Matter.Body.setVelocity(
            linkCollider,
            velocity,
        );

        Matter.Engine.update(engine, 16.666);

        linkSprite.x = linkCollider.position.x;
        linkSprite.y = linkCollider.position.y;
        // console.log('link at', linkSprite.position);
    });
    
    app.start();
     
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
    
    const numRows = 11;
    const numColumns = 16;

    for (let r = 0; r < numRows; r++) {
        mapSprites.push(<PIXI.Sprite[]>[]);
        for (let c = 0; c < numColumns; c++) {
            mapSprites[r].push(new PIXI.Sprite(texture));
        }
    }

    return mapSprites;
}