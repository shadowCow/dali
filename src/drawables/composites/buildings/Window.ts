import { PrimitiveDrawable, CompositeDrawable, primitiveDrawable, withStyles, compositeDrawable } from '../../drawable';
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
        Transform.create(),
        stroke(params.frameColor, params.frameThickness),
    );

    const verticalCrossBar = primitiveDrawable(
        id + '-verticalBar',
        line(
            0,
            params.frameHeight,
        ),
        Transform.create({
            translate: {
                x: params.frameWidth / 2,
                y: 0,
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
        Transform.create({
            translate: {
                x: 0,
                y: params.frameHeight / 2,
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