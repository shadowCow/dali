import { Composer } from "../Composer";
import { primitiveDrawable, PrimitiveDrawable } from "../../drawable";
import { equilateralPolygon } from "../../primitives/polygons";
import { Color } from "../../styles/Color";
import { leaf } from "../../../../../data_structures/Tree";
import { createTransform } from "../../transform/Transform";
import { fill, styles } from "../../styles/Styles";

export type MountainProps = {
    height: number,
    color: Color,
}

export const Mountain: Composer<MountainProps> = (id, props) => {
    const {
        height,
        color,
    } = props;

    const mountainShape = equilateralPolygon(
        3,
        height / 2,
    );

    const mountain = primitiveDrawable(
        id,
        mountainShape,
        createTransform(),
        styles(fill(color)),
    );

    return leaf(mountain);
};
