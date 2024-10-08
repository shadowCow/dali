import {
  drawableGroup,
  DrawableGroup,
  PrimitiveDrawable,
} from "../drawables/drawable";
import { start } from "../Dali";
import { branch } from "../../../data_structures/Tree";
import { Mountain } from "../drawables/composites/land/Mountain";
import { Colors } from "../drawables/styles/Color";
import { modify } from "../drawables/pipeline";
import { vec2, vec3 } from "../../../math/Vec";
import { createTransform } from "../drawables/transform/Transform";
import { Sky } from "../drawables/composites/celestial/Sky";
import { TopSoil } from "../drawables/composites/land/TopSoil";
import { Surface } from "../drawables/composites/land/Surface";
import { OvalTree } from "../drawables/composites/tree/OvalTree";
import { Hill } from "../drawables/composites/land/Hill";
import { Sun } from "../drawables/composites/celestial/Sun";
import { UpdateActionKind, Updater } from "../Updater";
import { Cloud } from "../drawables/composites/weather/Cloud";

const sceneDimensions = vec2(1000, 500);

const mountainColor = Colors.DarkSlateGrey();
const mountain1Height = sceneDimensions.y * 0.7;
const mountain1 = Mountain("mountain1", {
  height: mountain1Height,
  color: mountainColor,
});
const mountain2 = Mountain("mountain2", {
  height: sceneDimensions.y * 0.4,
  color: mountainColor,
});
modify(mountain2.content).translate(vec3(mountain1Height / 2, 0, 0));

const mountain3 = Mountain("mountain3", {
  height: sceneDimensions.y * 0.5,
  color: mountainColor,
});
modify(mountain3.content).translate(vec3((mountain1Height * 5) / 6, 0, 0));

const mountainRange = branch(
  [mountain1, mountain2, mountain3],
  drawableGroup(
    "mountainRange",
    createTransform({
      translation: vec3(mountain1Height, (sceneDimensions.y * 3) / 4, 0),
      scale: vec3(1.5, 1.5, 1),
    })
  )
);

const sky = Sky("thesky", {
  size: 2000,
  color: Colors.SkyBlue(),
});

const grassColor = Colors.LawnGreen();
const dirtColor = Colors.SaddleBrown();
const topSoil = TopSoil("topsoil", {
  width: 2000,
  height: mountain1Height,
  grassLayerRatio: 0.1,
  grassColor,
  dirtColor,
});
modify(topSoil.content).translate(vec3(0, 500, 0));

const grassland = Surface("grassland", {
  width: 2000,
  height: 100,
  color: grassColor,
});
modify(grassland.content).translate(vec3(0, 400, 0));

const hill = Hill("hill", {
  width: 600,
  height: 300,
  paint: grassColor,
});
modify(hill.content).translate(vec3(0, 510, 0));

const foliageColor = Colors.Green();
const trunkColor = Colors.Black();
const ovalTree = OvalTree("ovaltree", {
  foliageColor,
  width: 50,
  height: 120,
  trunkColor,
  trunkHeightRatio: 0.15,
  trunkWidthRatio: 0.3,
});
modify(ovalTree.content).translate(vec3(100, 300, 0));

const sun = Sun("sun", {
  radius: 60,
  paint: Colors.Yellow(),
  blur: {
    level: 40,
    color: Colors.Yellow(),
  },
});
modify(sun.content).translate(vec3(900, 100, 0));

const cloud = Cloud("cloud", {
  color: Colors.White(),
  width: 200,
  height: 50,
});
modify(cloud.content).translate(vec3(0, 150, 0));

const cloud2 = Cloud("cloud2", {
  color: Colors.White(),
  width: 250,
  height: 75,
});
modify(cloud2.content).translate(vec3(-300, 100, 0));

const root = branch<DrawableGroup, PrimitiveDrawable>(
  [sky, sun, grassland, mountainRange, hill, topSoil, ovalTree, cloud, cloud2],
  drawableGroup("root")
);

const sunSpeed = 5 / 1000;
const moveSun: Updater = (t: number, dt: number) => {
  if (t < 500000) {
    sun.content.transform.translation.y += sunSpeed * dt;
    return { kind: UpdateActionKind.NO_OP };
  } else {
    return { kind: UpdateActionKind.REMOVE_SELF };
  }
};

const cloudSpeed = 30 / 1000;
const moveCloud: Updater = (t: number, dt: number) => {
  cloud.content.transform.translation.x += cloudSpeed * dt;
  return { kind: UpdateActionKind.NO_OP };
};
const moveCloud2: Updater = (t: number, dt: number) => {
  cloud2.content.transform.translation.x += cloudSpeed * dt;
  return { kind: UpdateActionKind.NO_OP };
};

export function startBucolic() {
  start(root, [moveSun, moveCloud, moveCloud2]);
}
