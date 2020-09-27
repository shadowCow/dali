import { Bodies, Body, Engine, World } from 'matter-js';
import { Sprite, Renderer, Container } from 'pixi.js';
import { assertNever } from '../util/typeGuards';

export namespace GameEntity {
    export type State = {
        id: string,
        renderer?: Sprite,
        physics?: Body,
    }
}

export namespace GameEngine {
    export type State = {
        renderer: Renderer,
        stage: Container,
        physicsEngine: Engine,
        entities: EntityStore.State,
    }

    export type GameUpdateFn = (
        entities: EntityStore.State,
        deltaFrame: number
    ) => EntityStore.Update[]

    export function run(
        state: State,
        updateGameState: GameUpdateFn,
    ): void {
        Object.values(state.entities).forEach(entity => {
            addEntity(state, entity);
        });

        let oldTime = Date.now();
        function gameLoop(newTime: number) {
            let deltaTime = newTime - oldTime;
            oldTime = newTime;	
            if (deltaTime < 0) deltaTime = 0;
            if (deltaTime > 1000) deltaTime = 1000;
            let deltaFrame = deltaTime * 60 / 1000; //1.0 is for single frame
            
            const entityUpdates = updateGameState(
                state.entities,
                deltaFrame,
            );
            applyUpdates(
                state,
                entityUpdates,
            );

            Engine.update(state.physicsEngine, deltaTime);
            
            Object.values(state.entities).forEach(entity => {
                if (entity.physics && entity.renderer) {
                    entity.renderer.x = entity.physics.position.x;
                    entity.renderer.y = entity.physics.position.y; 
                }
            });

            state.renderer.render(state.stage);
            requestAnimationFrame(gameLoop);
        }

        requestAnimationFrame(gameLoop);
    }

    function applyUpdates(
        state: State,
        updates: EntityStore.Update[],
    ): void {
        updates.forEach(update => {
            switch (update.kind) {
                case 'add_entity':
                    addEntity(state, update.entity);
                    break;
                case 'delete_entity':
                    removeEntity(state, update.entity);
                    break;
                default:
                    assertNever(update);
            }
        });
    }

    function addEntity(
        state: State,
        entity: GameEntity.State,
    ): void {
        state.entities[entity.id] = entity;
        if (entity.renderer) {
            state.stage.addChild(entity.renderer);
        }
        
        if (entity.physics) {
            World.add(state.physicsEngine.world, entity.physics);
        }
    }

    function removeEntity(
        state: State,
        entity: GameEntity.State,
    ): void {
        delete state.entities[entity.id];
        if (entity.renderer) {
            state.stage.removeChild(entity.renderer);
        }
        
        if (entity.physics) {
            World.remove(state.physicsEngine.world, entity.physics);
        }
    }
}

export namespace EntityStore {
    export type State = {
        [id: string]: GameEntity.State,
    }

    export function create(
        entities: GameEntity.State[],
    ): State {
        const state: State = {};
        entities.forEach(entity => {
            state[entity.id] = entity;
        });

        return state;
    }

    export type Update =
        AddEntity |
        DeleteEntity;

    export type AddEntity = {
        kind: 'add_entity',
        entity: GameEntity.State,
    }
    export function addEntity(
        entity: GameEntity.State,
    ): AddEntity {
        return {
            kind: 'add_entity',
            entity,
        };
    }

    export type DeleteEntity = {
        kind: 'delete_entity',
        entity: GameEntity.State,
    }
    export function deleteEntity(
        entity:GameEntity.State,
    ): DeleteEntity {
        return {
            kind: 'delete_entity',
            entity,
        };
    }

    
}