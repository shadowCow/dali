import { Painter } from "./painter/Painter";
import { animate } from "./drawables/animation";
import { SceneImpl, Scene } from "./scene/Scene";

export function run(
  painter: Painter,
  scene: Scene = new SceneImpl(),
) {
  animate(
    scene,
    painter,
  );
}
