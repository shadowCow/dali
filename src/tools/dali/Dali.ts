import { withCanvas } from "../../painter/Painter";
import { createDaliPainter, DaliPainter } from "./DaliPainter";


const canvasId = 'dali-canvas';

withCanvas(
    document,
    canvasId,
)(({canvas, ctx}) => {
    // TODO - add dom around the canvas

    const painter = createDaliPainter(
        canvas,
        ctx,
    );

    runPainterAnimationLoop(painter);
});

function runPainterAnimationLoop(
    painter: DaliPainter,
): void {
    let previousTimestampMs = 0;
    function animationCallback(timestampMs: number): void {
        const dt = timestampMs - previousTimestampMs;

        painter.clear();
        painter.paint('whatever');

        previousTimestampMs = timestampMs;

        requestAnimationFrame(animationCallback);
    }

    requestAnimationFrame(animationCallback);
}
