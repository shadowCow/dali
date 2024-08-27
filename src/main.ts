import { branch, leaf } from "./data_structures/Tree";
import { vec3 } from "./math/Vec";
import { start } from "./tools/dali/Dali";
import { Moon } from "./tools/dali/drawables/composites/celestial/Moon";
import { Sun } from "./tools/dali/drawables/composites/celestial/Sun";
import { EyePair } from "./tools/dali/drawables/composites/eye";
import { GrassTuft } from "./tools/dali/drawables/composites/grass/GrassTuft";
import { Fir } from "./tools/dali/drawables/composites/tree/Fir";
import { Waves } from "./tools/dali/drawables/composites/wave";
import { Window } from "./tools/dali/drawables/composites/city/buildings/Window";
import {
  drawableGroup,
  primitiveDrawable,
  PrimitiveDrawable,
} from "./tools/dali/drawables/drawable";
import { modify } from "./tools/dali/drawables/pipeline";
import {
  rect,
  ellipse,
} from "./tools/dali/drawables/primitives/GeometricPrimitive2";
import { Colors } from "./tools/dali/drawables/styles/Color";
import { styles, fill, stroke } from "./tools/dali/drawables/styles/Styles";
import { createTransform } from "./tools/dali/drawables/transform/Transform";

const myLeaf = leaf<PrimitiveDrawable>(
  primitiveDrawable(
    "1",
    rect(30, 40),
    createTransform({
      translation: { x: 50, y: 50, z: 0 },
    }),
    styles(fill(Colors.Blue()))
  )
);

const myOrb = leaf<PrimitiveDrawable>(
  primitiveDrawable(
    "2",
    ellipse(50, 50),
    createTransform({
      translation: { x: -50, y: -50, z: 0 },
    }),
    styles(fill(Colors.Green()))
  )
);
const group = drawableGroup(
  "reds",
  createTransform({
    translation: { x: 100, y: 100, z: 0 },
  }),
  styles(stroke(Colors.Red()))
);

const reds = branch([myLeaf, myOrb], group);

const waves = Waves("mywaves", {
  waveLength: 20,
  amplitude: 30,
  cycleCount: 10,
});
modify(waves.content)
  .translate(vec3(300, 300, 0))
  .style(styles(stroke(Colors.Blue())));

const eyes = EyePair("the-eyes", {
  eyeSpacing: 20,
  eyeProps: {
    irisColor: Colors.Purple(),
    irisRadius: 10,
  },
});
modify(eyes.content).translate(vec3(100, 400, 0));

const window = Window("the-window", {
  frameWidth: 50,
  frameHeight: 100,
  frameThickness: 5,
  frameColor: Colors.Black(),
});
modify(window.content).translate(vec3(500, 50, 0));

const sun = Sun("the-sun", {
  radius: 30,
  paint: Colors.Yellow(),
});
modify(sun.content).translate(vec3(500, 200, 0));

const moon = Moon("the-moon", {
  radius: 50,
  phaseRatio: 0.42,
});
modify(moon.content).translate(vec3(350, 80, 0));

const grassTuft = GrassTuft("the-grass", {
  color: Colors.Green(),
  bladeHalfWidth: 5,
  minBladeHeight: 15,
  maxBladeHeight: 30,
});
modify(grassTuft.content).translate(vec3(250, 50, 0));

const fir = Fir("tree", {
  foliageColor: Colors.Red(),
  trunkColor: Colors.Black(),
  treeWidth: 60,
  treeHeight: 150,
  trunkWidth: 25,
  trunkHeight: 20,
});
modify(fir.content).translate(vec3(300, 250, 0));

const root = branch(
  [reds, waves, eyes, window, sun, moon, grassTuft, fir],
  drawableGroup("root")
);

start(root, []);
