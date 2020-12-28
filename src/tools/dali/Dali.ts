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
    let elapsedTimeMs = 0;

    function animationCallback(timestampMs: number): void {
        const dt = timestampMs - previousTimestampMs;
        elapsedTimeMs += dt;

        updateEntities(
            root,
            updaters,
            elapsedTimeMs,
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
    elapsedTimeMs: number,
    dt: number,
): void {
    const toRemove: number[] = [];

    updaters.forEach((updater, index) => {
        const action = updater(
            elapsedTimeMs,
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
            case UpdateActionKind.REMOVE_SELF:
                toRemove.push(index);
                break;
            default:
                assertNever(action);
        }
    });

    toRemove.forEach(i => {
        updaters.splice(i, 1);
    });
    toRemove.length = 0;
}
