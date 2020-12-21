import { Composer } from "../Composer";
import { Color } from "../../styles/Color";
import { primitiveDrawable } from "../../drawable";
import { rect } from "../../primitives/GeometricPrimitive2";
import { createTransform } from "../../transform/Transform";
import { fill } from "../../styles/Styles";
import { leaf } from "../../../../../data_structures/Tree";

export type SkyProps = {
    size: number,
    color: Color,
}

export const Sky: Composer<SkyProps> = (id, props) => {
    const {
        size,
        color,
    } = props;

    const sky = primitiveDrawable(
        id,
        rect(size, size),
        createTransform(),
        fill(color),
    );

    return leaf(sky);
};