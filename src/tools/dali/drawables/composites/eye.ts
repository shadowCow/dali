// import { CompositeDrawable, compositeDrawable, PrimitiveDrawable, primitiveDrawable, withTransform } from '../drawable';
// import { ellipse } from '../primitives/primitiveShapes';
// import { fill, strokeAndFill } from '../styles/Styles';
// import * as Transform from '../transform/Transform';
// import { Color, Colors } from '../styles/Color';
// import { pipe, through } from '../../../../util/pipe';

// export type EyePairParams = {
//     eyeSpacing: number,
//     eyeParams: EyeParams,
// }

// export function eyePairParams(
//     eyeSpacing: number,
//     irisRadius: number,
//     irisColor: Color,
// ): EyePairParams {
//     return {
//         eyeSpacing,
//         eyeParams: { irisRadius, irisColor },
//     };
// }

// export function eyePair(
//     id: string,
//     params: EyePairParams,
// ): CompositeDrawable {
//     const {
//         eyeSpacing,
//         eyeParams,
//     } = params;

//     const centerXEye1 = 0 - eyeSpacing/2 - eyeParams.irisRadius*2;
//     const centerXEye2 = 0 + eyeSpacing/2 + eyeParams.irisRadius*2;

//     const drawables = [
//         pipe(
//             eye(
//                 id + 'eyeOne',
//                 eyeParams,
//             ),
//             through(
//                 withTransform(Transform.create({
//                     translate: { x: centerXEye1, y: 0 },
//                 }))
//             )
//         ),
//         pipe(
//             eye(
//                 id + 'eyeTwo',
//                 eyeParams,
//             ),
//             through(
//                 withTransform(Transform.create({
//                     translate: { x: centerXEye2, y: 0 },
//                 }))
//             )
//         ),
//     ];

//     return compositeDrawable(
//         id,
//         drawables,
//     );
// }

// export type EyeParams = {
//     irisRadius: number,
//     irisColor: Color,
// }

// export function eye(
//     id: string,
//     params: EyeParams,
// ): CompositeDrawable {
//     const {
//         irisRadius,
//         irisColor,
//     } = params;
  
//     const drawables = [
//         eyeOutline(id, { irisRadius }),
//         iris(id, { radius: irisRadius, color: irisColor }),
//         pupil(id, { radius: irisRadius/2 }),
//     ];

//     return compositeDrawable(
//         id,
//         drawables,
//     );
// }

// export type IrisParams = {
//     radius: number,
//     color: Color,
// }

// function iris(
//     eyeId: string,
//     params: IrisParams,
// ): PrimitiveDrawable {
//     return primitiveDrawable(
//         eyeId + '-iris',
//         ellipse(params.radius, params.radius),
//         Transform.create(),
//         fill(params.color),
//     );
// }

// export type PupilParams = {
//     radius: number,
// }

// function pupil(
//     eyeId: string,
//     params: PupilParams,
// ): PrimitiveDrawable {
//     return primitiveDrawable(
//         eyeId + '-pupil',
//         ellipse(params.radius, params.radius),
//         Transform.create(),
//         fill(Colors.Black()),
//     );
// }

// export type EyeOutlineParams = {
//     irisRadius: number,
// }

// function eyeOutline(
//     eyeId: string,
//     params: EyeOutlineParams,
// ): PrimitiveDrawable {
//     return primitiveDrawable(
//         eyeId + '-eyeOutline',
//         ellipse(params.irisRadius * 2, params.irisRadius * 2),
//         Transform.create(),
//         strokeAndFill(
//             Colors.Black(),
//             3,
//             Colors.White(),
//         ),
//     );
// }
