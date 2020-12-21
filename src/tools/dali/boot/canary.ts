import { start } from '../Dali';
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
import { Moon } from '../drawables/composites/celestial/Moon';
import { leaf, branch } from '../../../data_structures/Tree';
import { modify } from '../drawables/pipeline';
import { vec3 } from '../../../math/Vec';


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
modify(waves.content)
    .translate(vec3(300, 300, 0))
    .style(stroke(Colors.Blue()));

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
modify(eyes.content)
    .translate(vec3(100, 400, 0));

const window = Window(
    'the-window',
    {
        frameWidth: 50,
        frameHeight: 100,
        frameThickness: 5,
        frameColor: Colors.Black(),
    }
);
modify(window.content)
    .translate(vec3(500, 50, 0));

const sun = Sun(
    'the-sun',
    {
        radius: 30,
    }
);
modify(sun.content)
    .translate(vec3(500, 200, 0));

const moon = Moon(
    'the-moon',
    {
        radius: 50,
        phaseRatio: 0.42,
    }
);
modify(moon.content)
    .translate(vec3(350, 80, 0));

const grassTuft = GrassTuft(
    'the-grass',
    {
        color: Colors.Green(),
        bladeHalfWidth: 5,
        minBladeHeight: 15,
        maxBladeHeight: 30,
    }
);
modify(grassTuft.content)
    .translate(vec3(250, 50, 0));

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
modify(fir.content)
    .translate(vec3(300, 250, 0));

const root = branch(
    [reds, waves, eyes, window, sun, moon, grassTuft, fir],
    drawableGroup('root'),
);

start(
    root,
    [],
);
