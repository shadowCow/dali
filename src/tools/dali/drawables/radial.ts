import { DrawableGroup, DrawableTypes, drawableGroup, Drawable } from './drawable';

export type RadialParams = {
    radius: number,
    angleSpacing: number,
    angleOffset: number,
    drawables: Drawable[],
}

// export function radial(
//     id: string,
//     params: RadialParams,
// ): CompositeDrawable {
//     params.drawables.forEach((drawable, index) => {
//         drawable.transform.translation = { x: 0, y: -params.radius };
//         drawable.transform.rotation = {
//             a: params.angleOffset + (index * params.angleSpacing),
//             x: 0,
//             y: params.radius,
//         };
//         console.log(drawable.transform);
//     });

//     return compositeDrawable(
//         id,
//         params.drawables,
//     );
// }