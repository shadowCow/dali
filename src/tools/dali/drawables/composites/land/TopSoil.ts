import { Composer } from "../Composer";
import { branch, leaf } from "../../../../../data_structures/Tree";
import { rect } from "../../primitives/GeometricPrimitive2";
import { primitiveDrawable, drawableGroup } from "../../drawable";
import { createTransform } from "../../transform/Transform";
import { fill } from "../../styles/Styles";
import { Colors, Color } from "../../styles/Color";
import { vec3 } from "../../../../../math/Vec";

export type TopSoilProps = {
    width: number,
    height: number,
    grassLayerRatio: number,
    grassColor: Color,
    dirtColor: Color,
}

export const TopSoil: Composer<TopSoilProps> = (id, props) => {
    const {
        width,
        height,
        grassLayerRatio,
        grassColor,
        dirtColor,
    } = props;

    const grassLayerHeight = height * grassLayerRatio;
    const grassLayer = leaf(primitiveDrawable(
        id + '-grassLayer',
        rect(
            width,
            grassLayerHeight,
        ),
        createTransform(),
        fill(grassColor),
    ));
    
    const dirtLayer = leaf(primitiveDrawable(
        id + '-dirtLayer',
        rect(
            width,
            height - grassLayerHeight,
        ),
        createTransform({
            translation: vec3(0, grassLayerHeight - 1, 0),
        }),
        fill(dirtColor),
    ));

    return branch(
        [dirtLayer, grassLayer],
        drawableGroup(id),
    );
};