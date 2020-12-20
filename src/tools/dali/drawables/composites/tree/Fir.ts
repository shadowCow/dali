
import { Color, Colors } from '../../styles/Color';
import { fill } from '../../styles/Styles';
import { Composer } from '../Composer';
import { primitiveDrawable, drawableGroup } from '../../drawable';
import { rect, PathSegment, lineTo, moveTo, path } from '../../primitives/GeometricPrimitive2';
import { createTransform } from '../../transform/Transform';
import { leaf, branch } from '../../../Tree';

export type FirProps = {
    foliageColor: Color,
    trunkColor: Color,
    treeWidth: number,
    treeHeight: number,
    trunkWidth: number,
    trunkHeight: number,
}

export const Fir: Composer<FirProps> = (
    id,
    props,
) => {
    const {
        foliageColor,
        trunkColor,
        treeWidth,
        treeHeight,
        trunkWidth,
        trunkHeight,
    } = props;
    
    const trunk = leaf(primitiveDrawable(
        id + '-trunk',
        rect(trunkWidth, trunkHeight),
        createTransform(),
        fill(trunkColor),
    ));
    trunk.content.transform.translation.x = -trunkWidth/2;

    const foliageHeight = treeHeight - trunkHeight;
    const layerHeight = foliageHeight / 3;

    const pathSegments: PathSegment[] = [
        moveTo(0,0),
        lineTo(
            -treeWidth,
            0,
        ),
        lineTo(
            -treeWidth * (1/2),
            -layerHeight,
        ),
        lineTo(
            -treeWidth * (5/6),
            -layerHeight,
        ),
        lineTo(
            -treeWidth * (1/3),
            -2*layerHeight,
        ),
        lineTo(
            -treeWidth * (1/2),
            -2*layerHeight,
        ),
        lineTo(
            0,
            -3*layerHeight,
        ),
        lineTo(
            treeWidth * (1/2),
            -2*layerHeight,
        ),
        lineTo(
            treeWidth * (1/3),
            -2*layerHeight,
        ),
        lineTo(
            treeWidth * (5/6),
            -layerHeight,
        ),
        lineTo(
            treeWidth * (1/2),
            -layerHeight,
        ),
        lineTo(
            treeWidth,
            0,
        ),
        lineTo(
            0,
            0,
        ),
    ];

    const foliage = leaf(primitiveDrawable(
        id + '-foliage',
        path(pathSegments),
        createTransform(),
        fill(foliageColor),
    ));

    return branch(
        [ trunk, foliage ],
        drawableGroup(id),
    );
};
