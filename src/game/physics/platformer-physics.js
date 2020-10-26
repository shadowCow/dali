import * as Matter from 'matter-js';

const Engine = Matter.Engine;

export function createPlatformerPhysicsEngine() {
    const engine = Engine.create();

    return engine;
}