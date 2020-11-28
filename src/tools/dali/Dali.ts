import { withCanvas } from "../../painter/Painter";
import { createDaliPainter, DaliPainter } from "./DaliPainter";
import { BranchEntity, LeafEntity } from "./DaliEntity";
import { Branch, traverseDepthFirst } from "./Tree";

const canvasId = 'dali-canvas';

export function start(
    root: Branch<BranchEntity, LeafEntity>,
): void {
    withCanvas(
        document,
        canvasId,
    )(({canvas, ctx}) => {
        // TODO - add dom around the canvas
    
        const painter = createDaliPainter(
            canvas,
            ctx,
        );
    
        runPainterAnimationLoop(
            root,
            painter,
        );
    });
}

function runPainterAnimationLoop(
    root: Branch<BranchEntity, LeafEntity>,
    painter: DaliPainter,
): void {
    let previousTimestampMs = 0;

    function animationCallback(timestampMs: number): void {
        const dt = timestampMs - previousTimestampMs;

        updateEntities(
            root,
            timestampMs,
            dt,
        );
        
        painter.clear();
        painter.paint(root);

        previousTimestampMs = timestampMs;

        requestAnimationFrame(animationCallback);
    }

    requestAnimationFrame(animationCallback);
}

function updateEntities(
    root: Branch<BranchEntity, LeafEntity>,
    t: number,
    dt: number,
): void {
    traverseDepthFirst<BranchEntity, LeafEntity>(
        root,
        (b) => b.content.update(
            t,
            dt,
            b.content,
        ),
        (l) => l.content.update(
            t,
            dt,
            l.content,
        ),
    );
}