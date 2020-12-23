import { PrimitiveDrawable, primitiveDrawable } from '../../drawable';
import { path, bezierCurveTo, quadraticCurveTo, moveTo, lineTo } from '../../primitives/GeometricPrimitive2';
import { Color } from '../../styles/Color';
import * as Transform from '../../transform/Transform';
import { fill, styles } from '../../styles/Styles';
import { Composer } from '../Composer';
import { leaf } from '../../../../../data_structures/Tree';

export type GrassBladeProps = {
    color: Color,
    halfWidth: number,
    height: number,
    tipOffset: number,
}

export const GrassBlade: Composer<GrassBladeProps> = (
    id,
    params,
) => {
    return leaf(primitiveDrawable(
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
        styles(fill(params.color)),
    ));
};