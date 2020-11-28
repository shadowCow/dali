// import { CompositeDrawable, primitiveDrawable, compositeDrawable } from '../../drawable';
// import { Color, Colors } from '../../styles/Color';
// import { rect, path, moveTo, lineTo, PathSegment } from '../../primitives/primitiveShapes';
// import * as Transform from '../../transform/Transform';
// import { fill } from '../../styles/Styles';

// export type FirParams = {
//     foliageColor: Color,
//     trunkColor: Color,
//     treeWidth: number,
//     treeHeight: number,
//     trunkWidth: number,
//     trunkHeight: number,
// }

// export function fir(
//     id: string,
//     params: FirParams,
// ): CompositeDrawable {

//     const trunk = primitiveDrawable(
//         id + '-trunk',
//         rect(params.trunkWidth, params.trunkHeight),
//         Transform.create(),
//         fill(params.trunkColor),
//     );
//     trunk.transform.translate.x = -params.trunkWidth/2;

//     const foliageHeight = params.treeHeight - params.trunkHeight;
//     const layerHeight = foliageHeight / 3;

//     const pathSegments: PathSegment[] = [
//         moveTo(0,0),
//         lineTo(
//             -params.treeWidth,
//             0,
//         ),
//         lineTo(
//             -params.treeWidth * (1/2),
//             -layerHeight,
//         ),
//         lineTo(
//             -params.treeWidth * (5/6),
//             -layerHeight,
//         ),
//         lineTo(
//             -params.treeWidth * (1/3),
//             -2*layerHeight,
//         ),
//         lineTo(
//             -params.treeWidth * (1/2),
//             -2*layerHeight,
//         ),
//         lineTo(
//             0,
//             -3*layerHeight,
//         ),
//         lineTo(
//             params.treeWidth * (1/2),
//             -2*layerHeight,
//         ),
//         lineTo(
//             params.treeWidth * (1/3),
//             -2*layerHeight,
//         ),
//         lineTo(
//             params.treeWidth * (5/6),
//             -layerHeight,
//         ),
//         lineTo(
//             params.treeWidth * (1/2),
//             -layerHeight,
//         ),
//         lineTo(
//             params.treeWidth,
//             0,
//         ),
//         lineTo(
//             0,
//             0,
//         ),
//     ];

//     const foliage = primitiveDrawable(
//         id + '-foliage',
//         path(pathSegments),
//         Transform.create(),
//         fill(params.foliageColor),
//     );

//     return compositeDrawable(
//         id,
//         [ trunk, foliage ],
//     );
// }