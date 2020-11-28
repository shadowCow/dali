import { Vec2 } from "../../../math/Vec";


export namespace AABB {
    /**
     * Axis Aligned Bounding Box.
     * A non-rotated rectangle.
     */
    export type State = {
        center: Vec2,
        halfSize: Vec2,
    }

    export function overlaps(
        s1: State,
        s2: State,
    ): boolean {
        if (Math.abs(s1.center.x - s2.center.x) > s1.halfSize.x + s2.halfSize.x) {
            return false;
        } else if (Math.abs(s1.center.y - s2.center.y) > s1.halfSize.y + s2.halfSize.y) {
            return false;
        } else {
            return true;
        }
    }
}