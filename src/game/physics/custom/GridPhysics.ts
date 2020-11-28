import { PhysicsBody } from "./Bodies";
import { Vec2 } from "../../../math/Vec";

export namespace GridPhysics {

    export type Grid = {
        parameters: Parameters,
        cellDimensions: Vec2,
        numRows: number,
        numColumns: number,
        fixtures: Fixture[],
        moveables: Moveable[],
    }

    export type Parameters = {
        gravity: Vec2,
        terminalVelocity: Vec2,
    }

    export type Fixture = {
        cell: Vec2,
    }

    export type Moveable = {
        cell: Vec2,
        body: PhysicsBody.State,
        nextCenter: Vec2,
    }

    export function update(
        grid: Grid,
    ): void {
        updateMoveablesNextCenter(grid);
    }

    function updateMoveablesNextCenter(
        grid: Grid
    ): void {
        const {
            gravity,
            terminalVelocity,
        } = grid.parameters;

        grid.moveables.forEach(moveable => {
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
}