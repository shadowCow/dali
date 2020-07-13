import { StaticDrawable, CompositeDrawable, DrawableTypes, compositeDrawable } from './drawable';

export type RadialParams = {
    radius: number,
    angleSpacing: number,
    angleOffset: number,
    drawables: StaticDrawable[],
}

export function radial(
    id: string,
    params: RadialParams,
): CompositeDrawable {
    params.drawables.forEach((drawable, index) => {
        drawable.transform.translate = { x: 0, y: -params.radius };
        drawable.transform.rotate = {
            a: params.angleOffset + (index * params.angleSpacing),
            x: 0,
            y: params.radius,
        };
        console.log(drawable.transform);
    });

    return compositeDrawable(
        id,
        params.drawables,
    );
}