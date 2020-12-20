import { PrimitiveDrawable, primitiveDrawable } from '../../drawable';
import { path, bezierCurveTo, quadraticCurveTo, moveTo, lineTo } from '../../primitives/GeometricPrimitive2';
import { Color } from '../../styles/Color';
import * as Transform from '../../transform/Transform';
import { fill } from '../../styles/Styles';

export type GrassBladeParams = {
    color: Color,
    halfWidth: number,
    height: number,
    tipOffset: number,
}

export function grassBlade(
    id: string,
    params: GrassBladeParams,
): PrimitiveDrawable {
    return primitiveDrawable(
        id,
        path([
            moveTo(-params.halfWidth, 0),
            quadraticCurveTo(
                -params.halfWidth,
                -params.height / 2,
                params.tipOffset,
                -params.height,
            ),
            quadraticCurveTo(
                params.halfWidth,
                -params.height / 2,
                params.halfWidth,
                0,
            ),
            lineTo(-params.halfWidth, 0),
        ]),
        Transform.createTransform(),
        fill(params.color),
    );
}