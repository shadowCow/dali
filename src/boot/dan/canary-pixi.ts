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
    width: 800,
    height: 600,
    backgroundColor: 0x1099bb,
    autoStart: false,
    //resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);

app.loader
    //.add('spritesheet', 'zelda_toons.json')
    .load(run);

function run(
    loader: PIXI.Loader,
    resources: Partial<Record<string, PIXI.LoaderResource>>,
) {
    
    // Create a new texture
    const texture = PIXI.Texture.from('zelda_1_overworld.png');
    
    const map = new PIXI.Sprite(texture);
    // map.anchor.set(0.5);
    map.x = 0;
    map.y = 0;
    app.stage.addChild(map);
    
    const movementPer16ms = 2;
    // Listen for animate update
    app.ticker.add((delta) => {
        if (buttons.up) {
            map.y -= movementPer16ms * delta;
        }
        if (buttons.down) {
            map.y += movementPer16ms * delta;
        }
        if (buttons.left) {
            map.x -= movementPer16ms * delta;
        }
        if (buttons.right) {
            map.x += movementPer16ms * delta;
        }
    });
    
    app.start();
}
