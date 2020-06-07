import { Painter } from "./painter/Painter";
import { createCanvasAndPainter } from "./painter/CanvasPainter";
import { exampleData } from './scene/examples/canary';
import { animate } from "./drawables/animation";
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

  animate(
    scene,
    painter,
  );

  const timestamp = 0;
  const d = scene.drawables.get('1');
  console.log('has d', d);
  if (d) {
    switch (d.typeTag) {
      case 'primitive_drawable':
        switch (d.primitive.typeTag) {
          case 'rect':
            d.primitive.animations.push({
              duration: {
                typeTag: 'one_time_duration',
                startMs: timestamp + 1000,
                endMs: timestamp + 5000,
              },
              interpolator: { typeTag: 'linear_interpolator' },
              transitions: {
                x: 400
              }
            })
            break;
        }
        break;
    }
  }
}
