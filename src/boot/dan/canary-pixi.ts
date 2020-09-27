import * as PIXI from 'pixi.js';
import { Buttons, ButtonMap, createKeyboard } from '../../input/Keyboard';

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
    .load(run);

function run(
    loader: PIXI.Loader,
    resources: Partial<Record<string, PIXI.LoaderResource>>,
) {
    const movementPer16ms = 2;

    const container = new PIXI.Container();
    container.scale.set(2,2);

    app.stage.addChild(container);

    const linkResource = resources['link'];
    if (linkResource) {
        const linkTextures = linkResource.textures;
        if (linkTextures) {
            const linkSprite = new PIXI.Sprite(
                linkTextures['link_idle_down.png'],
            );
            linkSprite.x = 0;
            linkSprite.y = 0;

            container.addChild(linkSprite);

            // Listen for animate update
            app.ticker.add((delta) => {
                if (buttons.up) {
                    linkSprite.y -= movementPer16ms * delta;
                }
                if (buttons.down) {
                    linkSprite.y += movementPer16ms * delta;
                }
                if (buttons.left) {
                    linkSprite.x -= movementPer16ms * delta;
                }
                if (buttons.right) {
                    linkSprite.x += movementPer16ms * delta;
                }
            });
            
            app.start();
        }
        
    }
    
}
