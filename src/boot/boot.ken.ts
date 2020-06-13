import { Painter } from "../painter/Painter";
import { createCanvasAndPainter } from "../painter/CanvasPainter";
import { run } from "../index";
import { SceneImpl } from "../scene/Scene";
import { Drawable } from "../drawables/drawable";

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
    const scene = new SceneImpl()
    
    // populate this with whatever you want
    const drawables: Drawable[] = [];

    drawables.forEach(d => scene.add(d));
  
    run(painter, scene);
}