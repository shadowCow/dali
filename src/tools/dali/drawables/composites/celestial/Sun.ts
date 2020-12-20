import { PrimitiveDrawable, primitiveDrawable } from '../../drawable';
import { circle } from '../../primitives/GeometricPrimitive2';
import * as Transform from '../../transform/Transform';
import { fill } from '../../styles/Styles';
import { Colors } from '../../styles/Color';
import { Composer } from '../Composer';
import { leaf } from '../../../Tree';

export type SunProps = {
    radius: number,
}

export const Sun: Composer<SunProps> = (
    id,
    props,
) => {
    return leaf(primitiveDrawable(
        id,
        circle(props.radius),
        Transform.createTransform(),
        fill(Colors.Yellow()),
    ));
};