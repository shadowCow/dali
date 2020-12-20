import { PrimitiveDrawable, DrawableGroup, primitiveDrawable, drawableGroup } from '../../drawable';
import { rect, path, lineTo, moveTo, line } from '../../primitives/GeometricPrimitive2';
import { Color } from '../../styles/Color';
import { stroke } from '../../styles/Styles';
import { createTransform } from '../../transform/Transform';
import { Composer } from '../Composer';
import { branch, leaf } from '../../../Tree';

export type WindowProps = {
    frameWidth: number,
    frameHeight: number,
    frameThickness: number,
    frameColor: Color,
}

export const Window: Composer<WindowProps> = (
    id,
    props,
) => {
    const {
        frameWidth,
        frameHeight,
        frameThickness,
        frameColor,
    } = props;

    const windowBorder = leaf(primitiveDrawable(
        id + '-border',
        rect(
            frameWidth,
            frameHeight,
        ),
        createTransform(),
        stroke(frameColor, frameThickness),
    ));

    const verticalCrossBar = leaf(primitiveDrawable(
        id + '-verticalBar',
        line(
            0,
            frameHeight,
        ),
        createTransform({
            translation: {
                x: frameWidth / 2,
                y: 0,
                z: 0,
            },
        }),
        stroke(frameColor, frameThickness),
    ));

    const horizontalCrossBar = leaf(primitiveDrawable(
        id + '-horizontalBar',
        line(
            frameWidth,
            0,
        ),
        createTransform({
            translation: {
                x: 0,
                y: frameHeight / 2,
                z: 0,
            },
        }),
        stroke(frameColor, frameThickness),
    ));

    const group = drawableGroup(
        id,
    );

    return branch(
        [
            horizontalCrossBar,
            verticalCrossBar,
            windowBorder,
        ],
        group,
    );
};
