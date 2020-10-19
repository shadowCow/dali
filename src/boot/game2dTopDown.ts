import { TextureLoader } from "../sprites/Texture";
import { GameEngine, EntityStore } from "../game/Game";
import { Engine } from "matter-js";
import { Painter, prepareCanvas } from "../painter/Painter";
import { SpriteRendererCanvas } from "../sprites/SpriteRenderer";
import { createEngine } from "./dan/top-down-physics";
import { Sprite } from "../sprites/Sprite";

export type Game2dTopDownParams = {
    textureParams: TextureLoader.Params[],
    gameUpdateFn: GameEngine.GameUpdateFn,
}

export const canvasId = 'game-canvas';

export function bootUp(
    params: Game2dTopDownParams,
    containerId?: string,
): void {
    const maybeCanvas = prepareCanvas(
        document,
        canvasId,
        containerId,
    );

    if (maybeCanvas) {
        const { canvas, ctx } = maybeCanvas;

        TextureLoader.loadAll(
            params.textureParams,
        ).then(textureCache => {
            const resources: GameEngine.Resources = {
                textureCache,
            };

            const renderer = SpriteRendererCanvas.create(
                canvas,
                ctx,
            );
    
            const stage = Sprite.Container.create();
            const physicsEngine = createEngine();
    
            const entities: EntityStore.State =
                EntityStore.create([]);

            const state: GameEngine.State = {
                renderer,
                stage,
                physicsEngine,
                entities,
            };

            GameEngine.run(
                resources,
                state,
                params.gameUpdateFn,
            );
        });
    } else {
        throw 'Unable to create canvas';
    }
}