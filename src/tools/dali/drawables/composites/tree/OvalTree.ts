import { Composer } from "../Composer";
import { Color } from "../../styles/Color";
import { primitiveDrawable, drawableGroup } from "../../drawable";
import { ellipse, rect } from "../../primitives/GeometricPrimitive2";
import { createTransform } from "../../transform/Transform";
import { fill } from "../../styles/Styles";
import { branch, leaf } from "../../../../../data_structures/Tree";
import { vec3 } from "../../../../../math/Vec";

export type OvalTreeProps = {
    foliageColor: Color,
    trunkColor: Color,
    height: number,
    width: number,
    trunkHeightRatio: number,
    trunkWidthRatio: number,
}

export const OvalTree: Composer<OvalTreeProps> = (id, props) => {
    const trunkVisibleHeight = props.height * props.trunkHeightRatio;
    const trunkWidth = props.width * props.trunkWidthRatio;
    const foliageHeight = props.height - trunkVisibleHeight;
    const trunkX = -(trunkWidth / 2);
    const trunkY = (foliageHeight / 2) - (trunkVisibleHeight / 2);

    const foliage = primitiveDrawable(
        id + '-foliage',
        ellipse(
            props.width / 2,
            foliageHeight / 2,
        ),
        createTransform(),
        fill(props.foliageColor),
    );

    const trunk = primitiveDrawable(
        id + '-trunk',
        rect(
            trunkWidth,
            trunkVisibleHeight * 2,
        ),
        createTransform({
            translation: vec3(trunkX, trunkY, 0),
        }),
        fill(props.trunkColor),
    );

    return branch(
        [leaf(trunk), leaf(foliage)],
        drawableGroup(id),
    );
};
