import * as Matter from 'matter-js';

const Engine = Matter.Engine;

export function createTopDownPhysicsEngine() {
    const engine = Engine.create();
   
    engine.world.gravity.x = 0;
    engine.world.gravity.y = 0;

    return engine;
}
