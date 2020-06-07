import { Painter } from "./painter/Painter";
import { createCanvasAndPainter } from "./painter/CanvasPainter";
import { exampleData } from './scene/examples/canary';
import { animate, AnimationTimeline } from "./animation/animation";

const canvasContainerId = "canvas-container";
const canvasId = "drawing-canvas";

const painter: Painter | null = createCanvasAndPainter(
  document,
  canvasContainerId,
  canvasId
)

if (!painter) {
  throw new Error('Unable to create canvas');
}

const scene = {
  drawables: exampleData,
}
const animations: AnimationTimeline[] = [];

animate(
  scene,
  animations,
  painter,
);
