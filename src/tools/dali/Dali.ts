import { withCanvas } from "../../painter/Painter";
import { createDaliPainter, DaliPainter } from "./DaliPainter";
import { branchEntity, BranchEntity, LeafEntity, leafEntity } from "./DaliEntity";
import { Branch, branch, leaf, traverseDepthFirst } from "./Tree";
import { rect } from "./drawables/primitives/primitiveShapes";
import { fill } from "./drawables/styles/Styles";
import { Colors } from "./drawables/styles/Color";

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