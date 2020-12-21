import { withCanvas } from "../../painter/Painter";
import { createDaliPainter, DaliPainter } from "./DaliPainter";
import { DrawableGroup, PrimitiveDrawable } from "./drawables/drawable";
import { Updater, UpdateActionKind } from "./Updater";
import { assertNever } from "../../util/patternMatching";
import { Branch } from "../../data_structures/Tree";

const canvasId = 'dali-canvas';
const containerId = 'canvas-container';

export function start(
    root: Branch<DrawableGroup, PrimitiveDrawable>,
    updaters?: Array<Updater>,
): void {
    withCanvas(
        document,
        canvasId,
        containerId,
    )(({canvas, ctx}) => {
        // TODO - add dom around the canvas
    
        const painter = createDaliPainter(
            canvas,
            ctx,
        );
    
        runPainterAnimationLoop(
            root,
            updaters || [],
            painter,
        );
    });
}

function runPainterAnimationLoop(
    root: Branch<DrawableGroup, PrimitiveDrawable>,
    updaters: Array<Updater>,
    painter: DaliPainter,
): void {
    let previousTimestampMs = 0;

    function animationCallback(timestampMs: number): void {
        const dt = timestampMs - previousTimestampMs;

        updateEntities(
            root,
            updaters,
            timestampMs,
            dt,
        );
        
        painter.clear();
        painter.paint(root);

        previousTimestampMs = timestampMs;

        if (updaters.length) {
            requestAnimationFrame(animationCallback);
        }
    }

    requestAnimationFrame(animationCallback);
}

function updateEntities(
    root: Branch<DrawableGroup, PrimitiveDrawable>,
    updaters: Array<Updater>,
    t: number,
    dt: number,
): void {

    updaters.forEach((updater, index) => {
        const action = updater(
            t,
            dt,
        );

        switch (action.kind) {
            case UpdateActionKind.ADD_DRAWABLE:
                // add to tree
                break;
            case UpdateActionKind.REMOVE_DRAWABLE:
                // remove from tree
                break;
            case UpdateActionKind.NO_OP:
                break;
            default:
                assertNever(action);
        }
    });
}
