// import { DrawableGroup, PrimitiveDrawable, primitiveDrawable, drawableGroup } from '../../drawable';
// import { circle, path, moveTo, quadraticCurveTo, Path, bezierCurveTo } from '../../primitives/GeometricPrimitive2';
// import * as Transform from '../../transform/Transform';
// import { fill } from '../../styles/Styles';
// import { Colors } from '../../styles/Color';

// export type MoonParams = {
//     radius: number,
//     phaseRatio: number,
// }

// export function moon(
//     id: string,
//     params: MoonParams,
// ): DrawableGroup {
//     const moon = primitiveDrawable(
//         id + '-moon',
//         circle(params.radius),
//         Transform.createTransform(),
//         fill(Colors.White()),
//     );

//     const shadowPath = params.phaseRatio < 0.5
//         ? waxingShadow(params.radius, params.phaseRatio)
//         : waningShadow(params.radius, params.phaseRatio);
    
//     const shadow = primitiveDrawable(
//         id + '-shadow',
//         shadowPath,
//         Transform.createTransform(),
//         fill(Colors.Black()),
//     );

//     return drawableGroup(
//         id,
//         [ moon, shadow ],
//     );
// }

// function waxingShadow(
//     radius: number,
//     phaseRatio: number,
// ): Path {
//     const shadowX = (radius * 1.35) - ((phaseRatio*2) * (radius * 1.35 * 2));

//     return path([
//         moveTo(0, -radius-1),
//         bezierCurveTo(-radius * (1.35), -radius, -radius * (1.35), radius, 0, radius+1),
//         bezierCurveTo(shadowX, radius, shadowX, -radius, 0, -radius-1),
//     ]);
// }

// function waningShadow(
//     radius: number,
//     phaseRatio: number,
// ): Path {
//     const shadowX = (radius * 1.35) - ((phaseRatio-0.5)*2 * (radius * 1.35 * 2));

//     return path([
//         moveTo(0, -radius-1),
//         bezierCurveTo(radius * (1.35), -radius, radius * (1.35), radius, 0, radius+1),
//         bezierCurveTo(shadowX, radius, shadowX, -radius, 0, -radius-1),
//     ]);
// }