import { DrawableGroup, PrimitiveDrawable, primitiveDrawable, drawableGroup } from '../../drawable';
import { circle, path, moveTo, quadraticCurveTo, Path, bezierCurveTo } from '../../primitives/GeometricPrimitive2';
import { fill } from '../../styles/Styles';
import { Colors } from '../../styles/Color';
import { Composer } from '../Composer';
import { leaf, branch } from '../../../Tree';
import { createTransform } from '../../transform/Transform';

export type MoonProps = {
    radius: number,
    phaseRatio: number,
}

export const Moon: Composer<MoonProps> = (
    id,
    props,
) => {
    const {
        radius,
        phaseRatio,
    } = props;
    
    const moon = leaf(primitiveDrawable(
        id + '-moon',
        circle(radius),
        createTransform(),
        fill(Colors.White()),
    ));

    const shadowPath = phaseRatio < 0.5
        ? waxingShadow(radius, phaseRatio)
        : waningShadow(radius, phaseRatio);
    
    const shadow = leaf(primitiveDrawable(
        id + '-shadow',
        shadowPath,
        createTransform(),
        fill(Colors.Black()),
    ));

    return branch(
        [ moon, shadow ],
        drawableGroup(
            id,
        ),
    );
};

function waxingShadow(
    radius: number,
    phaseRatio: number,
): Path {
    const shadowX = (radius * 1.35) - ((phaseRatio*2) * (radius * 1.35 * 2));

    return path([
        moveTo(0, -radius-1),
        bezierCurveTo(-radius * (1.35), -radius, -radius * (1.35), radius, 0, radius+1),
        bezierCurveTo(shadowX, radius, shadowX, -radius, 0, -radius-1),
    ]);
}

function waningShadow(
    radius: number,
    phaseRatio: number,
): Path {
    const shadowX = (radius * 1.35) - ((phaseRatio-0.5)*2 * (radius * 1.35 * 2));

    return path([
        moveTo(0, -radius-1),
        bezierCurveTo(radius * (1.35), -radius, radius * (1.35), radius, 0, radius+1),
        bezierCurveTo(shadowX, radius, shadowX, -radius, 0, -radius-1),
    ]);
}