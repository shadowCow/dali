import { PhysicsBody } from "./Bodies";
import { Vec2 } from "../../../drawables/transform/Vec";
import { AABB } from "./Colliders";

export namespace PhysicsEngine {

    export type State = {
        parameters: Parameters,
        moveables: MoveableBody[],
        // immovable world bodies
        fixtures: AABB.State[],
    }

    export type Parameters = {
        gravity: Vec2,
        terminalVelocity: Vec2,
    }

    export function update(
        state: State,
    ): void {
        updateMoveablesNextCenter(state);

        // moveables have been temporarily moved, check for collisions
        state.moveables.forEach(moveable => {
            // check other moveables and fixtures in vicinity for
            // possible collisions...

            
        });
    }

    function updateMoveablesNextCenter(
        state: State,
    ): void {
        const {
            gravity,
            terminalVelocity,
        } = state.parameters;

        state.moveables.forEach(moveable => {
            if (moveable.body.isAffectedByGravity) {
                moveable.body.velocity.x += gravity.x;
                moveable.body.velocity.y += gravity.y;
            }
            if (moveable.body.velocity.x > terminalVelocity.x) {
                moveable.body.velocity.x = terminalVelocity.x;
            }
            if (moveable.body.velocity.y > terminalVelocity.y) {
                moveable.body.velocity.y = terminalVelocity.y;
            }

            moveable.nextCenter.x = moveable.body.collider.center.x +
                moveable.body.velocity.x;
            moveable.nextCenter.y = moveable.body.collider.center.y +
                moveable.body.velocity.y;
        });
    }

    export type Collision = {
        collider1Before: Vec2,
        collider1Collision: Vec2,
        collider2Before: Vec2,
        collider2Collision: Vec2,
    }

    export type MoveableBody = {
        body: PhysicsBody.State,
        nextCenter: Vec2,
    }
}

export namespace QuadTreeTwoDeep {
    export type State = {
        root: Root,
    }

    export enum NodeTag {
        ROOT = 'ROOT',
        ONE_DEEP = 'ONE_DEEP',
        LEAF = 'LEAF',
    }

    export type Node =
        Root |
        OneDeep |
        Leaf;

    export type Root = {
        tag: typeof NodeTag.ROOT,
        bounds: AABB.State,
        quadrants: [
            OneDeep,
            OneDeep,
            OneDeep,
            OneDeep,
        ],
    }

    export type OneDeep = {
        tag: typeof NodeTag.ONE_DEEP,
        bounds: AABB.State,
        quadrants: [
            Leaf,
            Leaf,
            Leaf,
            Leaf,
        ],
    }

    export type Leaf = {
        tag: typeof NodeTag.LEAF,
        bounds: AABB.State,
        colliders: AABB.State[],
    }

    export type QuadrantIndex = 0 | 1 | 2 | 3;

    export function insert(
        state: State,
        collider: AABB.State,
    ): void {
        const quadrant = getQuadrant(
            state.root.bounds.center,
            collider.center,
        );

        insertIntoLeaf(
            state.root.quadrants[quadrant],
            collider,
        );
    }

    function insertIntoLeaf(
        oneDeep: OneDeep,
        collider: AABB.State,
    ): void {
        const quadrant = getQuadrant(
            oneDeep.bounds.center,
            collider.center,
        );

        oneDeep.quadrants[quadrant].colliders.push(collider);
    }

    function getQuadrant(
        regionCenter: Vec2,
        colliderCenter: Vec2,
    ): QuadrantIndex {
        if (colliderCenter.x < regionCenter.x) {
            if (colliderCenter.y < regionCenter.y) {
                return 1;
            } else {
                return 2;
            }
        } else {
            if (colliderCenter.y < regionCenter.y) {
                return 0;
            } else {
                return 3;
            }
        }
    }
}