import { Painter } from './painter/Painter';
import * as Scene from './scene/Scene';

export function run(
    painter: Painter,
    scene: Scene.State,
) {
    animate(
        scene,
        painter,
    );
}

function animate(
    scene: Scene.State,
    painter: Painter,
): void {
    let previousTimestampMs = 0;
    function animationCallback(timestampMs: number): void {
        const dt = timestampMs - previousTimestampMs;

        Scene.transition(scene, Scene.update(timestampMs, dt));
        drawScene(scene, painter);

        previousTimestampMs = timestampMs;

        requestAnimationFrame(animationCallback);
    }

    requestAnimationFrame(animationCallback);
}

function drawScene(
    scene: Scene.State,
    painter: Painter,
): void {
    painter.clear();
    Object.values(scene.drawables).forEach(drawable => {
        painter.draw(drawable);
    });
}
