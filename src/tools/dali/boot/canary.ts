import { start } from '../Dali';
import { branch, leaf } from '../Tree';
import { rect, ellipse } from '../drawables/primitives/GeometricPrimitive2';
import { fill, stroke } from '../drawables/styles/Styles';
import { Colors } from '../drawables/styles/Color';
import { PrimitiveDrawable, primitiveDrawable, drawableGroup } from '../drawables/drawable';
import { createTransform } from '../drawables/transform/Transform';
import { Waves } from '../drawables/composites/wave';
import { EyePair } from '../drawables/composites/eye';
import { Window } from '../drawables/composites/buildings/Window';
import { Sun } from '../drawables/composites/celestial/Sun';
import { GrassTuft } from '../drawables/composites/grass/GrassTuft';
import { Fir } from '../drawables/composites/tree/Fir';


const myLeaf = leaf<PrimitiveDrawable>(
    primitiveDrawable(
        '1',
        rect(30, 40),
        createTransform({
            translation: {x: 50, y: 50, z: 0},
        }),
        fill(Colors.Blue()),
    )
);

const myOrb = leaf<PrimitiveDrawable>(
    primitiveDrawable(
        '2',
        ellipse(50, 50),
        createTransform({
            translation: {x: -50, y: -50, z: 0},
        }),
        fill(Colors.Green()),
    )
);
const group = drawableGroup(
    'reds',
    createTransform({
        translation: {x: 100, y: 100, z: 0},
    }),
    stroke(Colors.Red()),
);

const reds = branch(
    [myLeaf, myOrb],
    group,
);

const waves = Waves(
    'mywaves',
    {
        waveLength: 20,
        amplitude: 30,
        cycleCount: 10,
    }
);
waves.content.transform.translation = {x: 300, y: 300, z: 0};
waves.content.styles = stroke(Colors.Blue());

const eyes = EyePair(
    'the-eyes',
    {
        eyeSpacing: 20,
        eyeProps: {
            irisColor: Colors.Purple(),
            irisRadius: 10,
            
        },
    }
);
eyes.content.transform.translation = {x: 100, y: 400, z: 0};

const window = Window(
    'the-window',
    {
        frameWidth: 50,
        frameHeight: 100,
        frameThickness: 5,
        frameColor: Colors.Black(),
    }
);
window.content.transform.translation = {x: 500, y: 50, z: 0};

const sun = Sun(
    'the-sun',
    {
        radius: 30,
    }
);
sun.content.transform.translation = {x: 500, y: 200, z: 0};

const grassTuft = GrassTuft(
    'the-grass',
    {
        color: Colors.Green(),
        bladeHalfWidth: 5,
        minBladeHeight: 15,
        maxBladeHeight: 30,
    }
);
grassTuft.content.transform.translation = {x: 250, y: 50, z: 0};

const fir = Fir(
    'tree',
    {
        foliageColor: Colors.Red(),
        trunkColor: Colors.Black(),
        treeWidth: 60,
        treeHeight: 150,
        trunkWidth: 25,
        trunkHeight: 20,
    }
);
fir.content.transform.translation = {x: 300, y: 250, z: 0};

const root = branch(
    [reds, waves, eyes, window, sun, grassTuft, fir],
    drawableGroup('root'),
);

start(root);