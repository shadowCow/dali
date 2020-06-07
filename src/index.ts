import { Painter } from "./painter/Painter";
import { createCanvasAndPainter } from "./painter/CanvasPainter";
import { exampleData } from './scene/examples/canary';
import { animate, AnimationTimeline } from "./animation/animation";
import { SceneImpl } from "./scene/Scene";

const canvasContainerId = "canvas-container";
const canvasId = "drawing-canvas";

const painter: Painter | null = createCanvasAndPainter(
  document,
  canvasContainerId,
  canvasId
)

if (!painter) {
  throw new Error('Unable to create canvas');
} else {
  run(painter);
}

function run(
  painter: Painter,
) {
  const scene = new SceneImpl();
  exampleData.forEach(e => scene.add(e));
  const animations: AnimationTimeline[] = [];
  
  animate(
    scene,
    animations,
    painter,
  );
}

