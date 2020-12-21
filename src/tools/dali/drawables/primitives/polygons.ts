import { Polygon, polygon } from "./GeometricPrimitive2";
import { VecXY, vecXY } from "../../../../math/Vec";
import { rotated } from "../../../../math/Vec2";

export function equilateralPolygon(
    nSides: number,
    radius: number,
): Polygon {
    const points: Array<VecXY> = [];
    let angle = (2*Math.PI) / nSides;

    const top: VecXY = vecXY(0, -radius);
    points.push(top);

    for (let i = 1; i < nSides; i++) {
        points.push(
            rotated(
                top,
                i * angle,
            ),
        );
    }

    return polygon(points);
}