import { Color } from "../../styles/Color";
import { Composer } from "../Composer";
import { leaf } from "../../../../../data_structures/Tree";
import { primitiveDrawable } from "../../drawable";
import { rect } from "../../primitives/GeometricPrimitive2";
import { createTransform } from "../../transform/Transform";
import { fill, styles } from "../../styles/Styles";

export type SurfaceProps = {
    width: number,
    height: number,
    color: Color,
}

export const Surface: Composer<SurfaceProps> = (id, props) => {
    const {
        width,
        height,
        color,
    } = props;

    const surface = primitiveDrawable(
        id,
        rect(width, height),
        createTransform(),
        styles(fill(color)),
    );

    return leaf(surface);
};
