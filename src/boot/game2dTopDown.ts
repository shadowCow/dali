import { TextureLoader } from "../sprites/Texture";
import { GameEngine, EntityStore, GameEntity } from "../game/Game";
import { Engine } from "matter-js";
import { Painter, prepareCanvas } from "../painter/Painter";
import { SpriteRendererCanvas } from "../sprites/SpriteRenderer";
import { createEngine } from "./dan/top-down-physics";
import { Sprite } from "../sprites/Sprite";

export type Game2dTopDownParams = {
    textureParams: TextureLoader.Params[],
    createInitialEntities: (
        resources: GameEngine.Resources,
    ) => GameEntity.State[],
    gameUpdateFn: GameEngine.GameUpdateFn,
    scale: number,
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
                params.scale,
            );
    
            const stage = Sprite.Container.create();
            const physicsEngine = createEngine();
    
            const entities = params.createInitialEntities(resources);
            const entityStore: EntityStore.State =
                EntityStore.create(entities);

            const state: GameEngine.State = {
                renderer,
                stage,
                physicsEngine,
                entityStore,
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