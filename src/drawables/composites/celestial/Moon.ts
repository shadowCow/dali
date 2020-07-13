import { CompositeDrawable, PrimitiveDrawable, primitiveDrawable, compositeDrawable } from '../../drawable';
import { circle, path, moveTo, quadraticCurveTo, Path, bezierCurveTo } from '../../primitives/primitiveShapes';
import * as Transform from '../../transform/Transform';
import { fill } from '../../styles/Styles';
import { Colors } from '../../styles/Color';

export type MoonParams = {
    radius: number,
    phaseRatio: number,
}

export function moon(
    id: string,
    params: MoonParams,
): CompositeDrawable {
    const moon = primitiveDrawable(
        id + '-moon',
        circle(params.radius),
        Transform.create(),
        fill(Colors.White()),
    );

    const shadowPath = params.phaseRatio < 0.5
        ? waxingShadow(params.radius, params.phaseRatio)
        : waningShadow(params.radius, params.phaseRatio);
    
    const shadow = primitiveDrawable(
        id + '-shadow',
        shadowPath,
        Transform.create(),
        fill(Colors.Black()),
    );

    return compositeDrawable(
        id,
        [ moon, shadow ],
    );
}

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