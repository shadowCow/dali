import { Painter } from './painter/Painter';
import * as Scene from './scene/Scene';
import { Drawable, StaticDrawable } from './drawables/drawable';

export function run<D extends Drawable>(
    painter: Painter,
    scene: Scene.State<D>,
) {
    animate(
        scene,
        painter,
    );
}

function animate<D extends Drawable>(
    scene: Scene.State<D>,
    painter: Painter,
): void {
    let previousTimestampMs = 0;
    function animationCallback(timestampMs: number): void {
        const dt = timestampMs - previousTimestampMs;

        const renderedScene = Scene.render(scene, timestampMs, dt);
        drawScene(renderedScene, painter);

        previousTimestampMs = timestampMs;

        requestAnimationFrame(animationCallback);
    }

    requestAnimationFrame(animationCallback);
}

function drawScene(
    scene: Scene.State<StaticDrawable>,
    painter: Painter,
): void {
    painter.clear();
    scene.layers.forEach(layer => {
        layer.drawOrder.forEach(id => {
            painter.draw(layer.drawables[id]);
        });
    });
}
