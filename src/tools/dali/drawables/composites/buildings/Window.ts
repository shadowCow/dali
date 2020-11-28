import { PrimitiveDrawable, CompositeDrawable, primitiveDrawable, compositeDrawable } from '../../drawable';
import { rect, path, lineTo, moveTo, line } from '../../primitives/primitiveShapes';
import { Color } from '../../styles/Color';
import * as Transform from '../../transform/Transform';
import { stroke } from '../../styles/Styles';

export type WindowParams = {
    frameWidth: number,
    frameHeight: number,
    frameThickness: number,
    frameColor: Color,
}

export function window(
    id: string,
    params: WindowParams,
): CompositeDrawable {
    
    const windowBorder = primitiveDrawable(
        id + '-border',
        rect(
            params.frameWidth,
            params.frameHeight,
        ),
        Transform.createTransform(),
        stroke(params.frameColor, params.frameThickness),
    );

    const verticalCrossBar = primitiveDrawable(
        id + '-verticalBar',
        line(
            0,
            params.frameHeight,
        ),
        Transform.createTransform({
            translation: {
                x: params.frameWidth / 2,
                y: 0,
                z: 0,
            },
        }),
        stroke(params.frameColor, params.frameThickness),
    );

    const horizontalCrossBar = primitiveDrawable(
        id + '-horizontalBar',
        line(
            params.frameWidth,
            0,
        ),
        Transform.createTransform({
            translation: {
                x: 0,
                y: params.frameHeight / 2,
                z: 0,
            },
        }),
        stroke(params.frameColor, params.frameThickness),
    );

    return compositeDrawable(
        id,
        [
            horizontalCrossBar,
            verticalCrossBar,
            windowBorder,
        ],
    );
}