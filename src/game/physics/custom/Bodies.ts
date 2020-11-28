import { AABB } from "./Colliders";
import { Vec2 } from "../../../math/Vec";

export namespace PhysicsBody {

    export type State = {
        collider: AABB.State,
        velocity: Vec2,
        isAffectedByGravity: boolean,
    }
}