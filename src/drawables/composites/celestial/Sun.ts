import { PrimitiveDrawable, primitiveDrawable } from '../../drawable';
import { circle } from '../../primitives/primitiveShapes';
import * as Transform from '../../transform/Transform';
import { fill } from '../../styles/Styles';
import { Colors } from '../../styles/Color';

export type SunParams = {
    radius: number,
}

export function sun(
    id: string,
    params: SunParams,
): PrimitiveDrawable {
    return primitiveDrawable(
        id,
        circle(params.radius),
        Transform.create(),
        fill(Colors.Yellow()),
    );
}