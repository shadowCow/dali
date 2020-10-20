import { Bodies, Body, Engine, World } from 'matter-js';
import { assertNever } from '../util/patternMatching';
import { Vec2 } from '../drawables/transform/Vec';
import { Sprite } from './sprites/Sprite';
import { Painter } from '../painter/Painter';
import { SpriteRendererCanvas } from './sprites/SpriteRenderer';
import { Texture } from './sprites/Texture';

export namespace GameEntity {
    export type State = {
        id: string,
        renderer?: Sprite.State,
        physics?: Body,
    }

    export function setVelocity(
        entity: State,
        velocity: Vec2,
    ): void {
        const physics = entity.physics;
        if (physics) {
            Body.setVelocity(
                physics,
                velocity,
            );
        }
    }
}

export namespace GameEngine {
    export type Resources = {
        textureCache: Texture.Cache,
    }

    export type State = {
        renderer: Painter<SpriteRendererCanvas.Renderable>,
        stage: Sprite.Container.State,
        physicsEngine: Engine,
        entityStore: EntityStore.State,
    }

    export type GameUpdateFn = (
        resources: Resources,
        entityStore: EntityStore.State,
        dt: number
    ) => EntityStore.Update[]

    export function run(
        resources: Resources,
        state: State,
        updateGameState: GameUpdateFn,
    ): void {
        Object.values(state.entityStore).forEach(entity => {
            addEntity(state, entity);
        });

        let oldTime = Date.now();
        function gameLoop(newTime: number) {
            let dt = newTime - oldTime;
            oldTime = newTime;	
            if (dt < 0) { dt = 0; }
            if (dt > 1000) { dt = 1000; }
            
            const entityUpdates = updateGameState(
                resources,
                state.entityStore,
                dt,
            );
            applyUpdates(
                state,
                entityUpdates,
            );

            Engine.update(state.physicsEngine, dt);
            
            Object.values(state.entityStore).forEach(entity => {
                if (entity.physics && entity.renderer) {
                    entity.renderer.cx = entity.physics.position.x;
                    entity.renderer.cy = entity.physics.position.y; 
                }

                if (entity.renderer) {
                    const sprite = entity.renderer;
                    if (sprite.tag === Sprite.StateTag.ANIMATED &&
                        sprite.playing === true) {
                            
                        Sprite.transition(
                            sprite,
                            Sprite.tick(dt),
                        );
                    }
                }
            });

            state.renderer.paint(state.stage);
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
        state.entityStore[entity.id] = entity;
        if (entity.renderer) {
            Sprite.Container.addChild(
                state.stage,
                entity.renderer,
            );
        }
        
        if (entity.physics) {
            World.add(state.physicsEngine.world, entity.physics);
        }
    }

    function removeEntity(
        state: State,
        entity: GameEntity.State,
    ): void {
        delete state.entityStore[entity.id];
        if (entity.renderer) {
            Sprite.Container.removeChild(
                state.stage,
                entity.renderer,
            );
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
