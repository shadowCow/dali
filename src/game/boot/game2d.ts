import { TextureLoader } from "../sprites/Texture";
import { GameEngine, EntityStore, GameEntity } from "../GameEngine";
import { prepareCanvas } from "../../painter/Painter";
import { SpriteRendererCanvas } from "../sprites/SpriteRenderer";
import { Sprite } from "../sprites/Sprite";
import { PauseMenu } from "../menu/Menu";
import { KeyboardController } from "../input/Keyboard";

export type Game2dParams = {
    keyboardController: KeyboardController,
    textureParams: TextureLoader.Params[],
    createInitialEntities: (
        resources: GameEngine.Resources,
    ) => GameEntity.State[],
    createPhysicsEngine: () => Matter.Engine,
    gameLogicFn: GameEngine.GameLogicFn,
    scale: number,
}

export const canvasId = 'game-canvas';

export function bootUp(
    params: Game2dParams,
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
            const physicsEngine = params.createPhysicsEngine();
    
            const entities = params.createInitialEntities(resources);
            const entityStore: EntityStore.State =
                EntityStore.create(entities);

            const state: GameEngine.State = {
                renderer,
                stage,
                physicsEngine,
                entityStore,
                isPaused: false,
            };
            const pauseMenu = PauseMenu.create(
                document,
                state,
            );

            GameEngine.run(
                resources,
                params.keyboardController,
                pauseMenu,
                state,
                params.gameLogicFn,
            );
        });
    } else {
        throw 'Unable to create canvas';
    }
}