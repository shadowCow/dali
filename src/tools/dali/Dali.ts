import { withCanvas } from "../../painter/Painter";
import { createDaliPainter, DaliPainter } from "./DaliPainter";
import { Branch, traverseDepthFirst } from "./Tree";
import { DrawableGroup, PrimitiveDrawable } from "./drawables/drawable";

const canvasId = 'dali-canvas';

export function start(
    root: Branch<DrawableGroup, PrimitiveDrawable>,
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
    root: Branch<DrawableGroup, PrimitiveDrawable>,
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
    root: Branch<DrawableGroup, PrimitiveDrawable>,
    t: number,
    dt: number,
): void {
    // traverseDepthFirst<BranchEntity, LeafEntity>(
    //     root,
    //     (b) => b.content.update(
    //         t,
    //         dt,
    //         b.content,
    //     ),
    //     (l) => l.content.update(
    //         t,
    //         dt,
    //         l.content,
    //     ),
    // );
}


// export type UpdateFn<T> = (
//     t: number,
//     dt: number,
//     target: T,
// ) => void;

// export function createNoOpUpdate<T>(): UpdateFn<T> {
//     return () => {};
// }