import * as Matter from 'matter-js';

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
     
// to run the engine from a game loop...
// Engine.update(engine, delta)

export function createEngine() {
    const engine = Engine.create();
   
    engine.world.gravity.x = 0;
    engine.world.gravity.y = 0;
    //const boxA = Bodies.rectangle(0, 0, 16, 16);
    // var ballA = Bodies.circle(380, 100, 40, 10);
    // var ballB = Bodies.circle(460, 10, 40, 10);
    // var ground = Bodies.rectangle(400, 380, 810, 60, { isStatic: true });
    
    // World.add(
    //     engine.world,
    //     [boxA],
    // );

    return engine;
}
 
         